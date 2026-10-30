import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function CampaignBanner() {
  return (
    <section className="w-full bg-[#f1f0ed] rounded-xl overflow-hidden p-8 sm:p-12 lg:p-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Thông điệp chiến dịch (Left column) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Nhãn trạng thái */}
          <div className="text-xs font-semibold text-slate-700 tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
            <span>CHỌN TỐT CHO MỖI NGÀY</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] leading-[1.25] tracking-tight">
            Những món đồ nhỏ.
            <br />
            Trải nghiệm tốt hơn.
          </h1>

          {/* Mô tả */}
          <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
            Âm thanh chất lượng, góc làm việc gọn gàng và những tiện ích bạn thực sự cần.
          </p>

          {/* Nhóm nút hành động */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 bg-[#4338ca] hover:bg-[#3730a3] text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-sm transition-all group"
            >
              <span>Khám phá bộ sưu tập</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              Ưu đãi đến 20/10
            </span>
          </div>
        </div>

        {/* Ảnh chiến dịch (Right column) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/figma/hero-banner.png"
              alt="Chiến dịch mùa thu"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

