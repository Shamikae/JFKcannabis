import { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { paymentMethodId, amount, orderId } = req.body;

    // Validate required fields
    if (!paymentMethodId || !amount || !orderId) {
      return res.status(400).json({ error: 'Payment method ID, amount, and order ID are required' });
    }

    // Get order from Firestore
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderDoc.data();
    const customerId = order.customerId;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to dollars to cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      metadata: {
        order_id: orderId,
      },
      receipt_email: order.email,
      customer: customerId || undefined,
    });

    // Update order with payment information
    await updateDoc(orderRef, {
      paymentStatus: 'paid',
      paymentId: paymentIntent.id,
      paymentDate: new Date(),
      status: 'confirmed',
    });

    res.status(200).json({
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error processing payment:', err);
    res.status(500).json({ error: err.message });
  }
}