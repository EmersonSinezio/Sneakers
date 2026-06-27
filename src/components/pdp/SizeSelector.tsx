"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SHOE_SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  availableSizes: number[];
  selectedSize: number | null;
  onSelect: (size: number) => void;
  stock: number;
}

/**
 * SizeSelector — Grid of size buttons with states:
 *  - Available (clickable, default style)
 *  - Selected (highlighted with checkmark)
 *  - Out of stock (disabled, strikethrough)
 *
 * Uses SHOE_SIZES from constants as the full range, then marks unavailable
 * those not in `availableSizes`.
 */
export default function SizeSelector({
  availableSizes,
  selectedSize,
  onSelect,
  stock,
}: SizeSelectorProps) {
  const isCompletelyOutOfStock = stock === 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-wider text-ink-600 font-bold">
          Selecione o tamanho
        </p>
        <button
          onClick={() => {
            // Mock — could open a modal with size chart
          }}
          className="text-xs text-primary font-bold uppercase tracking-wider hover:text-primary-dark transition-colors underline underline-offset-2"
        >
          Guia de tamanhos
        </button>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
        {SHOE_SIZES.map((size) => {
          const isAvailable =
            availableSizes.includes(size) && !isCompletelyOutOfStock;
          const isSelected = selectedSize === size;

          return (
            <motion.button
              key={size}
              whileTap={isAvailable ? { scale: 0.95 } : {}}
              whileHover={isAvailable ? { scale: 1.05 } : {}}
              onClick={() => isAvailable && onSelect(size)}
              disabled={!isAvailable}
              className={cn(
                "relative py-3 rounded-xl text-sm font-bold transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isSelected && "bg-ink text-white shadow-lg",
                !isSelected &&
                  isAvailable &&
                  "bg-ink-50 text-ink hover:bg-ink-100",
                !isAvailable &&
                  "bg-ink-50 text-ink-300 cursor-not-allowed line-through"
              )}
              aria-label={
                isAvailable
                  ? `Tamanho ${size}`
                  : `Tamanho ${size} indisponível`
              }
              aria-pressed={isSelected}
            >
              {size}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-volt text-ink flex items-center justify-center"
                >
                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {isCompletelyOutOfStock && (
        <div className="mt-4 p-3 bg-ink-50 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-sm text-ink-500">
            Produto temporariamente esgotado.{" "}
            <button className="text-primary font-bold hover:underline">
              Avise-me quando chegar
            </button>
          </p>
        </div>
      )}

      {!isCompletelyOutOfStock && stock <= 5 && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <p className="text-sm text-orange-700 font-medium">
            Últimas {stock} unidades disponíveis!
          </p>
        </div>
      )}
    </div>
  );
}
