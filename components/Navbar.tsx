'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Globe, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span className="inline-block bg-brand-600 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold mr-2">
          DevOps Edition
        </span>
        Free shipping on all orders over $50 | Monolithic Next.js + PostgreSQL Backend
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
                <Globe className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-tight">
                  Shop<span className="text-brand-600">Sphere</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
                  Premium Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 text-sm font-semibold text-slate-700">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-100 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-100 transition-colors"
              >
                All Products
              </Link>
              <Link
                href="/products?category=Electronics"
                className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-100 transition-colors"
              >
                Electronics
              </Link>
              <Link
                href="/products?category=Accessories"
                className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-100 transition-colors"
              >
                Accessories
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex flex-1 max-w-md items-center relative"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 text-slate-900 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 p-1.5 rounded-full text-slate-500 hover:text-brand-600 hover:bg-slate-200 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Cart & Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-100 transition-colors flex items-center gap-2 group"
            >
              <ShoppingBag className="w-6 h-6 stroke-[1.8] group-hover:scale-105 transition-transform" />
              <span className="hidden lg:inline text-xs font-bold text-slate-700">
                Cart
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 text-slate-900 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-slate-500"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            <span>All Products</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/products?category=Electronics"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            <span>Electronics</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/products?category=Accessories"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-lg text-slate-800 font-medium hover:bg-slate-100"
          >
            <span>Accessories</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-lg text-brand-600 font-semibold bg-brand-50 hover:bg-brand-100"
          >
            <span>View Cart ({totalItems})</span>
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>
      )}
    </header>
  );
}
