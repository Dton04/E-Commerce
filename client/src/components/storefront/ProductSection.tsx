import React from 'react';
import Link from 'next/link';
import ProductCard, { StorefrontProductItem } from './ProductCard';

interface ProductSectionProps {
  title: string;
  subtitle: string;
  actionText: string;
  actionHref?: string;
  products: StorefrontProductItem[];
}

export default function ProductSection({
  title,
  subtitle,
  actionText,
  actionHref = '#',
  products,
}: ProductSectionProps) {
  return (
    <section className="w-full space-y-4">
      {/* Tiêu đề trang (Section Header) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {subtitle}
          </p>
        </div>
        <Link
          href={actionHref}
          className="text-xs sm:text-sm font-semibold text-[#4338ca] hover:text-[#3730a3] transition-colors self-start sm:self-end"
        >
          {actionText}
        </Link>
      </div>

      {/* Danh sách 4 sản phẩm (Product Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
