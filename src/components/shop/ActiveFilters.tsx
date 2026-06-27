"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/lib/types";
import { CATEGORIES, PRICE_RANGE } from "@/lib/constants";

interface ActiveFiltersProps {
  categories: Category[];
  priceRange: [number, number];
  sizes: number[];
  onRemoveCategory: (cat: Category) => void;
  onRemoveSize: (size: number) => void;
  onResetPrice: () => void;
  onClearAll: () => void;
}

/**
 * ActiveFilters — Chips showing currently active filters with removal.
 */
export default function ActiveFilters({
  categories,
  priceRange,
  sizes,
  onRemoveCategory,
  onRemoveSize,
  onResetPrice,
  onClearAll,
}: ActiveFiltersProps) {
  const hasPriceFilter =
    priceRange[0] !== PRICE_RANGE.MIN || priceRange[1] !== PRICE_RANGE.MAX;
  const hasAnyFilter =
    categories.length > 0 || sizes.length > 0 || hasPriceFilter;

  if (!hasAnyFilter) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <AnimatePresence>
        {categories.map((cat) => {
          const label = CATEGORIES.find((c) => c.id === cat)?.label ?? cat;
          return (
            <motion.button
              key={cat}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onRemoveCategory(cat)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
            >
              {label}
              <X className="w-3 h-3" />
            </motion.button>
          );
        })}

        {sizes.map((size) => (
          <motion.button
            key={size}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onRemoveSize(size)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-ink-800 transition-colors"
          >
            Tam {size}
            <X className="w-3 h-3" />
          </motion.button>
        ))}

        {hasPriceFilter && (
          <motion.button
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onResetPrice}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-volt text-ink rounded-full text-xs font-bold uppercase tracking-wider hover:bg-volt-dark transition-colors"
          >
            R$ {priceRange[0]} - R$ {priceRange[1]}
            <X className="w-3 h-3" />
          </motion.button>
        )}
      </AnimatePresence>

      {hasAnyFilter && (
        <button
          onClick={onClearAll}
          className="text-xs font-bold uppercase tracking-wider text-ink-400 hover:text-primary transition-colors ml-2"
        >
          Limpar tudo
        </button>
      )}
    </div>
  );
}
