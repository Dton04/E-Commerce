import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SmartCommerce AI · Chọn thông minh, Sống tiện hơn',
  description:
    'Nền tảng mua sắm trực tuyến thông minh với gợi ý cá nhân hóa AI, cam kết hàng chính hãng và đổi trả trong 7 ngày.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.className} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-[#0f172a] selection:bg-[#4338ca] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
