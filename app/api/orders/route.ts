import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const client = await pool.connect();

  try {
    const body = await request.json();
    const {
      customer_name,
      customer_email,
      shipping_address,
      city,
      postal_code,
      payment_method,
      items,
      total_amount,
    } = body;

    // Validation
    if (
      !customer_name ||
      !customer_email ||
      !shipping_address ||
      !city ||
      !postal_code ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required order fields or empty cart' },
        { status: 400 }
      );
    }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    await client.query('BEGIN');

    // Insert Order record
    const insertOrderSql = `
      INSERT INTO orders (id, customer_name, customer_email, shipping_address, city, postal_code, payment_method, total_amount, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Processing')
      RETURNING *
    `;
    const orderValues = [
      orderId,
      customer_name.trim(),
      customer_email.trim(),
      shipping_address.trim(),
      city.trim(),
      postal_code.trim(),
      payment_method || 'Demo Credit Card (Test Only)',
      total_amount,
    ];

    const orderResult = await client.query(insertOrderSql, orderValues);

    // Insert Line Items
    for (const item of items) {
      const insertItemSql = `
        INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await client.query(insertItemSql, [
        orderId,
        item.product_id || null,
        item.product_name,
        item.quantity,
        item.price,
      ]);
    }

    await client.query('COMMIT');

    return NextResponse.json(
      {
        success: true,
        order_id: orderId,
        order: orderResult.rows[0],
      },
      { status: 201 }
    );
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('Error processing order transaction:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to place order in database' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
