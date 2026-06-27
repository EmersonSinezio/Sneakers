"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

/**
 * Legacy ProductCard — kept temporarily for Phase 1 build stability.
 * Will be replaced by ProductCardEnhanced in Phase 4.
 */
export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Default to first available size
    const defaultSize = product.sizes[0] ?? 40;
    addItem(product, defaultSize);
    openCart();
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-ink-100"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 w-full bg-ink-50 p-4 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-full h-full"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>
      </Link>

      <div className="p-5">
        <h3 className="font-bold text-base text-ink truncate">{product.name}</h3>
        <p className="text-xs uppercase tracking-wide text-ink-300 mt-0.5">
          {product.category}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-primary font-mono">
            {formatPrice(product.price)}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-primary text-white p-2.5 rounded-full hover:bg-primary-dark transition-colors"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingBag size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
