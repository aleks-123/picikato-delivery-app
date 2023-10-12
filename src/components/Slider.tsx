'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const data = [
  {
    id: 1,
    title: 'always fresh & always crispy & always hot',
    image: '/slide1.png',
  },
  {
    id: 2,
    title: 'we deliver your order whenever you are in NY',
    image: '/slide2.png',
  },
  {
    id: 3,
    title: 'the best pizza to share with your family',
    image: '/slide3.jpg',
  },
];

function Slider() {
  const [currentSlider, setCurrentSlider] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlider((prev) => {
        if (prev === data.length - 1) return 0;
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  console.log(currentSlider);
  return (
    <div className='flex h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]  flex-col items-center lg:flex-row bg-fuchsia-50'>
      {/* TEXT CONTAINER */}
      <div className='h-1/2 lg:h-full flex flex-col items-center justify-center font-bold gap-8 text-red-500 lg:flex-1'>
        <h1 className='text-5xl  md:text-6xl  xl:text-7xl uppercase p-4 md:p-10 text-center'>
          {data[currentSlider].title}
        </h1>
        <button className='bg-red-500 text-white py-4 px-5 lg:px-10  rounded-md'>
          Order now
        </button>
      </div>

      {/* IMAGE CONTAINER */}
      <div className='h-1/2 lg:h-full w-full lg:flex-1 relative'>
        <Image
          src={data[currentSlider].image}
          alt='slider image'
          fill
          className='object-cover'
        />
      </div>
    </div>
  );
}

export default Slider;
