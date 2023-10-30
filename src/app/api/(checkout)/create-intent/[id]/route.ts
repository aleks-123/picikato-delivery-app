import { prisma } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    console.log(id);

    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    if (order) {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * 100,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.update({
        where: {
          id: id,
        },
        data: {
          intent_id: paymentIntent.id,
        },
      });

      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        {
          status: 200,
        }
      );
    } else {
      return new NextResponse(JSON.stringify({ message: 'Order not found' }), {
        status: 404,
      });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Fail to make payment' }),
      {
        status: 501,
      }
    );
  }
};
