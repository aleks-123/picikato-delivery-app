'use client';

import { useCartStore } from '@/utils/store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function CartPage() {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckOut = async () => {
    if (!session) {
      router.push('/');
    } else {
      try {
        const res = await fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: 'NOT PAID!',
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        router.push(`/pay/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className=' h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row '>
      {/* PRODUCT CONTAINER */}
      <div className='h-1/2 p-4  flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40  2xl:text-xl 2xl:gap-6'>
        {/* SINGLE ITEM */}
        {products.map((product) => (
          <div className='flex items-center justify-between mb-4'>
            {product.img && (
              <Image
                src={product.img}
                alt='This is image container'
                width={100}
                height={100}
              />
            )}
            <div className=''>
              <h1 className='uppercase text-xl font-bold'>
                {product.title} x{product.quantity}
              </h1>
              <span className=''>{product.optionTitle}</span>
            </div>
            <h2 className='font-bold'>${product.price} </h2>
            <span
              className='cursor-pointer'
              onClick={() => removeFromCart(product)}
            >
              x
            </span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className='h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center  lg:h-full lg:w-1/3 2xl:w-1/2  lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6 '>
        <div className='flex justify-between'>
          <span className=''>Subtotal ({totalItems} items)</span>
          <span className=''>${totalPrice}</span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Service Cost (3 items)</span>
          <span className=''>$0</span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Delivery Cost (3 items)</span>
          <span className='text-green-500'>FREE!</span>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between'>
          <span className=''>TOTAL(INCL. VAT)</span>
          <span className='font-bold'>${totalPrice}</span>
        </div>
        <button
          className='bg-red-500 text-white p-3 rounded-md w-1/3 self-end'
          onClick={handleCheckOut}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default CartPage;
