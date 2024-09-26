import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 // apiVersion: '2022-11-15',
});

export const processPayment = async (amount: number, currency: string, paymentMethodId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: paymentMethodId,
      confirm: true,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw new Error('Payment failed');
  }
};
