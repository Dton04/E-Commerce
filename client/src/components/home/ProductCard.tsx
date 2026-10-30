'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../../types';
import { formatPrice, getLowestPrice, resolveImageUrl } from '../../lib/api';
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Sparkles,
  Layers,
  Check,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    product.images && product.images.length > 0
      ? resolveImageUrl(product.images[0])
      : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  );

  const lowestPrice = getLowestPrice(product);
  const activeSkusCount =
    product.skus?.filter((sku) => sku.isActive).length ?? 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const commissionPercent = product.commissionRate
    ? (parseFloat(product.commissionRate.toString()) * 100).toFixed(0)
    : null;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-zinc-200/90 hover:border-indigo-500/40 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden">
      {/* Top badges bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {commissionPercent && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-xs shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> {commissionPercent}% Comm
          </span>
        )}
        {product.status === 'PUBLISHED' && (
          <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-900/70 text-white backdrop-blur-xs">
            Official
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden flex items-center justify-center p-4">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() =>
            setImgSrc(
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
            )
          }
          className="object-contain w-full h-full group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Shop & Category header */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500">
            <span className="truncate max-w-[120px] font-medium text-indigo-600 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-indigo-500 shrink-0" />
              {product.shop?.name || 'Verified Shop'}
            </span>
            {product.category && (
              <span className="truncate max-w-[100px] text-zinc-400">
                {product.category.name}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Variants and Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-0.5">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-zinc-700">4.9</span>
              <span className="text-zinc-400 text-[11px]">(80+)</span>
            </div>
            {activeSkusCount > 0 && (
              <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                <Layers className="w-3 h-3 text-zinc-400" />
                {activeSkusCount} {activeSkusCount === 1 ? 'SKU' : 'SKUs'}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3.5 mt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-zinc-400 block font-medium uppercase">
              From
            </span>
            <span className="text-base font-bold text-zinc-900 tracking-tight">
              {formatPrice(lowestPrice)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-100 hover:bg-indigo-600 text-zinc-700 hover:text-white'
            }`}
            title="Add to Cart"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
