'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

export default function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* 1. Thanh dịch vụ (Top Announcement Bar) */}
      <div className="bg-[#0f172a] text-white text-xs py-2 px-4 text-center font-normal tracking-wide">
        Mua an tâm · Đổi trả 7 ngày · Miễn phí giao hàng từ 2 triệu
      </div>

      {/* 2. Tìm kiếm và tài khoản (Main Header) */}
      <div className="max-w-[1312px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Thương hiệu */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f172a]">
            SmartCommerce AI
          </span>
        </Link>

        {/* Ô Tìm kiếm */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm sản phẩm, thương hiệu..."
              className="w-full bg-[#f8fafc] text-sm text-slate-900 placeholder:text-slate-400 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:bg-white focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Hành động & Người dùng */}
        <div className="flex items-center gap-5 sm:gap-6 text-sm font-medium text-slate-700">
          <Link
            href="/orders"
            className="hidden sm:inline-block hover:text-[#4338ca] transition-colors"
          >
            Đơn hàng
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-1.5 hover:text-[#4338ca] transition-colors"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline font-semibold text-slate-900">
              Minh Anh
            </span>
          </Link>

          {/* Giỏ hàng Button */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 bg-[#4338ca] hover:bg-[#3730a3] text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-xs transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Giỏ hàng · 2</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-600 md:hidden hover:bg-slate-100 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm sản phẩm, thương hiệu..."
            className="w-full bg-[#f8fafc] text-sm text-slate-900 placeholder:text-slate-400 pl-10 pr-4 py-2 rounded-lg border border-slate-200 outline-none"
          />
        </div>
      </div>

      {/* 3. Danh mục (Category Navigation Bar) */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-[1312px] mx-auto px-4 sm:px-8 py-2.5 flex items-center gap-6 overflow-x-auto text-xs sm:text-sm font-medium text-slate-600 whitespace-nowrap scrollbar-none">
          <Link
            href="/categories"
            className="flex items-center gap-1.5 font-bold text-slate-900 hover:text-[#4338ca] transition-colors"
          >
            <span>☰</span>
            <span>Tất cả danh mục</span>
          </Link>
          <Link
            href="/?category=tech"
            className="hover:text-slate-900 transition-colors"
          >
            Công nghệ
          </Link>
          <Link
            href="/?category=home"
            className="hover:text-slate-900 transition-colors"
          >
            Nhà cửa & đời sống
          </Link>
          <Link
            href="/?category=fashion"
            className="hover:text-slate-900 transition-colors"
          >
            Thời trang
          </Link>
          <Link
            href="/?tab=deals"
            className="hover:text-slate-900 transition-colors"
          >
            Ưu đãi hôm nay
          </Link>
          <Link
            href="/?tab=for-you"
            className="text-[#4338ca] font-semibold hover:text-[#3730a3] transition-colors"
          >
            Dành riêng cho bạn
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <Link
            href="/orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 py-1"
          >
            Đơn hàng của tôi
          </Link>
          <Link
            href="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 py-1"
          >
            Tài khoản (Minh Anh)
          </Link>
          <div className="pt-2 border-t border-slate-100 space-y-2 text-sm text-slate-600">
            <Link href="/?category=tech" className="block py-1">
              Công nghệ
            </Link>
            <Link href="/?category=home" className="block py-1">
              Nhà cửa & đời sống
            </Link>
            <Link href="/?category=fashion" className="block py-1">
              Thời trang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

