import { pool } from '../lib/db';
import fs from 'fs';
import path from 'path';

async function setupDatabase() {
  console.log('⚡ Initializing ShopSphere database tables...');
  
  try {
    const schemaPath = path.join(process.cwd(), 'lib', 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    await pool.query(sql);

    console.log('✅ Database tables created successfully!');
    console.log('   - products');
    console.log('   - orders');
    console.log('   - order_items');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
