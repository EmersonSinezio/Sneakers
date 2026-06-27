"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { BUSINESS_RULES } from "@/lib/constants";
import {
  ImageGallery,
  SizeSelector,
  ProductTabs,
  RelatedProducts,
  Breadcrumbs,
  StickyBuyBar,
} from "@/components/pdp";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { useWishlistStore } from "@/lib/wishlistStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductPageClientProps {
  product: Product;
}

/**
 * ProductPageClient — Client-side interactivity for the PDP.
 *
 * Layout: two columns (gallery left, info right) on desktop.
 * Single column on mobile with StickyBuyBar.
 */
export default function ProductPageClient({
  product,
}: ProductPageClientProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const wishlistHas = useWishlistStore((state) => state.has);
  const isWished = wishlistHas(product.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  const freeShippingRemaining =
    BUSINESS_RULES.FREE_SHIPPING_THRESHOLD - product.price;

  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs category={product.category} productName={product.name} />

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* LEFT: Image gallery */}
            <div>
              <ImageGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* RIGHT: Product info */}
            <div className="space-y-6">
              {/* Top: brand + category + actions */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-400 font-bold mb-2">
                    {product.brand ?? "Nike"} · {product.category}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.isNew && (
                      <span className="inline-flex items-center gap-1 bg-volt text-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded skew-italic">
                        <span className="skew-italic-content inline-block">
                          ★ Novo
                        </span>
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="inline-flex items-center gap-1 bg-ink text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded skew-italic">
                        <span className="skew-italic-content inline-block">
                          Top Vendas
                        </span>
                      </span>
                    )}
                    {product.discount && (
                      <span className="inline-flex bg-primary text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded skew-italic">
                        <span className="skew-italic-content inline-block">
                          -{product.discount}%
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all",
                      isWished
                        ? "bg-primary border-primary text-white"
                        : "border-ink-200 text-ink-400 hover:border-ink-400 hover:text-ink"
                    )}
                    aria-label={
                      isWished
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    <Heart
                      className={cn("w-4 h-4", isWished && "fill-current")}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-11 h-11 rounded-full border-2 border-ink-200 text-ink-400 hover:border-ink-400 hover:text-ink flex items-center justify-center transition-all"
                    aria-label="Compartilhar"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl lg:text-5xl xl:text-6xl uppercase text-ink leading-[0.95] tracking-tight"
              >
                {product.name}
              </motion.h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5 text-volt">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4"
                      fill={
                        idx < Math.floor(product.rating) ? "currentColor" : "none"
                      }
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-sm font-mono text-ink-500">
                  {product.rating.toFixed(1)} ({product.reviewsCount} avaliações)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-ink-100">
                {product.originalPrice && (
                  <span className="text-ink-300 line-through text-lg font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="font-display text-4xl lg:text-5xl text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-ink-400 font-mono">
                  ou 10x de {formatPrice(product.price / 10)}
                </span>
              </div>

              {/* Short description */}
              <p className="text-ink-500 leading-relaxed">
                {product.description}
              </p>

              {/* Size selector */}
              <SizeSelector
                availableSizes={product.sizes}
                selectedSize={selectedSize}
                onSelect={setSelectedSize}
                stock={product.stock}
              />

              {/* Main CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <AddToCartButton
                  product={product}
                  selectedSize={selectedSize ?? undefined}
                />
              </div>

              {/* Shipping info mini */}
              {freeShippingRemaining > 0 ? (
                <div className="bg-ink-50 rounded-xl p-4 text-sm text-ink-600 flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>
                    Faltam{" "}
                    <span className="font-bold text-primary">
                      {formatPrice(freeShippingRemaining)}
                    </span>{" "}
                    para ganhar frete grátis.
                  </p>
                </div>
              ) : (
                <div className="bg-volt/20 border border-volt/40 rounded-xl p-4 text-sm text-ink flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold">FRETE GRÁTIS</span> para este
                    produto!
                  </p>
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-ink-100">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-[10px] uppercase tracking-wider font-bold text-ink-600">
                    100% Autêntico
                  </p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-[10px] uppercase tracking-wider font-bold text-ink-600">
                    30 dias de troca
                  </p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-[10px] uppercase tracking-wider font-bold text-ink-600">
                    Entrega rápida
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="pt-6">
                <ProductTabs product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>

      {/* Mobile sticky buy bar */}
      <StickyBuyBar product={product} selectedSize={selectedSize} />
    </>
  );
}
