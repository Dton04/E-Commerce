import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NovaMart | Next-Gen E-Commerce, Multi-Variant Catalog & AI Discovery',
  description:
    'Discover authentic electronics, smartphones, and audio gear from authorized vendors. Enjoy real-time SKU inventory, AI recommendations, and verified affiliate marketing attribution.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-indigo-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
