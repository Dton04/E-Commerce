import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function ConfidenceCta() {
  return (
    <section className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Nội dung bên trái */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4338ca]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
              Mua sắm tự tin, từ lần đầu tiên
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Đánh giá thật, thanh toán linh hoạt với MoMo, VNPay hoặc khi nhận hàng.
          </p>
        </div>

        {/* Nút hành động bên phải */}
        <div className="shrink-0">
          <Link
            href="#products"
            className="inline-flex items-center gap-2 bg-[#4338ca] hover:bg-[#3730a3] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg shadow-sm transition-all group"
          >
            <span>Tìm món đồ của bạn</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

