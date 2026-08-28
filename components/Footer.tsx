import React from 'react';
import Link from 'next/link';
import { Globe, ShieldCheck, Truck, Clock, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      {/* Features Bar */}
      <div className="border-b border-slate-800 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400">
              <Truck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Free Express Shipping</h4>
              <p className="text-xs text-slate-400">On all orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">PostgreSQL Backend</h4>
              <p className="text-xs text-slate-400">Transactional PostgreSQL DB</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400">
              <Clock className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">24/7 Support Ready</h4>
              <p className="text-xs text-slate-400">Dedicated assistance team</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400">
              <Globe className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">DevOps Architecture</h4>
              <p className="text-xs text-slate-400">Container & K8s ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-extrabold text-xl text-white">
              Shop<span className="text-brand-500">Sphere</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A modern, monolithic e-commerce application built with Next.js App Router, TypeScript, and PostgreSQL. Designed as a realistic DevOps practice benchmark.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Shop</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/products?category=Electronics" className="hover:text-white transition-colors">Electronics</Link></li>
            <li><Link href="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            <li><Link href="/products?category=Apparel" className="hover:text-white transition-colors">Apparel</Link></li>
            <li><Link href="/products?category=Home%20%26%20Office" className="hover:text-white transition-colors">Home & Office</Link></li>
          </ul>
        </div>

        {/* Architecture & DevOps info */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">DevOps Stack</h3>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>Framework: Next.js 14 App Router</li>
            <li>Database: PostgreSQL 16</li>
            <li>Language: TypeScript</li>
            <li>Styling: Tailwind CSS</li>
            <li>Health Check: <Link href="/api/health" className="text-brand-400 hover:underline">/api/health</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Newsletter</h3>
          <p className="text-xs text-slate-400 mb-3">Subscribe for product updates and DevOps release notes.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500 w-full"
            />
            <button className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ShopSphere Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for DevOps Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
