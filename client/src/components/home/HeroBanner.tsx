import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, Star } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-zinc-950 text-white pt-12 pb-20 sm:pt-16 sm:pb-24">
      {/* Background ambient glow shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Next-Gen Commerce & AI Recommendations</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Discover Premium Tech{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                With Smart Pricing
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Browse thousands of authentic electronics, smartphones, and audio gear from authorized vendors with multi-variant SKU precision and 7-day transparent affiliate rewards.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#products"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2 transition-all group"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#affiliate"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 hover:text-white text-sm font-semibold border border-zinc-700/80 hover:border-zinc-600 flex items-center justify-center gap-2 transition-all"
              >
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Earn With Affiliate</span>
              </Link>
            </div>

            {/* Trust metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-zinc-400">Authentic Goods</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-400">10%</p>
                <p className="text-xs text-zinc-400">Affiliate Commission</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">&lt; 10ms</p>
                <p className="text-xs text-zinc-400">Fast Query Engine</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-br from-zinc-800/90 via-zinc-900/90 to-zinc-950/90 border border-zinc-700/60 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> HOT DEAL OF THE DAY
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Apple Official
                </span>
              </div>

              {/* Product Mockup Image */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80"
                  alt="iPhone 16 Pro Titanium"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9 (1.2k)
                </div>
              </div>

              {/* Product Info Box */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  <span>Smartphones • Flagship</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">In Stock</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  iPhone 16 Pro Titanium 128GB
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-1">
                  A18 Pro chip, 48MP Fusion camera system & Grade 5 titanium chassis.
                </p>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-500 block">Starting from</span>
                    <span className="text-2xl font-black text-white">28.990.000 ₫</span>
                  </div>
                  <Link
                    href="#products"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
                  >
                    View SKUs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
