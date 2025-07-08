import { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { amount, currency = 'usd', payment_method_id, receipt_email, metadata = {} } = req.body;

    // Validate required fields
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method: payment_method_id,
      receipt_email,
      metadata,
      confirm: !!payment_method_id,
      automatic_payment_methods: payment_method_id ? undefined : {
        enabled: true,
      },
    });

    // Return the client secret to the client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error creating payment intent:', err);
    res.status(500).json({ error: err.message });
  }
}