import axios from 'axios';

// Stripe API keys
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = import.meta.env.VITE_STRIPE_WEBHOOK_SECRET;

// Initialize Stripe client
let stripePromise: Promise<any> | null = null;

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = import('stripe-js').then(module => 
      module.loadStripe(STRIPE_PUBLISHABLE_KEY)
    );
  }
  return stripePromise;
};

// Create a payment intent
export const createPaymentIntent = async (amount: number, currency: string = 'usd', metadata: any = {}) => {
  try {
    const response = await axios.post('/api/create-payment-intent', {
      amount,
      currency,
      metadata
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Process a payment
export const processPayment = async (paymentMethodId: string, amount: number, orderId: string) => {
  try {
    const response = await axios.post('/api/process-payment', {
      paymentMethodId,
      amount,
      orderId
    });
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Create a customer
export const createCustomer = async (email: string, name: string, paymentMethodId?: string) => {
  try {
    const response = await axios.post('/api/create-customer', {
      email,
      name,
      paymentMethodId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// Save a payment method
export const savePaymentMethod = async (customerId: string, paymentMethodId: string) => {
  try {
    const response = await axios.post('/api/save-payment-method', {
      customerId,
      paymentMethodId
    });
    return response.data;
  } catch (error) {
    console.error('Error saving payment method:', error);
    throw error;
  }
};

// Get customer payment methods
export const getCustomerPaymentMethods = async (customerId: string) => {
  try {
    const response = await axios.get(`/api/payment-methods/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting payment methods:', error);
    throw error;
  }
};

// Create a subscription
export const createSubscription = async (customerId: string, priceId: string, metadata: any = {}) => {
  try {
    const response = await axios.post('/api/create-subscription', {
      customerId,
      priceId,
      metadata
    });
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Cancel a subscription
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await axios.post('/api/cancel-subscription', {
      subscriptionId
    });
    return response.data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

export default {
  getStripe,
  createPaymentIntent,
  processPayment,
  createCustomer,
  savePaymentMethod,
  getCustomerPaymentMethods,
  createSubscription,
  cancelSubscription
};