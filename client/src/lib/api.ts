import { Category, PaginatedResult, Product, ProductFilterParams } from '../types';
import { StorefrontProductItem } from '../components/storefront/ProductCard';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';

export function resolveImageUrl(url?: string | null): string {
  if (!url) {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
  }
  if (url.startsWith('/uploads')) {
    return `${SERVER_BASE_URL}${url}`;
  }
  return url;
}

export function formatPrice(price: string | number | undefined): string {
  if (price === undefined || price === null) return '0 ₫';
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(num);
}

export function getLowestPrice(product: Product): number {
  if (!product.skus || product.skus.length === 0) return 0;
  const activeSkus = product.skus.filter((sku) => sku.isActive);
  if (activeSkus.length === 0) return 0;
  const prices = activeSkus.map((sku) =>
    typeof sku.price === 'string' ? parseFloat(sku.price) : Number(sku.price),
  );
  return Math.min(...prices);
}

/**
 * Chuyển đổi dữ liệu Product từ NestJS backend thành giao diện StorefrontProductItem (chuẩn Figma)
 */
export function mapBackendProductToStorefront(
  product: Product,
  badge?: string,
): StorefrontProductItem {
  const lowestPrice = getLowestPrice(product);
  const originalPriceNumber = lowestPrice > 0 ? Math.round(lowestPrice * 1.2) : 0;

  return {
    id: product.id,
    badge,
    name: product.name,
    image:
      product.images && product.images.length > 0
        ? resolveImageUrl(product.images[0])
        : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    rating: '4,8',
    reviews: '86',
    price: formatPrice(lowestPrice),
    originalPrice: formatPrice(originalPriceNumber),
    tags: 'Giao nhanh · Hàng chính hãng',
  };
}

export async function fetchProducts(
  params: ProductFilterParams = {},
): Promise<PaginatedResult<Product>> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());
  if (params.search) query.set('search', params.search);
  if (params.categoryId) query.set('categoryId', params.categoryId);
  if (params.shopId) query.set('shopId', params.shopId);
  if (params.minPrice) query.set('minPrice', params.minPrice.toString());
  if (params.maxPrice) query.set('maxPrice', params.maxPrice.toString());
  if (params.sortBy) query.set('sortBy', params.sortBy);

  try {
    const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`, {
      // Dùng ISR hoặc tag revalidate tương thích Next.js 16 Cache
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.warn('Backend API connection fallback (fetchProducts):', error);
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.warn('Backend API connection fallback (fetchCategories):', error);
    return [];
  }
}
