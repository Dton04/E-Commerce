import React, { Suspense } from 'react';
import CampaignBanner from '@/src/components/storefront/CampaignBanner';
import ServiceCommitments from '@/src/components/storefront/ServiceCommitments';
import ProductSection from '@/src/components/storefront/ProductSection';
import CategoryGrid from '@/src/components/storefront/CategoryGrid';
import ConfidenceCta from '@/src/components/storefront/ConfidenceCta';
import { fetchProducts, mapBackendProductToStorefront } from '@/src/lib/api';
import {
  POPULAR_PRODUCTS as FALLBACK_POPULAR,
  RECOMMENDATION_PRODUCTS as FALLBACK_RECS,
} from '@/src/data/mock-products';

interface PageProps {
  searchParams?: Promise<{
    search?: string;
    categoryId?: string;
  }>;
}

async function LiveStorefrontContent(props: PageProps) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const search = searchParams?.search;
  const categoryId = searchParams?.categoryId;

  // Lấy dữ liệu sản phẩm thực tế từ backend NestJS (/api/v1/products)
  const productResponse = await fetchProducts({
    limit: 8,
    search: search || undefined,
    categoryId: categoryId || undefined,
    sortBy: 'newest',
  });

  const backendProducts = productResponse.data;

  // Chuyển đổi dữ liệu backend sang định dạng StorefrontProductItem của Figma
  const mappedProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts.map((p, idx) =>
          mapBackendProductToStorefront(
            p,
            idx === 0
              ? 'Vì bạn quan tâm công nghệ'
              : idx === 1
              ? 'Phù hợp nhịp sống hằng ngày'
              : idx === 2
              ? 'Lựa chọn hàng đầu của tuần'
              : 'Cho góc làm việc của bạn',
          ),
        )
      : null;

  // Chia thành 2 danh sách sản phẩm hiển thị theo đúng bố cục Figma
  const popularList = mappedProducts
    ? mappedProducts.slice(0, 4)
    : FALLBACK_POPULAR;

  const recommendationList = mappedProducts
    ? mappedProducts.slice(mappedProducts.length > 4 ? 4 : 0, 8)
    : FALLBACK_RECS;

  return (
    <div className="max-w-[1312px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      {/* Thông báo nếu đang lọc theo từ khóa hoặc danh mục */}
      {(search || categoryId) && (
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-indigo-900 font-medium">
            Đang hiển thị kết quả lọc {search ? `cho từ khóa "${search}"` : ''}
            {categoryId ? ` (Mã danh mục: ${categoryId})` : ''} — Tìm thấy{' '}
            <span className="font-bold">{backendProducts.length}</span> sản phẩm từ hệ thống.
          </p>
          <a
            href="/"
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 underline"
          >
            Xóa bộ lọc
          </a>
        </div>
      )}

      {/* 1. Chiến dịch mùa thu (Hero Section) */}
      <CampaignBanner />

      {/* 2. Cam kết dịch vụ */}
      <ServiceCommitments />

      {/* 3. Được yêu thích tuần này (Dữ liệu từ NestJS Backend) */}
      <div id="products">
        <ProductSection
          title="Được yêu thích tuần này"
          subtitle="Những lựa chọn đáng tin cậy từ kho hàng trực tiếp của hệ thống."
          actionText="Xem tất cả →"
          actionHref="/products?filter=popular"
          products={popularList}
        />
      </div>

      {/* 4. Gợi ý hợp với bạn (Dữ liệu từ NestJS Backend) */}
      <ProductSection
        title="Gợi ý hợp với bạn"
        subtitle="Dựa trên danh mục và độ tương thích thiết bị của bạn."
        actionText="Điều chỉnh sở thích"
        actionHref="/preferences"
        products={recommendationList}
      />

      {/* 5. Khám phá theo nhu cầu */}
      <CategoryGrid />

      {/* 6. Lời mời mua sắm */}
      <ConfidenceCta />
    </div>
  );
}

export default function Home(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1312px] w-full mx-auto px-4 sm:px-8 py-16 text-center text-slate-500 text-sm">
          Đang tải dữ liệu sản phẩm từ máy chủ SmartCommerce...
        </div>
      }
    >
      <LiveStorefrontContent {...props} />
    </Suspense>
  );
}
