import { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from '../firebase/config';
import { doc, updateDoc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.VITE_STRIPE_WEBHOOK_SECRET || '';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    const error = err as Error;
    console.error(`Webhook Error: ${error.message}`);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentIntentFailed(failedPaymentIntent);
      break;
    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCreated(subscription);
      break;
    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(updatedSubscription);
      break;
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(deletedSubscription);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Get order ID from metadata
    const orderId = paymentIntent.metadata.order_id;
    if (!orderId) {
      console.error('No order ID found in payment intent metadata');
      return;
    }

    // Update order status in Firestore
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (orderDoc.exists()) {
      await updateDoc(orderRef, {
        paymentStatus: 'paid',
        paymentId: paymentIntent.id,
        paymentAmount: paymentIntent.amount / 100, // Convert from cents to dollars
        paymentDate: new Date(),
        status: 'confirmed'
      });
    } else {
      // Order doesn't exist yet, create it
      // This might happen if the webhook arrives before the order is created
      console.log(`Order ${orderId} not found, will be created when client completes checkout`);
    }

    // Add payment to payments collection
    await addDoc(collection(db, 'payments'), {
      paymentIntentId: paymentIntent.id,
      orderId,
      amount: paymentIntent.amount / 100,
      status: 'succeeded',
      paymentMethod: paymentIntent.payment_method,
      customerId: paymentIntent.customer,
      createdAt: new Date()
    });

    console.log(`Payment for order ${orderId} processed successfully`);
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Get order ID from metadata
    const orderId = paymentIntent.metadata.order_id;
    if (!orderId) {
      console.error('No order ID found in payment intent metadata');
      return;
    }

    // Update order status in Firestore
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (orderDoc.exists()) {
      await updateDoc(orderRef, {
        paymentStatus: 'failed',
        paymentId: paymentIntent.id,
        paymentError: paymentIntent.last_payment_error?.message || 'Payment failed',
        status: 'payment_failed'
      });
    }

    // Add payment to payments collection
    await addDoc(collection(db, 'payments'), {
      paymentIntentId: paymentIntent.id,
      orderId,
      amount: paymentIntent.amount / 100,
      status: 'failed',
      paymentMethod: paymentIntent.payment_method,
      customerId: paymentIntent.customer,
      error: paymentIntent.last_payment_error?.message || 'Payment failed',
      createdAt: new Date()
    });

    console.log(`Payment for order ${orderId} failed`);
  } catch (error) {
    console.error('Error handling payment intent failed:', error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    const subscriptionId = subscription.id;
    
    // Add subscription to subscriptions collection
    await setDoc(doc(db, 'subscriptions', subscriptionId), {
      customerId,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      productId: subscription.items.data[0].price.product,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Update customer with subscription info
    const customerRef = doc(db, 'customers', customerId);
    const customerDoc = await getDoc(customerRef);

    if (customerDoc.exists()) {
      const subscriptions = customerDoc.data().subscriptions || [];
      await updateDoc(customerRef, {
        subscriptions: [...subscriptions, subscriptionId],
        updatedAt: new Date()
      });
    }

    console.log(`Subscription ${subscriptionId} created for customer ${customerId}`);
  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const subscriptionId = subscription.id;
    
    // Update subscription in Firestore
    const subscriptionRef = doc(db, 'subscriptions', subscriptionId);
    await updateDoc(subscriptionRef, {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      updatedAt: new Date()
    });

    console.log(`Subscription ${subscriptionId} updated`);
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    const subscriptionId = subscription.id;
    
    // Update subscription status in Firestore
    const subscriptionRef = doc(db, 'subscriptions', subscriptionId);
    await updateDoc(subscriptionRef, {
      status: 'canceled',
      canceledAt: new Date(),
      updatedAt: new Date()
    });

    // Update customer's subscriptions array
    const customerRef = doc(db, 'customers', customerId);
    const customerDoc = await getDoc(customerRef);

    if (customerDoc.exists()) {
      const subscriptions = customerDoc.data().subscriptions || [];
      await updateDoc(customerRef, {
        subscriptions: subscriptions.filter((id: string) => id !== subscriptionId),
        updatedAt: new Date()
      });
    }

    console.log(`Subscription ${subscriptionId} deleted for customer ${customerId}`);
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}