// app/api/stripe/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items } = await request.json();

    const line_items = items.map(item => ({
      price_data: {
        currency: 'pkr', // Change currency to PKR
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100), // Price already in PKR
      },
      quantity: item.quantity,
    }));

    // Add processing fee in PKR
    line_items.push({
      price_data: {
        currency: 'pkr',
        product_data: {
          name: 'Payment Processing Fee',
        },
        unit_amount: Math.round(items.reduce((acc, item) => {
          return acc + (item.price * item.quantity);
        }, 0) * 0.03 * 100), // 3% fee in PKR
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/thank-you`,
      cancel_url: `${request.headers.get('origin')}/cart`,
    });

    return Response.json({ id: session.id });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}