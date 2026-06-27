"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { SectionHeading } from "@/components/ui";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";

/**
 * BestSellers — Horizontal scroll-snap showcase of top-rated products.
 *
 * Spec reference: Section 3 (Home Page) — scroll-snap dos mais vendidos.
 */
export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const wishlistHas = useWishlistStore((state) => state.has);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 lg:py-28 bg-ink-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with nav arrows */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Top Vendas"
            title="Os favoritos"
            subtitle="Os modelos que conquistaram mais de 1.000 atletas este ano."
            className="mb-0"
          />

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink hover:text-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink hover:text-white transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4 -mx-6 px-6"
        >
          {bestSellers.map((product, i) => {
            const isWished = wishlistHas(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 snap-start flex-shrink-0 w-[280px] sm:w-[320px]"
              >
                {/* Top: Image + badges + actions */}
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative h-64 bg-gradient-to-br from-ink-50 to-white p-6">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                      {product.isBestSeller && (
                        <span className="inline-flex items-center gap-1 bg-ink text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded skew-italic">
                          <span className="skew-italic-content inline-block">
                            ★ Top
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

                    {/* Wishlist button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label={isWished ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isWished
                            ? "fill-primary text-primary"
                            : "text-ink-400"
                        }`}
                      />
                    </button>

                    {/* Product image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                      />
                    </div>
                  </div>
                </Link>

                {/* Bottom: Info */}
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-volt">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3 h-3"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-ink-400 ml-1">
                      ({product.reviewsCount})
                    </span>
                  </div>

                  <Link href={`/product/${product.id}`}>
                    <p className="text-xs uppercase tracking-wider text-ink-400 mb-1">
                      {product.brand} · {product.category}
                    </p>
                    <h3 className="font-bold text-base text-ink truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-3 flex items-center justify-between">
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
                      onClick={() => {
                        const size = product.sizes[0] ?? 40;
                        addItem(product, size);
                        openCart();
                      }}
                      className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark hover:scale-110 transition-all shadow-lg"
                      aria-label={`Adicionar ${product.name} ao carrinho`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ink text-white font-bold uppercase tracking-wide hover:bg-ink-800 transition-colors shadow-md"
          >
            Ver todos os best-sellers
          </Link>
        </div>
      </div>
    </section>
  );
}
