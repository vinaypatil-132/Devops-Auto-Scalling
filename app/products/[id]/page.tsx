import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProductCard, Product } from '@/components/ProductCard';
import { AddToCartSection } from './AddToCartSection';
import { Star, ShieldCheck, Truck, RotateCcw, ArrowLeft } from 'lucide-react';

export const revalidate = 0;

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: number): Promise<Product | null> {
  try {
    const res = await query('SELECT * FROM products WHERE id = $1', [id]);
    return res.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

async function getRelatedProducts(category: string, currentId: number): Promise<Product[]> {
  try {
    const res = await query(
      'SELECT * FROM products WHERE category = $1 AND id != $2 LIMIT 4',
      [category, currentId]
    );
    return res.rows;
  } catch (error) {
    return [];
  }
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const idNum = parseInt(params.id, 10);
  if (isNaN(idNum)) {
    notFound();
  }

  const product = await getProduct(idNum);
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  const priceNum = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
  const ratingNum = typeof product.rating === 'string' ? parseFloat(product.rating) : product.rating;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Large Product Image */}
        <div className="lg:col-span-6 relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-slate-900/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {product.category}
            </span>
            {product.featured && (
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Featured Product
              </span>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="ml-1 font-bold text-slate-800 text-sm">
                  {ratingNum.toFixed(1)}
                </span>
              </div>
              <span>•</span>
              <span className="font-medium text-slate-600">
                {product.rating_count} verified customer reviews
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ${priceNum.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Taxes included • Free Shipping over $50
              </span>
            </div>

            {/* Stock status indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
              <span className="text-xs font-bold text-slate-700">
                {product.stock > 0
                  ? `In Stock (${product.stock} items available)`
                  : 'Out of Stock'}
              </span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed pt-2 border-t border-slate-100">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Client Controls */}
          <AddToCartSection product={product} />

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            <div className="flex flex-col items-center space-y-1">
              <Truck className="w-5 h-5 text-brand-600" />
              <span className="font-semibold text-slate-800">Fast Delivery</span>
              <span className="text-[11px]">2-3 Business Days</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span className="font-semibold text-slate-800">PostgreSQL Order</span>
              <span className="text-[11px]">Transactional record</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RotateCcw className="w-5 h-5 text-brand-600" />
              <span className="font-semibold text-slate-800">30-Day Returns</span>
              <span className="text-[11px]">Hassle-free guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
