'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Headphones, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                NovaMart
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              The next-generation multi-vendor e-commerce platform built with NestJS, Prisma 7 & Next.js. Features real-time multi-variant inventory, AI recommendations, and verified affiliate marketing attribution.
            </p>
            <div className="flex items-center space-x-3 text-xs text-zinc-500 pt-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Genuine Guaranteed
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-indigo-400">
                <Award className="w-4 h-4" /> Verified Sellers
              </span>
            </div>
          </div>

          {/* Catalog / Shop */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              Explore Catalog
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/?search=smartphone" className="hover:text-white transition-colors">
                  Smartphones & Tablets
                </Link>
              </li>
              <li>
                <Link href="/?search=laptop" className="hover:text-white transition-colors">
                  Laptops & Ultrabooks
                </Link>
              </li>
              <li>
                <Link href="/?search=audio" className="hover:text-white transition-colors">
                  Audio & Noise Canceling
                </Link>
              </li>
              <li>
                <Link href="/?search=watch" className="hover:text-white transition-colors">
                  Smartwatches & Fitness
                </Link>
              </li>
              <li>
                <Link href="#deals" className="hover:text-amber-400 transition-colors">
                  Flash Sales & Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Sellers & Affiliates */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              Partners & Affiliates
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#affiliate" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  Affiliate Program (Earn 10%)
                </Link>
              </li>
              <li>
                <Link href="/seller" className="hover:text-white transition-colors">
                  Open a Merchant Shop
                </Link>
              </li>
              <li>
                <Link href="/affiliate/portal" className="hover:text-white transition-colors">
                  Affiliate Analytics Portal
                </Link>
              </li>
              <li>
                <a
                  href="http://localhost:3000/api/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Swagger API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  7-Day Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy & Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © 2026 NovaMart E-Commerce Platform. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Powered by NestJS + Prisma + Next.js</span>
            <span>Security by JWT & SHA-256 Rotation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
