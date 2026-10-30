'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, PaginatedResult } from '../../types';
import { fetchProducts } from '../../lib/api';
import ProductCard from './ProductCard';
import {
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
  Search,
  AlertCircle,
  PackageX,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function FeaturedProducts() {
  const searchParams = useSearchParams();
  const searchParam = searchParams?.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination State
  const [activeTab, setActiveTab] = useState<'all' | 'flagship' | 'audio' | 'affiliate'>('all');
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'name_asc'>('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (searchParam !== searchTerm) {
      setSearchTerm(searchParam);
      setPage(1);
    }
  }, [searchParam]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let effectiveSearch = searchTerm;
      if (activeTab === 'flagship' && !searchTerm) effectiveSearch = 'Pro';
      if (activeTab === 'audio' && !searchTerm) effectiveSearch = 'Headphones';

      const res = await fetchProducts({
        page,
        limit: 8,
        search: effectiveSearch.trim() || undefined,
        sortBy,
      });

      let items = res.data;
      if (activeTab === 'affiliate') {
        items = items.filter(
          (p) => p.commissionRate !== null && p.commissionRate !== undefined,
        );
      }

      setProducts(items);
      setTotalPages(res.meta.totalPages || 1);
      setTotalItems(res.meta.total || 0);
    } catch (err: any) {
      console.error('Error fetching catalog products:', err);
      setError(
        'Unable to connect to the marketplace API. Please ensure the backend server is running on port 3000.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [activeTab, sortBy, page, searchTerm]);

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catalog & Multi-Variant SKUs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
              Trending Products & Flash Deals
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Showing {totalItems} verified products with real-time stock and prices
            </p>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setPage(1);
              }}
              className="text-xs bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer font-medium"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('all');
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'all'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => {
              setActiveTab('flagship');
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'flagship'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            Flagship Devices (Pro / Max)
          </button>
          <button
            onClick={() => {
              setActiveTab('audio');
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'audio'
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            Audio & Acoustics
          </button>
          <button
            onClick={() => {
              setActiveTab('affiliate');
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'affiliate'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-700 bg-amber-50/80 hover:bg-amber-100'
            }`}
          >
            Affiliate High Commission
          </button>
        </div>

        {/* Content State: Loading, Error, Empty, or Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 animate-pulse space-y-4"
              >
                <div className="w-full aspect-square bg-zinc-200/80 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-3 w-1/3 bg-zinc-200/80 rounded" />
                  <div className="h-4 w-3/4 bg-zinc-200/80 rounded" />
                  <div className="h-3 w-1/2 bg-zinc-200/80 rounded" />
                </div>
                <div className="h-6 w-full bg-zinc-200/80 rounded pt-2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-xl mx-auto my-8">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-rose-900">
              Failed to load catalog products
            </h3>
            <p className="text-xs text-rose-700 mt-1 mb-4 leading-relaxed">
              {error}
            </p>
            <button
              onClick={loadProducts}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Request</span>
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">No products found</h3>
            <p className="text-xs text-zinc-500 mt-1 mb-6">
              No matching products found for the current query. Try adjusting your keyword or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveTab('all');
                setSortBy('newest');
                setPage(1);
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-full shadow-xs transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 text-xs font-semibold text-zinc-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
