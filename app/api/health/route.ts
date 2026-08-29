import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = new Date().toISOString();

  try {
    const result = await query('SELECT 1 as health');
    const isDbConnected = result.rows.length > 0;

    return NextResponse.json(
      {
        status: isDbConnected ? 'ok' : 'degraded',
        timestamp,
        service: 'ShopSphere API',
        database: isDbConnected ? 'connected' : 'disconnected',
        environment: process.env.APP_ENV || 'development',
      },
      { status: isDbConnected ? 200 : 503 }
    );
  } catch (error: any) {
    console.error('Health check database query error:', error.message);
    return NextResponse.json(
      {
        status: 'error',
        timestamp,
        service: 'ShopSphere API',
        database: 'disconnected',
        error: error.message || 'Database connection error',
      },
      { status: 500 }
    );
  }
}
