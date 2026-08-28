'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/components/ProductCard';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';

export function AddToCartSection({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const priceNum = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Quantity
        </span>
        <span className="text-xs font-medium text-slate-500">
          Subtotal: <strong className="text-slate-900 font-bold">${(priceNum * quantity).toFixed(2)}</strong>
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Quantity selector */}
        <div className="flex items-center justify-between border border-slate-300 rounded-xl bg-white px-3 py-2 sm:w-36">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="p-1 text-slate-600 hover:text-slate-900 disabled:text-slate-300 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-bold text-sm text-slate-900 px-4">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= product.stock}
            className="p-1 text-slate-600 hover:text-slate-900 disabled:text-slate-300 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to cart CTA */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
            added
              ? 'bg-emerald-600 text-white'
              : product.stock > 0
              ? 'bg-slate-900 text-white hover:bg-brand-600 active:scale-98 shadow-brand-500/10'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" /> Added to Cart!
            </>
          ) : product.stock > 0 ? (
            <>
              <ShoppingBag className="w-5 h-5" /> Add to Shopping Cart
            </>
          ) : (
            'Out of Stock'
          )}
        </button>
      </div>
    </div>
  );
}
