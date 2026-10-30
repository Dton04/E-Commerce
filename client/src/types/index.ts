export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  parentId?: string | null;
  children?: Category[];
  _count?: {
    products: number;
  };
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
}

export interface ProductSku {
  id: string;
  productId: string;
  skuCode: string;
  price: string | number;
  stock: number;
  attributes: Record<string, string | number>;
  isActive: boolean;
}

export interface Product {
  id: string;
  shopId: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  images: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  commissionRate?: string | number | null;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  shop?: Shop;
  skus?: ProductSku[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ProductFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  shopId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'name_asc';
}
