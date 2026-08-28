import Link from 'next/link';
import { query } from '@/lib/db';
import { ProductCard, Product } from '@/components/ProductCard';
import { ArrowRight, Sparkles, Shield, Cpu, Zap, ShoppingCart, Layers } from 'lucide-react';

export const revalidate = 0; // Dynamic route to always fetch latest DB records

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await query(
      'SELECT * FROM products WHERE featured = true ORDER BY rating DESC LIMIT 8'
    );
    return res.rows;
  } catch (error) {
    console.error('Error loading featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  const categories = [
    {
      name: 'Electronics',
      count: 'Audio, Wearables & Gadgets',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      href: '/products?category=Electronics',
      gradient: 'from-blue-600 to-indigo-700',
    },
    {
      name: 'Accessories',
      count: 'Bags, Glasses & Drinkware',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      href: '/products?category=Accessories',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      name: 'Apparel',
      count: 'Premium Sweatshirts & Wearables',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
      href: '/products?category=Apparel',
      gradient: 'from-amber-600 to-orange-600',
    },
    {
      name: 'Home & Office',
      count: 'Lighting, Espresso & Kitchen',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
      href: '/products?category=Home%20%26%20Office',
      gradient: 'from-emerald-600 to-teal-700',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-900 to-slate-950 -z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold px-4 py-1.5 rounded-full shadow-inner">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>Next.js + PostgreSQL Monolith Stack</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Next-Gen Shopping <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300">
                  Built for Speed & Reliability.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Explore premium products with instant transactional ordering, real-time inventory management, and ultra-fast PostgreSQL backend API integration.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/products?category=Electronics"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 hover:border-slate-600 transition-all text-center"
                >
                  Featured Electronics
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800 text-slate-400 text-xs">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-extrabold text-lg text-white">100%</span>
                  <span>PostgreSQL Connected</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-extrabold text-lg text-white">14+</span>
                  <span>Seeded Products</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-extrabold text-lg text-white">Docker</span>
                  <span>Container Ready</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-slate-700 shadow-2xl shadow-black/50 group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                  alt="Hero Product"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 space-y-1">
                  <span className="bg-brand-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                    Featured Hero Product
                  </span>
                  <h3 className="font-bold text-white text-base">SonicPro ANC Headphones</h3>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-brand-300 font-extrabold text-base">$249.99</span>
                    <Link
                      href="/products/1"
                      className="text-white hover:text-brand-400 font-semibold flex items-center gap-1"
                    >
                      View details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Browse Categories
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Find exactly what you need from our curated catalog collections.
            </p>
          </div>
          <Link
            href="/products"
            className="text-brand-600 hover:text-brand-700 font-semibold text-sm flex items-center gap-1 group"
          >
            <span>View all catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 text-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-slate-200/20"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white group-hover:text-brand-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {cat.count}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Trending Items
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Featured Products
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Top-rated items selected by our store specialists.
            </p>
          </div>
          <Link
            href="/products"
            className="text-brand-600 hover:text-brand-700 font-semibold text-sm flex items-center gap-1 group"
          >
            <span>See full list ({featuredProducts.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">No Products Found</h3>
            <p className="text-slate-500 text-sm">
              Please ensure the database seed script has been executed (`npm run db:seed`).
            </p>
          </div>
        )}
      </section>

      {/* Promotion / DevOps Feature Highlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-900 via-slate-900 to-slate-950 p-8 sm:p-12 text-white overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-brand-500/20 rounded-full blur-2xl" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-brand-500 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
              Monolithic Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready for Containerization & Kubernetes Pipelines.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              ShopSphere is designed with Next.js App Router and PostgreSQL to run effortlessly inside Docker containers, Helm charts, and automated CI/CD deployment pipelines.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-colors shadow-md"
              >
                Shop All Products Now
              </Link>
              <Link
                href="/api/health"
                target="_blank"
                className="px-6 py-3 bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-700 transition-colors"
              >
                Check Health Endpoint (/api/health)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
