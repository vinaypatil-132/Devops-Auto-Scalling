'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();

  const shippingCost = subtotal > 50 || cart.length === 0 ? 0 : 9.99;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + estimatedTax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-6 shadow-sm">
          <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto text-brand-600">
            <ShoppingBag className="w-10 h-10 stroke-[1.8]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900">Your Cart is Empty</h1>
            <p className="text-slate-500 text-sm">
              Looks like you haven't added any products to your shopping cart yet.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-brand-600/20"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review your selected items before proceeding to demo checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-semibold underline self-start sm:self-auto"
        >
          Clear Shopping Cart
        </button>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {cart.map((item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            const lineTotal = price * item.quantity;

            return (
              <div
                key={item.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:bg-slate-50/50 transition-colors"
              >
                {/* Item Thumbnail */}
                <Link
                  href={`/products/${item.id}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex-shrink-0 relative group"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>

                {/* Info & Quantity controls */}
                <div className="flex-1 space-y-1 w-full">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.id}`}
                      className="font-bold text-slate-900 text-base hover:text-brand-600 transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs text-slate-500 font-medium block">
                    Category: {item.category}
                  </span>

                  <div className="flex items-center justify-between pt-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-slate-600 hover:text-slate-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-bold text-xs text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-slate-600 hover:text-slate-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price total */}
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Unit: ${price.toFixed(2)}</span>
                      <span className="font-extrabold text-slate-900 text-base">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-24">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className="font-semibold text-slate-900">
                {shippingCost === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
                ) : (
                  `$${shippingCost.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Estimated Tax (8%)</span>
              <span className="font-semibold text-slate-900">${estimatedTax.toFixed(2)}</span>
            </div>

            {subtotal < 50 && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                Add <strong>${(50 - subtotal).toFixed(2)}</strong> more to get Free Express Shipping!
              </div>
            )}

            <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-slate-900">
              <span>Total</span>
              <span className="text-xl text-brand-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/20 hover:shadow-brand-500/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PostgreSQL Transactional Order</span>
          </div>
        </div>
      </div>
    </div>
  );
}
