import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headset } from 'lucide-react';

const COMMITMENTS = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#4338ca]" />,
    title: 'Hàng chính hãng',
    desc: 'Nguồn gốc rõ ràng',
  },
  {
    icon: <Truck className="w-6 h-6 text-[#4338ca]" />,
    title: 'Giao hàng toàn quốc',
    desc: 'Theo dõi từng chặng',
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-[#4338ca]" />,
    title: 'Đổi trả trong 7 ngày',
    desc: 'Hỗ trợ nhanh chóng',
  },
  {
    icon: <Headset className="w-6 h-6 text-[#4338ca]" />,
    title: 'Luôn có người hỗ trợ',
    desc: 'AI và đội ngũ CSKH',
  },
];

export default function ServiceCommitments() {
  return (
    <section className="w-full py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {COMMITMENTS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-[#4338ca]/30 transition-colors"
          >
            <div className="shrink-0 p-2 rounded-lg bg-[#eef2ff]">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0f172a] leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

