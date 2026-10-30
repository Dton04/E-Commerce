import React from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle2, DollarSign, BarChart3, Users } from 'lucide-react';

export default function AffiliateCtaSection() {
  return (
    <section
      id="affiliate"
      className="py-16 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden"
    >
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-indigo-800/60 to-violet-900/60 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>AFFILIATE PARTNER PROGRAM</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Turn Your Audience Into Daily Commission Revenue
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                Recommend top-tier tech products from authorized shops. Enjoy up to{' '}
                <span className="text-amber-300 font-bold">10% commission</span> per sale with reliable 7-day last-click attribution and automated ledger tracking.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time Clicks & Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent Payout Ledger</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant Unique Referral Links</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/affiliate/register"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-bold shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Become an Affiliate Today</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/affiliate/rules"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/20 transition-all text-center"
                >
                  Learn How Attribution Works
                </Link>
              </div>
            </div>

            {/* Right Stat Cards */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-700/60">
                <DollarSign className="w-6 h-6 text-amber-400 mb-2" />
                <p className="text-2xl font-black text-white">Up to 10%</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Commission Rate</p>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-700/60">
                <BarChart3 className="w-6 h-6 text-sky-400 mb-2" />
                <p className="text-2xl font-black text-white">7 Days</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Attribution Window</p>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-700/60 col-span-2">
                <Users className="w-6 h-6 text-emerald-400 mb-2" />
                <p className="text-xl font-bold text-white">Verified Multi-Vendor Catalog</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Over 10,000+ eligible SKUs across Apple, Sony, Samsung & more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
