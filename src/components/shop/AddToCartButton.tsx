"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/types";
import { ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: number;
}

/**
 * AddToCartButton for PDP - uses the primary angled variant
 * and shows a brief "Added" feedback state.
 */
export default function AddToCartButton({
  product,
  selectedSize,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [justAdded, setJustAdded] = useState(false);

  const outOfStock = product.stock === 0;
  const size = selectedSize ?? product.sizes[0] ?? 40;

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(product, size);
    openCart();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.button
      whileTap={{ scale: outOfStock ? 1 : 0.97 }}
      whileHover={{ scale: outOfStock ? 1 : 1.02 }}
      onClick={handleAddToCart}
      disabled={outOfStock}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base uppercase tracking-wide shadow-lg transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        outOfStock
          ? "bg-ink-200 text-ink-400 cursor-not-allowed"
          : justAdded
          ? "bg-green-600 text-white"
          : "bg-primary text-white hover:bg-primary-dark"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {outOfStock ? (
          <motion.span
            key="out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Avise-me quando chegar
          </motion.span>
        ) : justAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Adicionado
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Adicionar ao Carrinho
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
