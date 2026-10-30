'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Sparkles,
  ShoppingBag,
  Heart,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-medium border border-amber-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> AI-Powered
            </span>
            <span className="hidden sm:inline text-zinc-300">
              Welcome to Next-Gen Marketplace with Smart AI Recommendations & Instant Affiliate Attribution
            </span>
          </div>
          <div className="flex items-center space-x-4 text-zinc-300">
            <Link
              href="#affiliate"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-medium"
            >
              <TrendingUp className="w-3.5 h-3.5" /> Affiliate Program (Earn up to 10%)
            </Link>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-xs text-zinc-400">
              Hotline: 1900-8888
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                NovaMart
              </span>
              <span className="hidden sm:block text-[10px] font-semibold text-indigo-600 uppercase tracking-widest -mt-1">
                E-Commerce AI
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl relative hidden md:flex items-center"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, or categories (e.g. iPhone, Laptop, Sony)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white text-zinc-900 text-sm pl-11 pr-24 py-2.5 rounded-full border border-zinc-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-full shadow-sm shadow-indigo-600/30 transition-all hover:shadow-md"
              >
                Search
              </button>
            </div>
          </form>

          {/* User actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="#deals"
              className="hidden lg:flex items-center space-x-1 text-sm font-medium text-zinc-700 hover:text-indigo-600 py-1.5 px-3 rounded-lg hover:bg-zinc-100/80 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Smart Deals</span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-zinc-700 hover:text-indigo-600 hover:bg-zinc-100/80 rounded-full transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 ? (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-600 rounded-full"></span>
              )}
            </Link>

            <div className="h-6 w-px bg-zinc-200 hidden sm:block"></div>

            <Link
              href="/login"
              className="hidden sm:flex items-center space-x-2 text-sm font-medium text-zinc-700 hover:text-indigo-600 py-1.5 px-3 rounded-lg hover:bg-zinc-100/80 transition-colors"
            >
              <User className="w-4 h-4 text-zinc-500" />
              <span>Sign In</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 md:hidden hover:bg-zinc-100 rounded-lg"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-100 text-zinc-900 text-sm pl-10 pr-20 py-2 rounded-full border border-zinc-200 focus:border-indigo-500 outline-none"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full"
            >
              Go
            </button>
          </form>
        </div>

        {/* Category Navigation Pills */}
        <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs font-medium text-zinc-600">
          <Link
            href="/"
            className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full shrink-0 font-semibold border border-indigo-200/60"
          >
            All Products
          </Link>
          <Link
            href="/?search=smartphone"
            className="px-3 py-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-full shrink-0 transition-colors"
          >
            Smartphones
          </Link>
          <Link
            href="/?search=laptop"
            className="px-3 py-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-full shrink-0 transition-colors"
          >
            Laptops & MacBooks
          </Link>
          <Link
            href="/?search=audio"
            className="px-3 py-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-full shrink-0 transition-colors"
          >
            Audio & Headphones
          </Link>
          <Link
            href="/?search=watch"
            className="px-3 py-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-full shrink-0 transition-colors"
          >
            Smartwatches
          </Link>
          <Link
            href="/?search=accessories"
            className="px-3 py-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-full shrink-0 transition-colors"
          >
            Accessories
          </Link>
          <Link
            href="#deals"
            className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-full shrink-0 font-semibold flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-rose-500" />
            Flash Deals
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-zinc-800"
          >
            Home
          </Link>
          <Link
            href="#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-600"
          >
            Categories
          </Link>
          <Link
            href="#affiliate"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-amber-600"
          >
            Affiliate Program (Earn 10%)
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-indigo-600"
          >
            Sign In / Register
          </Link>
        </div>
      )}
    </header>
  );
}
