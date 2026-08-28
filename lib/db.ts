import { Pool, QueryResult, QueryResultRow } from 'pg';
import path from 'path';
import fs from 'fs';

// Helper to ensure env vars are populated
function getConnectionString(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Try reading .env.local if DATABASE_URL is not set in environment
  const envLocalPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf8');
    const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Fallback dummy connection string for Next.js build-time static evaluation
  return 'postgresql://postgres:postgres@127.0.0.1:5432/placeholder';
}

// Global pool instance to support Next.js hot reloading in dev mode
const globalForPg = global as unknown as { pgPool?: Pool };

export const pool =
  globalForPg.pgPool ||
  new Pool({
    connectionString: getConnectionString(),
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pgPool = pool;
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { text: text.substring(0, 80), duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Database query error:', { text: text.substring(0, 80), error });
    throw error;
  }
}
