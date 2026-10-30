'use client';

import React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Tablet,
  Keyboard,
  Gamepad2,
  Tv,
  ArrowRight,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  count: string;
  icon: React.ReactNode;
  bgGradient: string;
  borderHover: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: '1',
    name: 'Smartphones',
    slug: 'smartphones',
    count: '240+ Items',
    icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
    bgGradient: 'from-indigo-50 to-indigo-100/60',
    borderHover: 'hover:border-indigo-300',
  },
  {
    id: '2',
    name: 'Laptops & MacBooks',
    slug: 'laptops',
    count: '180+ Items',
    icon: <Laptop className="w-6 h-6 text-sky-600" />,
    bgGradient: 'from-sky-50 to-sky-100/60',
    borderHover: 'hover:border-sky-300',
  },
  {
    id: '3',
    name: 'Audio & Headphones',
    slug: 'audio',
    count: '320+ Items',
    icon: <Headphones className="w-6 h-6 text-violet-600" />,
    bgGradient: 'from-violet-50 to-violet-100/60',
    borderHover: 'hover:border-violet-300',
  },
  {
    id: '4',
    name: 'Smartwatches',
    slug: 'smartwatches',
    count: '115+ Items',
    icon: <Watch className="w-6 h-6 text-amber-600" />,
    bgGradient: 'from-amber-50 to-amber-100/60',
    borderHover: 'hover:border-amber-300',
  },
  {
    id: '5',
    name: 'Tablets & iPads',
    slug: 'tablets',
    count: '95+ Items',
    icon: <Tablet className="w-6 h-6 text-emerald-600" />,
    bgGradient: 'from-emerald-50 to-emerald-100/60',
    borderHover: 'hover:border-emerald-300',
  },
  {
    id: '6',
    name: 'Peripherals & Accessories',
    slug: 'accessories',
    count: '540+ Items',
    icon: <Keyboard className="w-6 h-6 text-rose-600" />,
    bgGradient: 'from-rose-50 to-rose-100/60',
    borderHover: 'hover:border-rose-300',
  },
  {
    id: '7',
    name: 'Gaming Gear',
    slug: 'gaming',
    count: '150+ Items',
    icon: <Gamepad2 className="w-6 h-6 text-purple-600" />,
    bgGradient: 'from-purple-50 to-purple-100/60',
    borderHover: 'hover:border-purple-300',
  },
  {
    id: '8',
    name: 'Smart Home & TV',
    slug: 'smart-home',
    count: '80+ Items',
    icon: <Tv className="w-6 h-6 text-cyan-600" />,
    bgGradient: 'from-cyan-50 to-cyan-100/60',
    borderHover: 'hover:border-cyan-300',
  },
];

export default function CategorySection() {
  return (
    <section id="categories" className="py-14 bg-zinc-50 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Explore By Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
              Popular Product Departments
            </h2>
          </div>
          <Link
            href="#products"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 transition-colors group"
          >
            <span>View all departments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/?search=${cat.slug}`}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs hover:shadow-md transition-all group ${cat.borderHover}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.bgGradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                {cat.icon}
              </div>
              <h3 className="text-xs font-bold text-zinc-900 text-center line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-zinc-500 text-center mt-0.5">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
