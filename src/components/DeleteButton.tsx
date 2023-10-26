'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

function DeleteButton({ id }: { id: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated' || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      router.push('/menu');
      toast('The product has been deleted!');
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      className='bg-red-400 p-2 rounded-full absolute top-4 right-4'
    >
      <Image
        src='/delete.png'
        alt='Icon of delete button'
        width={20}
        height={20}
      />
    </button>
  );
}

export default DeleteButton;
