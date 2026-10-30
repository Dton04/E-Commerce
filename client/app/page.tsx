import React from 'react';
import CampaignBanner from '@/src/components/storefront/CampaignBanner';
import ServiceCommitments from '@/src/components/storefront/ServiceCommitments';
import ProductSection from '@/src/components/storefront/ProductSection';
import CategoryGrid from '@/src/components/storefront/CategoryGrid';
import ConfidenceCta from '@/src/components/storefront/ConfidenceCta';
import {
  POPULAR_PRODUCTS,
  RECOMMENDATION_PRODUCTS,
} from '@/src/data/mock-products';

export default function Home() {
  return (
    <div className="max-w-[1312px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      {/* 1. Chiến dịch mùa thu (Hero Section) */}
      <CampaignBanner />

      {/* 2. Cam kết dịch vụ */}
      <ServiceCommitments />

      {/* 3. Được yêu thích tuần này */}
      <div id="products">
        <ProductSection
          title="Được yêu thích tuần này"
          subtitle="Những lựa chọn đáng tin từ cộng đồng người mua."
          actionText="Xem tất cả →"
          actionHref="/products?filter=popular"
          products={POPULAR_PRODUCTS}
        />
      </div>

      {/* 4. Gợi ý hợp với bạn */}
      <ProductSection
        title="Gợi ý hợp với bạn"
        subtitle="Dựa trên sở thích đã chọn, không phải quyết định mua hàng tự động."
        actionText="Điều chỉnh sở thích"
        actionHref="/preferences"
        products={RECOMMENDATION_PRODUCTS}
      />

      {/* 5. Khám phá theo nhu cầu */}
      <CategoryGrid />

      {/* 6. Lời mời mua sắm */}
      <ConfidenceCta />
    </div>
  );
}
