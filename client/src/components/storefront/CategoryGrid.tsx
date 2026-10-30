import React from 'react';
import Link from 'next/link';
import { Headphones, LampDesk, Backpack, CupSoda, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    icon: <Headphones className="w-6 h-6 text-[#4338ca]" />,
    title: 'Âm thanh & công nghệ',
    desc: 'Tai nghe, bàn phím, phụ kiện',
    href: '/?category=audio-tech',
  },
  {
    icon: <LampDesk className="w-6 h-6 text-[#4338ca]" />,
    title: 'Góc nhà tiện nghi',
    desc: 'Đèn, đồ dùng, lưu trữ',
    href: '/?category=home-cozy',
  },
  {
    icon: <Backpack className="w-6 h-6 text-[#4338ca]" />,
    title: 'Ra phố nhẹ nhàng',
    desc: 'Balo và phụ kiện hằng ngày',
    href: '/?category=lifestyle-outdoor',
  },
  {
    icon: <CupSoda className="w-6 h-6 text-[#4338ca]" />,
    title: 'Sống khỏe mỗi ngày',
    desc: 'Bình nước và đồ dùng cá nhân',
    href: '/?category=wellness-daily',
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full space-y-4">
      {/* Tiêu đề trang */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
          Khám phá theo nhu cầu
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Mua đúng thứ bạn cần, dễ dàng hơn.
        </p>
      </div>

      {/* 4 Thẻ nội dung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.href}
            className="flex flex-col justify-between p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-[#4338ca]/40 hover:shadow-md transition-all group"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#eef2ff] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#0f172a] group-hover:text-[#4338ca] transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {cat.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-[#4338ca]">
              <span>Khám phá</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

