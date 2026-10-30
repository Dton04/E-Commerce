export interface StorefrontProductItem {
  id: string;
  badge?: string;
  name: string;
  image: string;
  rating: string;
  reviews: string;
  price: string;
  originalPrice: string;
  tags: string;
}

export const POPULAR_PRODUCTS: StorefrontProductItem[] = [
  {
    id: 'p1',
    name: 'Tai nghe không dây AirBeat Pro',
    image: '/figma/airbeat-pro.png',
    rating: '4,8',
    reviews: '128',
    price: '1.290.000 ₫',
    originalPrice: '1.590.000 ₫',
    tags: 'Giao nhanh · Hàng chính hãng',
  },
  {
    id: 'p2',
    name: 'Bình giữ nhiệt Daily 600 ml',
    image: '/figma/daily-bottle.png',
    rating: '4,8',
    reviews: '86',
    price: '390.000 ₫',
    originalPrice: '450.000 ₫',
    tags: 'Giao nhanh · Hàng chính hãng',
  },
  {
    id: 'p3',
    name: 'Balo đô thị Urban 15 inch',
    image: '/figma/urban-backpack.png',
    rating: '4,8',
    reviews: '86',
    price: '690.000 ₫',
    originalPrice: '890.000 ₫',
    tags: 'Giao nhanh · Hàng chính hãng',
  },
  {
    id: 'p4',
    name: 'Đèn bàn thông minh Lumi',
    image: '/figma/lumi-lamp.png',
    rating: '4,8',
    reviews: '86',
    price: '590.000 ₫',
    originalPrice: '790.000 ₫',
    tags: 'Giao nhanh · Hàng chính hãng',
  },
];

export const RECOMMENDATION_PRODUCTS: StorefrontProductItem[] = [
  {
    id: 'rec1',
    badge: 'Vì bạn quan tâm âm thanh',
    name: 'Tai nghe không dây AirBeat Pro',
    image: '/figma/airbeat-pro.png',
    rating: '4,8',
    reviews: '128',
    price: '1.290.000 ₫',
    originalPrice: '1.590.000 ₫',
    tags: 'Giao nhanh · Hàng chính hãng',
  },
  {
    id: 'rec2',
    badge: 'Phù hợp nhịp sống hằng ngày',
    name: 'Bình giữ nhiệt Daily 600 ml',
    image: '/figma/daily-bottle.png',
    rating: '4,8',
    reviews: '86',
    price: '390.000 ₫',
    originalPrice: '450.000 ₫',
    tags: 'Giao nhanh · Hàng chính hãng',
  },
  {
    id: 'rec3',
    badge: 'Cùng phong cách tối giản',
    name: 'Balo đô thị Urban 15 inch',
    image: '/figma/urban-backpack.png',
    rating: '4,8',
    reviews: '86',
    price: '690.000 ₫',
    originalPrice: '890.000 ₫',
    tags: 'Giao nhanh · Hàng chính hãng',
  },
  {
    id: 'rec4',
    badge: 'Cho góc làm việc của bạn',
    name: 'Bàn phím cơ Mono K68',
    image: '/figma/mono-k68.png',
    rating: '4,8',
    reviews: '86',
    price: '890.000 ₫',
    originalPrice: '1.090.000 ₫',
    tags: 'Giao nhanh · Hàng chính hãng',
  },
];

