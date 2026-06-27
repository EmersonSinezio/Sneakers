"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * QuickViewModal — Modal with product preview (gallery + info + add to cart).
 *
 * Allows user to view product details and add to cart without leaving the page.
 */
export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const wishlistHas = useWishlistStore((state) => state.has);

  if (!product) return null;

  const isWished = wishlistHas(product.id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock || !selectedSize) return;
    addItem(product, selectedSize);
    openCart();
    onClose();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:max-h-[85vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-ink-50 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Image gallery */}
              <div className="relative bg-gradient-to-br from-ink-50 to-white p-8 flex items-center justify-center min-h-[400px]">
                <div className="relative w-full h-full max-h-[500px]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.isNew && <Badge variant="new" value="Novo" />}
                  {product.discount && (
                    <Badge variant="discount" value={`-${product.discount}%`} />
                  )}
                </div>
              </div>

              {/* Right: Product info */}
              <div className="p-8 flex flex-col">
                {/* Category + brand */}
                <p className="text-xs uppercase tracking-wider text-ink-400 mb-2">
                  {product.brand} · {product.category}
                </p>

                {/* Name */}
                <h2 className="font-display text-3xl lg:text-4xl uppercase text-ink leading-tight mb-3">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-volt">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4"
                        fill={
                          idx < Math.floor(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-ink-400 font-mono">
                    {product.rating.toFixed(1)} ({product.reviewsCount} avaliações)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {product.originalPrice && (
                    <p className="text-sm text-ink-300 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                  <p className="text-3xl font-bold text-primary font-mono">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-ink-500 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Size selector */}
                {!isOutOfStock && (
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-ink-600 font-bold mb-3">
                      Selecione o tamanho
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "py-2.5 rounded-lg text-sm font-bold transition-all",
                            selectedSize === size
                              ? "bg-ink text-white shadow-md"
                              : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || !selectedSize}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase tracking-wide transition-colors shadow-lg",
                      isOutOfStock || !selectedSize
                        ? "bg-ink-200 text-ink-400 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                    )}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {isOutOfStock
                      ? "Esgotado"
                      : !selectedSize
                      ? "Selecione o tamanho"
                      : "Adicionar ao carrinho"}
                  </button>

                  <button
                    onClick={handleWishlistToggle}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors",
                      isWished
                        ? "bg-primary border-primary text-white"
                        : "border-ink-200 text-ink-400 hover:border-ink-400"
                    )}
                    aria-label={
                      isWished
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    <Heart
                      className={cn("w-5 h-5", isWished && "fill-current")}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
