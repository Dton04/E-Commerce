import React from 'react';
import Link from 'next/link';

export default function StoreFooter() {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-200 mt-16 pt-16 pb-12">
      <div className="max-w-[1312px] mx-auto px-4 sm:px-8">
        {/* Nhóm nội dung chính (4 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-200/80">
          {/* Cột 1: Thương hiệu & Hotline */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold tracking-tight text-[#0f172a]">
              SmartCommerce AI
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Chọn thông minh. Sống tiện hơn.
            </p>
            <p className="text-xs text-slate-500 pt-2 leading-relaxed">
              Hỗ trợ: <span className="font-semibold text-slate-700">1900 6868</span>
              <br />
              8:00–22:00 mỗi ngày
            </p>
          </div>

          {/* Cột 2: Về SmartCommerce */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Về SmartCommerce
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-[#4338ca] transition-colors">
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link href="/merchant/register" className="hover:text-[#4338ca] transition-colors">
                  Trở thành nhà bán hàng
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="hover:text-[#4338ca] transition-colors">
                  Chương trình cộng tác viên
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <Link href="/shipping" className="hover:text-[#4338ca] transition-colors">
                  Giao hàng & đổi trả
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#4338ca] transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#4338ca] transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Thanh toán an toàn */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Thanh toán an toàn
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>MoMo · VNPay · COD</li>
              <li>Visa · Mastercard</li>
              <li className="text-emerald-600 font-medium">Bảo vệ người mua 100%</li>
            </ul>
          </div>
        </div>

        {/* Dòng bản quyền dưới cùng */}
        <div className="pt-8 text-center text-xs text-slate-500">
          © 2026 SmartCommerce AI · Dữ liệu minh họa cho thiết kế
        </div>
      </div>
    </footer>
  );
}

