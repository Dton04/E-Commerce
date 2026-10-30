import React from 'react';
import { ShieldCheck, Truck, Sparkles, TrendingUp } from 'lucide-react';

const PILLARS = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    title: '100% Genuine Guaranteed',
    description:
      'All goods are sourced directly from verified authorized brand stores with complete manufacturer warranty.',
    bg: 'bg-emerald-50/80',
    border: 'border-emerald-200/60',
  },
  {
    icon: <Truck className="w-6 h-6 text-indigo-600" />,
    title: 'Lightning Express Dispatch',
    description:
      'Orders processed and dispatched within 24 hours with live multi-carrier transit updates.',
    bg: 'bg-indigo-50/80',
    border: 'border-indigo-200/60',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-violet-600" />,
    title: 'AI Smart Discovery',
    description:
      'Our neural recommendation engine suggests matched accessories and compatible variants for your devices.',
    bg: 'bg-violet-50/80',
    border: 'border-violet-200/60',
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
    title: '7-Day Affiliate Attribution',
    description:
      'Creators and affiliates enjoy up to 10% commission with cryptographic last-click attribution and automated ledger.',
    bg: 'bg-amber-50/80',
    border: 'border-amber-200/60',
  },
];

export default function ValueProps() {
  return (
    <section className="py-14 bg-zinc-50/50 border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-white border ${p.border} shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-4`}
                >
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-zinc-900 tracking-tight mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
