import { pool } from '../lib/db';

export const initialProducts = [
  {
    name: 'SonicPro ANC Wireless Headphones',
    description: 'Active noise-canceling over-ear headphones with 40-hour battery life, spatial audio, and ultra-soft memory foam ear cushions.',
    price: 249.99,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    stock: 25,
    rating: 4.8,
    rating_count: 142,
    featured: true,
  },
  {
    name: 'Apex Pro GPS Smart Watch',
    description: 'Rugged titanium GPS smartwatch featuring heart-rate monitoring, sleep analytics, AMOLED display, and 10-day battery life.',
    price: 199.99,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    stock: 18,
    rating: 4.7,
    rating_count: 98,
    featured: true,
  },
  {
    name: 'Tactile RGB Mechanical Keyboard',
    description: 'Hot-swappable mechanical keyboard with custom linear switches, PBT keycaps, per-key RGB backlighting, and aluminum chassis.',
    price: 129.50,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    stock: 30,
    rating: 4.9,
    rating_count: 210,
    featured: true,
  },
  {
    name: 'UltraView 34" Curved Gaming Monitor',
    description: '34-inch WQHD 144Hz curved monitor with HDR400, 1ms response time, and 99% sRGB color accuracy for immersive productivity and gaming.',
    price: 499.00,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    stock: 12,
    rating: 4.6,
    rating_count: 65,
    featured: true,
  },
  {
    name: 'Urban Craftsman Leather Backpack',
    description: 'Handcrafted full-grain leather backpack with padded laptop sleeve, water-resistant lining, and ergonomic shoulder straps.',
    price: 119.00,
    category: 'Accessories',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    stock: 15,
    rating: 4.8,
    rating_count: 84,
    featured: true,
  },
  {
    name: 'HydroShield Vacuum Insulated Bottle 1L',
    description: 'Double-wall vacuum insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 29.99,
    category: 'Accessories',
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    stock: 50,
    rating: 4.9,
    rating_count: 320,
    featured: false,
  },
  {
    name: 'Organic Heavyweight Fleece Hoodie',
    description: '100% organic cotton fleece pullover hoodie designed for maximum comfort, durability, and modern relaxed fit.',
    price: 64.99,
    category: 'Apparel',
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    stock: 40,
    rating: 4.5,
    rating_count: 112,
    featured: false,
  },
  {
    name: 'Minimalist Architectural LED Desk Lamp',
    description: 'Sleek aluminum desk lamp featuring touch brightness slider, adjustable color temperature, wireless phone charging base, and timer.',
    price: 49.00,
    category: 'Home & Office',
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    stock: 22,
    rating: 4.7,
    rating_count: 76,
    featured: true,
  },
  {
    name: 'HyperSpeed 2TB NVMe M.2 SSD',
    description: 'PCIe Gen4 M.2 internal solid state drive with lightning read speeds up to 7450 MB/s for high-performance computing.',
    price: 159.99,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1597872250970-45dca8a7b97e?w=800&q=80',
    stock: 35,
    rating: 4.9,
    rating_count: 189,
    featured: false,
  },
  {
    name: 'Artisan Damascus 8" Chef Knife',
    description: 'High-carbon Japanese Damascus steel chef knife with ergonomic rosewood handle and razor-sharp precision edge.',
    price: 89.99,
    category: 'Home & Office',
    image_url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80',
    stock: 14,
    rating: 4.8,
    rating_count: 93,
    featured: false,
  },
  {
    name: 'Barista Touch Compact Espresso Machine',
    description: '19-bar high pressure espresso maker with integrated milk frother, digital temperature control, and rapid thermoblock heating system.',
    price: 229.00,
    category: 'Home & Office',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    stock: 10,
    rating: 4.6,
    rating_count: 57,
    featured: true,
  },
  {
    name: 'FlexFit Pro Fitness & Heart Monitor',
    description: 'Waterproof activity tracker with continuous pulse tracking, SpO2 sensor, workout auto-detect, and 14-day battery.',
    price: 59.99,
    category: 'Fitness',
    image_url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
    stock: 28,
    rating: 4.4,
    rating_count: 81,
    featured: false,
  },
  {
    name: 'Pro Alignment Non-Slip Yoga Mat',
    description: '6mm eco-friendly TPE yoga mat with laser-engraved position lines, non-slip textured grip, and carrying strap included.',
    price: 42.00,
    category: 'Fitness',
    image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    stock: 45,
    rating: 4.7,
    rating_count: 145,
    featured: false,
  },
  {
    name: 'Classic Polarized Aviator Sunglasses',
    description: 'Lightweight titanium frame sunglasses with UV400 polarized anti-glare lenses and protective hardshell case.',
    price: 79.00,
    category: 'Accessories',
    image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    stock: 32,
    rating: 4.8,
    rating_count: 167,
    featured: false,
  },
];

async function seedDatabase() {
  console.log('🌱 Seeding ShopSphere database with 14 products...');

  try {
    // Check if products exist already
    const countRes = await pool.query('SELECT COUNT(*) FROM products');
    const count = parseInt(countRes.rows[0].count, 10);

    if (count > 0) {
      console.log(`ℹ️ Products table already has ${count} records. Clearing and re-seeding...`);
      await pool.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE');
    }

    for (const p of initialProducts) {
      await pool.query(
        `INSERT INTO products (name, description, price, category, image_url, stock, rating, rating_count, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [p.name, p.description, p.price, p.category, p.image_url, p.stock, p.rating, p.rating_count, p.featured]
      );
    }

    console.log(`✅ Successfully seeded ${initialProducts.length} products into PostgreSQL!`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();
