"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { BUSINESS_RULES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";

interface ProductCardEnhancedProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  index?: number;
}

/**
 * ProductCardEnhanced — Premium product card with:
 *  - Category badge + New/Low-stock badges
 *  - Star rating
 *  - Hover: image zoom + swap to 2nd image
 *  - Wishlist toggle
 *  - Quick view trigger
 *  - Add to cart on hover
 *  - Staggered animation via index
 */
export default function ProductCardEnhanced({
  product,
  onQuickView,
  index = 0,
}: ProductCardEnhancedProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const wishlistHas = useWishlistStore((state) => state.has);

  const isWished = wishlistHas(product.id);
  const isLowStock =
    product.stock > 0 && product.stock <= BUSINESS_RULES.LOW_STOCK_THRESHOLD;
  const isOutOfStock = product.stock === 0;
  const hasSecondImage = product.images.length > 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const size = product.sizes[0] ?? 40;
    addItem(product, size);
    openCart();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-ink-100",
        isOutOfStock && "opacity-70"
      )}
    >
      {/* Top section: Image + badges + actions */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-72 bg-gradient-to-br from-ink-50 via-white to-ink-50 p-6 overflow-hidden">
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
            <Badge variant="category" value={product.category} />
            {product.isNew && <Badge variant="new" value="Novo" />}
            {product.discount && (
              <Badge variant="discount" value={`-${product.discount}%`} />
            )}
            {isLowStock && (
              <Badge variant="low-stock" value={`Últimas ${product.stock}`} />
            )}
            {isOutOfStock && <Badge variant="soldout" value="Esgotado" />}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            aria-label={
              isWished ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isWished ? "fill-primary text-primary" : "text-ink-400"
              )}
            />
          </button>

          {/* Product image with hover swap */}
          <div className="relative w-full h-full">
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
              />
            </motion.div>

            {/* Second image on hover */}
            {hasSecondImage && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[1]}
                  alt={`${product.name} - vista 2`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain drop-shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500"
                />
              </motion.div>
            )}
          </div>

          {/* Quick view overlay (appears on hover) */}
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleQuickView}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-wider text-ink shadow-lg hover:bg-ink hover:text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          </div>
        </div>
      </Link>

      {/* Bottom section: Info */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-volt">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className="w-3 h-3"
                fill={idx < Math.floor(product.rating) ? "currentColor" : "none"}
                strokeWidth={0}
              />
            ))}
          </div>
          <span className="text-xs text-ink-400 ml-1 font-mono">
            {product.rating.toFixed(1)} ({product.reviewsCount})
          </span>
        </div>

        {/* Name + category */}
        <Link href={`/product/${product.id}`}>
          <p className="text-xs uppercase tracking-wider text-ink-400 mb-1">
            {product.brand} · {product.category}
          </p>
          <h3 className="font-bold text-base text-ink truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price + Add to cart */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <p className="text-xs text-ink-300 line-through font-mono">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="font-bold text-lg text-primary font-mono">
              {formatPrice(product.price)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg",
              isOutOfStock
                ? "bg-ink-200 text-ink-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-dark hover:scale-110"
            )}
            aria-label={
              isOutOfStock
                ? "Produto esgotado"
                : `Adicionar ${product.name} ao carrinho`
            }
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
