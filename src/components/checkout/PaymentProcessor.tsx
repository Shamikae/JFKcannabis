import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Lock, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { trackPurchase } from '../../services/googleAnalytics';

// Load Stripe outside of component to avoid recreating Stripe object on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentProcessorProps {
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
  amount: number;
  orderId: string;
  customerEmail: string;
}

const PaymentForm: React.FC<PaymentProcessorProps> = ({
  onPaymentSuccess,
  onPaymentError,
  amount,
  orderId,
  customerEmail
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const { items, clearCart } = useCartStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!cardComplete) {
      setError('Please complete your card details');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment method
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: customerEmail,
        },
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message || 'An error occurred with your payment');
        setProcessing(false);
        return;
      }

      // Create payment intent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          payment_method_id: paymentMethod.id,
          receipt_email: customerEmail,
          metadata: {
            order_id: orderId,
          },
        }),
      });

      const paymentIntentResult = await response.json();

      if (paymentIntentResult.error) {
        setError(paymentIntentResult.error.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentResult.client_secret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        setError(confirmError.message || 'Payment confirmation failed');
        setProcessing(false);
        onPaymentError(confirmError.message || 'Payment confirmation failed');
        return;
      }

      // Payment succeeded
      setSucceeded(true);
      setProcessing(false);
      
      // Track purchase in Google Analytics
      trackPurchase({
        id: orderId,
        items,
        total: amount / 100, // Convert cents to dollars
        tax: 0, // Add actual tax
        deliveryFee: 0, // Add actual delivery fee
      });
      
      // Clear cart after successful payment
      clearCart();
      
      // Notify parent component
      onPaymentSuccess(paymentIntent.id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setProcessing(false);
      onPaymentError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <CreditCard className="h-6 w-6 text-primary-600 mr-3" />
          <h3 className="text-lg font-medium">Payment Information</h3>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              onChange={(e) => setCardComplete(e.complete)}
            />
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <Lock className="h-3 w-3 mr-1" />
            Payments are secure and encrypted
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        {succeeded && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Payment successful!</span>
          </div>
        )}
        
        <button
          type="submit"
          disabled={!stripe || processing || succeeded}
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {processing ? (
            <>
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Processing...
            </>
          ) : succeeded ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Payment Successful
            </>
          ) : (
            `Pay $${(amount / 100).toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
};

const PaymentProcessor: React.FC<PaymentProcessorProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default PaymentProcessor;