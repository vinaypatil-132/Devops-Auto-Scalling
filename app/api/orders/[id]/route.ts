import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const orderRes = await query('SELECT * FROM orders WHERE id = $1', [orderId]);

    if (orderRes.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const itemsRes = await query('SELECT * FROM order_items WHERE order_id = $1', [
      orderId,
    ]);

    return NextResponse.json({
      success: true,
      order: {
        ...orderRes.rows[0],
        items: itemsRes.rows,
      },
    });
  } catch (error: any) {
    console.error(`Error fetching order ${params.id}:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order details' },
      { status: 500 }
    );
  }
}
