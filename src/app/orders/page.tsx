import React from 'react';

function OrdersPage() {
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
          <tr className='text-sm md:text-base bg-red-50'>
            <td className='hidden md:block py-6 px-1'>235235235235</td>
            <td className='py-6 px-1'>23.23.2023</td>
            <td className='py-6 px-1'>89.20</td>
            <td className='hidden md:block'>
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td>On the way (arpox, 10min)</td>
          </tr>
          <tr className='text-sm md:text-base odd:bg-gray-200'>
            <td className='hidden md:block py-6 px-1'>235235235235</td>
            <td className='py-6 px-1'>23.23.2023</td>
            <td className='py-6 px-1'>89.20</td>
            <td className='hidden md:block'>
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td>completed</td>
          </tr>
          <tr className='text-sm md:text-base odd:bg-gray-200'>
            <td className='hidden md:block py-6 px-1'>235235235235</td>
            <td className='py-6 px-1'>23.23.2023</td>
            <td className='py-6 px-1'>89.20</td>
            <td className='hidden md:block'>
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td>completed</td>
          </tr>
          <tr className='text-sm md:text-base odd:bg-gray-200'>
            <td className='hidden md:block py-6 px-1'>235235235235</td>
            <td className='py-6 px-1'>23.23.2023</td>
            <td className='py-6 px-1'>89.20</td>
            <td className='hidden md:block'>
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td>completed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
