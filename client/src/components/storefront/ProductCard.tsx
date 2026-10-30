import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export interface StorefrontProductItem {
  id: string;
  badge?: string;
  name: string;
  image: string;
  rating: string;
  reviews: string;
  price: string;
  originalPrice: string;
  tags: string;
}

interface ProductCardProps {
  product: StorefrontProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col justify-between bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:border-[#4338ca]/40 hover:shadow-md transition-all group">
      <div>
        {/* Nhãn gợi ý cá nhân hóa */}
        {product.badge && (
          <div className="text-[11px] font-semibold text-[#4338ca] mb-2 line-clamp-1">
            {product.badge}
          </div>
        )}

        {/* Khung ảnh sản phẩm */}
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#f8fafc] mb-3 flex items-center justify-center p-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
          />
        </div>

        {/* Tên sản phẩm */}
        <h3 className="text-sm font-semibold text-[#0f172a] group-hover:text-[#4338ca] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Đánh giá */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
          <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span>·</span>
          <span>{product.reviews} đánh giá</span>
        </div>
      </div>

      {/* Giá & Cam kết */}
      <div className="pt-3 mt-3 border-t border-slate-100">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-[#0f172a]">
            {product.price}
          </span>
          <span className="text-xs text-slate-400 line-through">
            {product.originalPrice}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          {product.tags}
        </p>
      </div>
    </article>
  );
}
