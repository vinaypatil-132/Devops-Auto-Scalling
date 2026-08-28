'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, CreditCard, Truck, AlertCircle, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    shipping_address: '',
    city: '',
    postal_code: '',
    payment_method: 'Demo Credit Card (Test Only)',
  });

  const shippingCost = subtotal > 50 || cart.length === 0 ? 0 : 9.99;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + estimatedTax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="text-slate-500 text-sm">Add some products before checking out.</p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: grandTotal,
          items: cart.map((item) => ({
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
            price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order');
      }

      // Order created in PostgreSQL successfully
      clearCart();
      router.push(`/checkout/success?orderId=${data.order_id}`);
    } catch (err: any) {
      console.error('Order submission error:', err);
      setErrorMessage(err.message || 'An error occurred while placing your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Cart
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Checkout
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Complete your information to finalize your PostgreSQL demo order.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-800 text-sm font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer Information Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Shipping & Contact Information
            </h2>
            <p className="text-xs text-slate-500">
              Where should we deliver your ShopSphere order?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customer_name"
                required
                placeholder="e.g. Vinay Kumar"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="customer_email"
                required
                placeholder="e.g. vinay@example.com"
                value={formData.customer_email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="shipping_address"
                required
                placeholder="e.g. 100 Innovation Way, Tech Park"
                value={formData.shipping_address}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                required
                placeholder="e.g. Bengaluru"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Postal / Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postal_code"
                required
                placeholder="e.g. 560001"
                value={formData.postal_code}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Payment Method Selector (DEMO TEST ONLY) */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Payment Method
              </h2>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                Demo / Test Mode Only
              </span>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>
                No real payment or credit card processing will occur. This order will be stored directly in PostgreSQL.
              </span>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-brand-500 bg-brand-50/50 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="Demo Credit Card (Test Only)"
                  checked={formData.payment_method === 'Demo Credit Card (Test Only)'}
                  onChange={handleChange}
                  className="text-brand-600 focus:ring-brand-500"
                />
                <CreditCard className="w-5 h-5 text-brand-600" />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 text-xs block">
                    Demo Credit Card (Simulated)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Instant approval test mode
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="Cash on Delivery (Test Only)"
                  checked={formData.payment_method === 'Cash on Delivery (Test Only)'}
                  onChange={handleChange}
                  className="text-brand-600 focus:ring-brand-500"
                />
                <Truck className="w-5 h-5 text-slate-600" />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 text-xs block">
                    Pay on Delivery (Simulated)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Test cash payment workflow
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary & Submit Button */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-24">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
            Items in Order ({cart.length})
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => {
              const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
              return (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-slate-900">
                    ${(price * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-sm border-t border-slate-100 pt-4">
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Shipping</span>
              <span className="font-bold text-slate-900">
                {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Estimated Tax (8%)</span>
              <span className="font-bold text-slate-900">${estimatedTax.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-slate-900">
              <span>Total Amount</span>
              <span className="text-xl text-brand-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Saving Order to PostgreSQL...</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Place Order (${grandTotal.toFixed(2)})</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
