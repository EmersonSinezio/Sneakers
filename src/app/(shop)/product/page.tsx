"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Category, Product } from "@/lib/types";
import { PRICE_RANGE, SortOption } from "@/lib/constants";
import ProductCardEnhanced from "@/components/shop/ProductCardEnhanced";
import ProductFilters from "@/components/shop/ProductFilters";
import SortDropdown from "@/components/shop/SortDropdown";
import ActiveFilters from "@/components/shop/ActiveFilters";
import QuickViewModal from "@/components/shop/QuickViewModal";

/**
 * Product Listing Page — Professional filtering and sorting.
 *
 * Features:
 *  - Sidebar filters (category, price, size)
 *  - Sort dropdown
 *  - Active filter chips
 *  - Quick view modal
 *  - Responsive (mobile drawer + desktop sidebar)
 */
export default function ProductListingPage() {
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_RANGE.MIN,
    PRICE_RANGE.MAX,
  ]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // UI state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter + sort logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      // Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (
          !product.name.toLowerCase().includes(term) &&
          !product.category.toLowerCase().includes(term) &&
          !(product.brand ?? "").toLowerCase().includes(term)
        ) {
          return false;
        }
      }

      // Category
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // Price
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Size
      if (
        selectedSizes.length > 0 &&
        !product.sizes.some((s) => selectedSizes.includes(s))
      ) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "best-sellers":
        result = [...result].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case "newest":
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // relevance — keep original order
        break;
    }

    return result;
  }, [searchTerm, selectedCategories, priceRange, selectedSizes, sortBy]);

  // Handlers
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange([PRICE_RANGE.MIN, PRICE_RANGE.MAX]);
    setSelectedSizes([]);
    setSortBy("relevance");
  };

  const removeCategory = (cat: Category) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== cat));
  };

  const removeSize = (size: number) => {
    setSelectedSizes((prev) => prev.filter((s) => s !== size));
  };

  const resetPrice = () => {
    setPriceRange([PRICE_RANGE.MIN, PRICE_RANGE.MAX]);
  };

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Top bar: search + sort */}
      <div className="bg-white border-b border-ink-100 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Title + count */}
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-3xl lg:text-4xl uppercase text-ink"
              >
                Coleção <span className="text-primary">Completa</span>
              </motion.h1>
              <p className="text-sm text-ink-400 mt-1">
                {filteredProducts.length} produto
                {filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search + filters toggle + sort */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-ink-50 border border-ink-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
              </div>

              {/* Filters toggle (mobile) */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-white rounded-full text-sm font-bold uppercase tracking-wide"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </button>

              {/* Sort */}
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </div>

      {/* Main content: filters sidebar + grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters sidebar */}
          <ProductFilters
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            selectedSizes={selectedSizes}
            onCategoryChange={setSelectedCategories}
            onPriceChange={setPriceRange}
            onSizeChange={setSelectedSizes}
            onClearAll={clearAllFilters}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />

          {/* Product grid */}
          <div className="flex-1">
            {/* Active filters */}
            <ActiveFilters
              categories={selectedCategories}
              priceRange={priceRange}
              sizes={selectedSizes}
              onRemoveCategory={removeCategory}
              onRemoveSize={removeSize}
              onResetPrice={resetPrice}
              onClearAll={clearAllFilters}
            />

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-xl text-ink-400">
                  Nenhum produto encontrado com esses filtros.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2.5 bg-primary text-white rounded-full font-bold uppercase text-sm hover:bg-primary-dark transition-colors"
                >
                  Limpar filtros
                </button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <ProductCardEnhanced
                      key={product.id}
                      product={product}
                      index={index}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Quick view modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
