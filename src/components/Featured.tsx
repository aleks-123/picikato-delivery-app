import { featuredProducts } from '@/data';
import { Product } from '@/types/types';
import Image from 'next/image';
import React from 'react';

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

async function Featured() {
  const featuredProducts: Product[] = await getData();

  return (
    <div className='w-screen overflow-x-scroll  text-red-500'>
      {/* WRAPPER */}
      <div className='w-max flex'>
        {/* SINGLE ITEM */}
        {featuredProducts?.map((product) => (
          <div
            key={product.id}
            className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]'
          >
            {/* IMAGE CONTAINER */}
            {product.img && (
              <div className='relative flex-1 h-[50%] w-full hover:rotate-[60deg]  transition-all duration-500'>
                <Image
                  src={product.img}
                  alt='food image'
                  fill
                  className='object-contain'
                />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className='flex-1 flex flex-col gap-4 items-center justify-center'>
              <h1 className='text-xl font-bold xl:text-2xl 2xl:text-3xl pt-5'>
                {product.title}
              </h1>
              <p className='p-4 text-center 2xl:p-8'>{product.desc}</p>
              <span className='text-lg font-bold'>{product.price}</span>
              <button className='bg-red-500 text-white p-2 rounded-md'>
                Add to card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;
