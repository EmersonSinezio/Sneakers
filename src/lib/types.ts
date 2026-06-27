export type Category =
  | "running"
  | "lifestyle"
  | "basketball"
  | "skate"
  | "training";

export type Technology = "air" | "zoom" | "react" | "flyknit" | "max";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  category: Category;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  sizes: number[];
  isNew?: boolean;
  isBestSeller?: boolean;
  colors?: string[];
  specs: Record<string, string>;
  technology?: Technology[];
  brand?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export type PaymentMethod = "credit" | "pix";

export interface Order {
  id: string;
  items: CartItem[];
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  createdAt: string;
}

export interface FilterState {
  categories: Category[];
  priceRange: [number, number];
  sizes: number[];
  sortBy: "relevance" | "price-asc" | "price-desc" | "best-sellers" | "newest";
  search: string;
}
