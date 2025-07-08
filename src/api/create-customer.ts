import { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { email, name, paymentMethodId } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    // Check if customer already exists in Firestore
    const customerRef = doc(db, 'customers', email);
    const customerDoc = await getDoc(customerRef);

    let stripeCustomerId: string;

    if (customerDoc.exists() && customerDoc.data().stripeCustomerId) {
      // Customer exists, get Stripe customer ID
      stripeCustomerId = customerDoc.data().stripeCustomerId;
      
      // Update customer information in Stripe
      await stripe.customers.update(stripeCustomerId, {
        name,
        email,
      });
    } else {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email,
        name,
      });
      
      stripeCustomerId = customer.id;
      
      // Save customer in Firestore
      await setDoc(customerRef, {
        email,
        name,
        stripeCustomerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Attach payment method if provided
    if (paymentMethodId) {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: stripeCustomerId,
      });
      
      // Set as default payment method
      await stripe.customers.update(stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    res.status(200).json({
      success: true,
      customerId: stripeCustomerId,
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error creating customer:', err);
    res.status(500).json({ error: err.message });
  }
}