'use client';

import { OrderType } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  if (isPending || status === 'loading') return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });
    toast.success('The order status has been changed!');
    input.value = '';
  };

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
            <tr
              key={item.id}
              className={`${
                item.status !== 'delivered' && 'bg-red-50'
              } text-sm md:text-base`}
            >
              <td className='hidden md:block py-6 px-1'>{item.id}</td>
              <td className='py-6 px-1'>
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className='py-6 px-1'>${item.price}</td>
              <td className='hidden md:block'>
                {item?.products.map((item, index) => (
                  <span key={index}>{item.title},</span>
                ))}
              </td>
              <td>{item.status}</td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    onSubmit={(e) => handleUpdate(e, item.id)}
                    className='flex items-center justify-center gap-4'
                  >
                    <input
                      placeholder={item.status}
                      className='p-2 ring-1 ring-red-100 rounded-md '
                    />
                    <button
                      type='submit'
                      className='bg-red-400 p-2 rounded-full'
                    >
                      <Image
                        src='/edit.png'
                        alt='button image'
                        width={20}
                        height={20}
                      />
                    </button>
                  </form>
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
