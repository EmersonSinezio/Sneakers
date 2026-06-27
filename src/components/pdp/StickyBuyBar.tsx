"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

interface StickyBuyBarProps {
  product: Product;
  selectedSize: number | null;
}

/**
 * StickyBuyBar — Fixed bar on mobile that appears when user scrolls past the main CTA.
 *
 * Shows: price + Add to Cart button (or "Select size" warning).
 * Only visible on mobile (md:hidden).
 */
export default function StickyBuyBar({
  product,
  selectedSize,
}: StickyBuyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const isOutOfStock = product.stock === 0;

  useEffect(() => {
    const handleScroll = () => {
      // Show after user has scrolled 600px (past the main CTA on most screens)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (isOutOfStock || !selectedSize) return;
    addItem(product, selectedSize);
    openCart();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-ink-100 shadow-2xl"
        >
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-400 font-bold">
                {product.brand}
              </p>
              <p className="font-bold text-base text-primary font-mono">
                {formatPrice(product.price)}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || !selectedSize}
              className="flex-1 max-w-[240px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-wide text-sm shadow-lg disabled:opacity-60 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {isOutOfStock
                ? "Esgotado"
                : !selectedSize
                ? "Selecione o tamanho"
                : "Adicionar"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
