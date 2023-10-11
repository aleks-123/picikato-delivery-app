'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Carticon from './Carticon';

function Menu() {
  const [open, setOpen] = useState<boolean>(false);

  // Temporary data
  const user = false;
  const links = [
    { id: 1, title: 'Homepage', url: '/' },
    { id: 2, title: 'Menu', url: '/menu' },
    { id: 3, title: 'Working Hours', url: '/' },
    { id: 4, title: 'Contant', url: '/' },
  ];

  return (
    <div>
      {!open ? (
        <Image
          onClick={() => setOpen(true)}
          src='/open.png'
          alt='Open menu image'
          width={20}
          height={20}
        />
      ) : (
        <Image
          onClick={() => setOpen(false)}
          src='/close.png'
          alt='Open menu image'
          width={20}
          height={20}
        />
      )}
      {open && (
        <div className='bg-red-500 text-white absolute right-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-3xl gap-8 z-10'>
          {links.map((item) => (
            <Link key={item.id} href={item.url} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          {!user ? (
            <Link onClick={() => setOpen(false)} href='/login'>
              Login
            </Link>
          ) : (
            <Link onClick={() => setOpen(false)} href='/orders'>
              Orders
            </Link>
          )}
          <Link onClick={() => setOpen(false)} href='/cart'>
            <Carticon />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Menu;
