"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Category } from "@/lib/types";
import { CATEGORIES, PRICE_RANGE, SHOE_SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  selectedCategories: Category[];
  priceRange: [number, number];
  selectedSizes: number[];
  onCategoryChange: (categories: Category[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onSizeChange: (sizes: number[]) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ProductFilters — Sidebar filters for category, price range, and size.
 *
 * Desktop: always visible sidebar
 * Mobile: drawer that slides in from left
 */
export default function ProductFilters({
  selectedCategories,
  priceRange,
  selectedSizes,
  onCategoryChange,
  onPriceChange,
  onSizeChange,
  onClearAll,
  isOpen,
  onClose,
}: ProductFiltersProps) {
  const toggleCategory = (cat: Category) => {
    if (selectedCategories.includes(cat)) {
      onCategoryChange(selectedCategories.filter((c) => c !== cat));
    } else {
      onCategoryChange([...selectedCategories, cat]);
    }
  };

  const toggleSize = (size: number) => {
    if (selectedSizes.includes(size)) {
      onSizeChange(selectedSizes.filter((s) => s !== size));
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    priceRange[0] !== PRICE_RANGE.MIN ||
    priceRange[1] !== PRICE_RANGE.MAX;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Filters panel */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 lg:z-0",
          "w-80 lg:w-64 bg-white lg:bg-transparent p-6 lg:p-0",
          "overflow-y-auto lg:overflow-visible",
          "lg:transform-none lg:transition-none"
        )}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="font-display text-2xl uppercase text-ink">Filtros</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-ink-50 rounded-full"
            aria-label="Fechar filtros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear all */}
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="mb-6 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-dark transition-colors"
          >
            Limpar todos os filtros
          </button>
        )}

        {/* Categories */}
        <div className="mb-8">
          <h3 className="font-display text-sm uppercase tracking-wider text-ink mb-4">
            Categorias
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 rounded-full text-sm font-medium transition-all",
                    isSelected
                      ? "bg-primary text-white shadow-md"
                      : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price range */}
        <div className="mb-8">
          <h3 className="font-display text-sm uppercase tracking-wider text-ink mb-4">
            Faixa de preço
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm font-mono text-ink-600">
              <span>R$ {priceRange[0]}</span>
              <span className="text-ink-300">—</span>
              <span>R$ {priceRange[1]}</span>
            </div>
            <div className="space-y-2">
              <label className="block text-xs text-ink-400">Mínimo</label>
              <input
                type="range"
                min={PRICE_RANGE.MIN}
                max={PRICE_RANGE.MAX}
                step={50}
                value={priceRange[0]}
                onChange={(e) =>
                  onPriceChange([
                    Math.min(Number(e.target.value), priceRange[1] - 50),
                    priceRange[1],
                  ])
                }
                className="w-full accent-primary"
              />
              <label className="block text-xs text-ink-400">Máximo</label>
              <input
                type="range"
                min={PRICE_RANGE.MIN}
                max={PRICE_RANGE.MAX}
                step={50}
                value={priceRange[1]}
                onChange={(e) =>
                  onPriceChange([
                    priceRange[0],
                    Math.max(Number(e.target.value), priceRange[0] + 50),
                  ])
                }
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-display text-sm uppercase tracking-wider text-ink mb-4">
            Tamanhos
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {SHOE_SIZES.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={cn(
                    "py-2 rounded-lg text-sm font-bold transition-all",
                    isSelected
                      ? "bg-ink text-white shadow-md"
                      : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
