import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

// FETCH ALL orders
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  console.log(session);
  if (session) {
    try {
      const orders = await prisma.product.findMany();
      // console.log(orders);
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: 'Something went wrong!' }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'You are not authenticated!' }),
      { status: 401 }
    );
  }
};

export const POST = () => {
  return new NextResponse('Hello', { status: 200 });
};
