import React from 'react';
import Menu from './Menu';
import Link from 'next/link';
import Carticon from './Carticon';
import Image from 'next/image';

function Navbar() {
  // da se napravi nesto dali kolata e dizel ili ne
  const user = false;

  return (
    <div className='h-12 text-red-500 p-4 flex justify-between items-center  border-b-2 border-red-500 uppercase md:h-24 lg:px-20 xl:px-40'>
      {/* LEFT LINKS */}
      <div className='hidden md:flex gap-4 flex-1'>
        <Link href='/'>Homepage</Link>
        <Link href='/menu'>Menu</Link>
        <Link href='/'>TEST</Link>
      </div>
      {/* LOGO */}
      <div className='text-xl md:font-bold flex-1 md:text-center'>
        <Link href='/'>Picikato</Link>
      </div>
      {/* MOBILE MENU */}
      <div className='md:hidden'>
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className='hidden  md:flex gap-4 items-center flex-1 md:justify-end'>
        <div className='md:absolute top-3 r-2 lg:static gap-2 cursor-pointer bg-orange-300 px-2 rounded-md flex'>
          <Image
            src='/phone.png'
            alt='This is phone logo'
            width={20}
            height={20}
          />
          <span>223 305</span>
        </div>
        {!user ? (
          <Link href='/'>Login</Link>
        ) : (
          <Link href='/orders'>Orders</Link>
        )}

        <Carticon />
      </div>
    </div>
  );
}

export default Navbar;
