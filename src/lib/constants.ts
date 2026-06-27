import { Category, Technology } from "./types";

/**
 * Available shoe sizes (BR standard)
 */
export const SHOE_SIZES: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44];

/**
 * Product categories
 */
export const CATEGORIES: { id: Category; label: string; slug: string }[] = [
  { id: "running", label: "Running", slug: "running" },
  { id: "lifestyle", label: "Lifestyle", slug: "lifestyle" },
  { id: "basketball", label: "Basketball", slug: "basketball" },
  { id: "skate", label: "Skate", slug: "skate" },
  { id: "training", label: "Training", slug: "training" },
];

/**
 * Technologies available
 */
export const TECHNOLOGIES: { id: Technology; label: string }[] = [
  { id: "air", label: "Air" },
  { id: "zoom", label: "Zoom" },
  { id: "react", label: "React" },
  { id: "flyknit", label: "Flyknit" },
  { id: "max", label: "Air Max" },
];

/**
 * Brands displayed in the brand strip
 */
export const BRANDS = [
  { id: "nike", name: "Nike", logo: "/brands/nike.svg" },
  { id: "jordan", name: "Jordan", logo: "/brands/jordan.svg" },
  { id: "adidas", name: "Adidas", logo: "/brands/adidas.svg" },
  { id: "puma", name: "Puma", logo: "/brands/puma.svg" },
  { id: "nb", name: "New Balance", logo: "/brands/new-balance.svg" },
  { id: "asics", name: "Asics", logo: "/brands/asics.svg" },
];

/**
 * Business rules
 */
export const BUSINESS_RULES = {
  FREE_SHIPPING_THRESHOLD: 299,
  SHIPPING_COST: 19.9,
  MAX_QUANTITY_PER_ITEM: 5,
  LOW_STOCK_THRESHOLD: 5,
  COUPON_BEMVINDO10: {
    code: "BEMVINDO10",
    discount: 0.1, // 10%
  },
};

/**
 * Price range for filters
 */
export const PRICE_RANGE = {
  MIN: 0,
  MAX: 1000,
};

/**
 * Sort options for product listing
 */
export const SORT_OPTIONS = [
  { id: "relevance", label: "Relevância" },
  { id: "price-asc", label: "Menor preço" },
  { id: "price-desc", label: "Maior preço" },
  { id: "best-sellers", label: "Mais vendidos" },
  { id: "newest", label: "Novidades" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["id"];
