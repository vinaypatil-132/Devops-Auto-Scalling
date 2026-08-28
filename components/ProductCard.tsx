'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  category: string;
  image_url: string;
  stock: number;
  rating: number | string;
  rating_count: number;
  featured?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const priceNum = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
  const ratingNum = typeof product.rating === 'string' ? parseFloat(product.rating) : product.rating;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Image container */}
      <Link href={`/products/${product.id}`} className="block relative aspect-square bg-slate-100 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
          {product.featured && (
            <span className="bg-amber-500 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              <span className="ml-1 font-bold text-slate-800 text-xs">{ratingNum.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>({product.rating_count} reviews)</span>
          </div>

          {/* Title */}
          <Link
            href={`/products/${product.id}`}
            className="block font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer info: Price & Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Price</span>
            <span className="text-lg font-extrabold text-slate-900">
              ${priceNum.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
              added
                ? 'bg-emerald-600 text-white'
                : product.stock > 0
                ? 'bg-slate-900 text-white hover:bg-brand-600 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added!
              </>
            ) : product.stock > 0 ? (
              <>
                <ShoppingBag className="w-4 h-4" /> Add
              </>
            ) : (
              'Out of Stock'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
