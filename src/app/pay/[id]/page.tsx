'use client';

import CheckoutForm from '@/components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function page({ params }: { params: { id: string } }) {
  const [clientSecret, setClientSecret] = useState('');
  const { id } = params;

  const makeRequest = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/create-intent/${id}`, {
        method: 'POST',
      });
      const data = await res.json();

      console.log(data.clientSecret);

      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  let isRequestMade = false;

  useEffect(() => {
    if (!isRequestMade) {
      makeRequest();
      isRequestMade = true;
    }
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default page;
