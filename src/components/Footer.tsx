import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div className='h-12 md-24 p-4 lg:p-10 xl:p-10 text-red-500 flex items-center justify-between  border-t-2 border-red-500'>
      <Link href='/' className='font-bold text-xl'>
        Picikato
      </Link>
      <p>ALL RIGHTS RESERVED.</p>
    </div>
  );
}

export default Footer;
