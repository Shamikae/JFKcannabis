import { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from '../firebase/config';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { customerId, priceId, metadata = {} } = req.body;

    // Validate required fields
    if (!customerId || !priceId) {
      return res.status(400).json({ error: 'Customer ID and price ID are required' });
    }

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
      expand: ['latest_invoice.payment_intent'],
    });

    // Save subscription to Firestore
    await setDoc(doc(db, 'subscriptions', subscription.id), {
      customerId,
      status: subscription.status,
      priceId,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      metadata,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Update customer with subscription info
    const customerRef = doc(db, 'customers', customerId);
    const customerDoc = await getDoc(customerRef);

    if (customerDoc.exists()) {
      const subscriptions = customerDoc.data().subscriptions || [];
      await updateDoc(customerRef, {
        subscriptions: [...subscriptions, subscription.id],
        updatedAt: new Date(),
      });
    }

    res.status(200).json({
      success: true,
      subscriptionId: subscription.id,
      status: subscription.status,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret || null,
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error creating subscription:', err);
    res.status(500).json({ error: err.message });
  }
}