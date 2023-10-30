import { prisma } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
  req: NextRequest,
  { params }: { params: { intentId: string } }
) => {
  const { intentId } = params;

  console.log(intentId);

  try {
    const product = await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: {
        status: 'Being prepared!',
      },
    });

    console.log(product);
    return new NextResponse(
      JSON.stringify({ message: 'Order has been prepared' }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    );
  }
};
