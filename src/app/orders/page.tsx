'use client';

import { OrderType } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function OrdersPage() {
  const { data: session, status } = useSession();

  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch('http://localhost:3000/api/orders').then((res) => res.json()),
  });

  if (isPending || status === 'loading') return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div className='p-4 lg:px-20 xl:px-40'>
      <table className='w-full border-separate border-spacing-3'>
        <thead>
          <tr className='text-left'>
            <th className='hidden md:block'>Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className='hidden md:block'>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: OrderType) => (
            <tr key={item.id} className='text-sm md:text-base bg-red-50'>
              <td className='hidden md:block py-6 px-1'>{item.id}</td>
              <td className='py-6 px-1'>
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className='py-6 px-1'>${item.price}</td>
              <td className='hidden md:block'>
                {item?.products.map((item) => (
                  <span key={item.id}>{item.title},</span>
                ))}
              </td>
              <td>{item.status}</td>
              {session?.user.isAdmin ? (
                <td>
                  <input
                    placeholder={item.status}
                    className='p-2 ring-1 ing-red-100 rounded-md'
                  ></input>
                </td>
              ) : (
                <td className='py-6 px-1'>{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
