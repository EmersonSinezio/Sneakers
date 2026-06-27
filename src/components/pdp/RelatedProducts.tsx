"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

/**
 * RelatedProducts — "You might also like" horizontal carousel.
 *
 * Shows products from the same category, excluding the current one.
 * Falls back to other categories if not enough products in same category.
 */
export default function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Get related products: same category first, then fill with others
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === category && p.id !== currentProductId
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== category && p.id !== currentProductId
  );
  const related = [...sameCategory, ...others].slice(0, 8);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  if (related.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-ink-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold skew-italic mb-2">
              <span className="skew-italic-content inline-block">
                Combina com
              </span>
            </p>
            <h2 className="font-display text-3xl lg:text-4xl uppercase text-ink">
              Você também vai curtir
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full bg-ink-50 hover:bg-ink hover:text-white transition-colors flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full bg-ink-50 hover:bg-ink hover:text-white transition-colors flex items-center justify-center"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4 -mx-6 px-6"
        >
          {related.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-white border border-ink-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all snap-start flex-shrink-0 w-[260px]"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative h-52 bg-gradient-to-br from-ink-50 to-white p-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="260px"
                    className="object-contain p-4 drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                  />
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-primary text-white px-2 py-1 text-[10px] font-bold uppercase rounded skew-italic">
                      <span className="skew-italic-content inline-block">
                        -{product.discount}%
                      </span>
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex text-volt">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-2.5 h-2.5"
                        fill={
                          idx < Math.floor(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-ink-400 font-mono">
                    ({product.reviewsCount})
                  </span>
                </div>

                <Link href={`/product/${product.id}`}>
                  <h3 className="font-bold text-sm text-ink truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <p className="text-[10px] text-ink-300 line-through font-mono">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                    <p className="font-bold text-base text-primary font-mono">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const size = product.sizes[0] ?? 40;
                      addItem(product, size);
                      openCart();
                    }}
                    className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
                    aria-label={`Adicionar ${product.name}`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
