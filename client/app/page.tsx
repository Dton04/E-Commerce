import React, { Suspense } from 'react';
import HeroBanner from '../src/components/home/HeroBanner';
import CategorySection from '../src/components/home/CategorySection';
import FeaturedProducts from '../src/components/home/FeaturedProducts';
import ValueProps from '../src/components/home/ValueProps';
import AffiliateCtaSection from '../src/components/home/AffiliateCtaSection';

function CatalogLoadingFallback() {
  return (
    <div className="py-16 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-8 w-48 bg-zinc-200 rounded-md animate-pulse mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 animate-pulse space-y-4"
          >
            <div className="w-full aspect-square bg-zinc-200/80 rounded-xl" />
            <div className="h-4 w-3/4 bg-zinc-200/80 rounded" />
            <div className="h-3 w-1/2 bg-zinc-200/80 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Showcase & Primary CTA */}
      <HeroBanner />

      {/* 2. Value Propositions & Trust Pillars */}
      <ValueProps />

      {/* 3. Category Departments Carousel / Grid */}
      <CategorySection />

      {/* 4. Trending & Live Catalog Products with Multi-Variant SKUs */}
      <Suspense fallback={<CatalogLoadingFallback />}>
        <FeaturedProducts />
      </Suspense>

      {/* 5. Affiliate Partner Program Banner */}
      <AffiliateCtaSection />
    </div>
  );
}
