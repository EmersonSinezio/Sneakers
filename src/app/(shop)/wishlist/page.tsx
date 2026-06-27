"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useWishlistStore } from "@/lib/wishlistStore";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

/**
 * Wishlist page — Shows user's favorited products with ability to
 * move to cart or remove.
 */
export default function WishlistPage() {
  const { items, remove } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const wishlistProducts = useMemo(() => {
    return items
      .map((item) => PRODUCTS.find((p) => p.id === item.productId))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);
  }, [items]);

  const handleMoveToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const size = product.sizes[0] ?? 40;
    addItem(product, size);
    remove(productId);
    openCart();
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 rounded-full bg-ink-50 flex items-center justify-center mb-6"
        >
          <Heart className="w-10 h-10 text-ink-300" />
        </motion.div>
        <h1 className="font-display text-4xl uppercase text-ink mb-3">
          Sua lista está vazia
        </h1>
        <p className="text-ink-400 max-w-md mb-8">
          Salve seus tênis favoritos para encontrá-los depois. Toque no ícone de
          coração em qualquer produto para adicioná-lo aqui.
        </p>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg"
        >
          Explorar produtos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.2em] text-primary font-bold skew-italic mb-2"
          >
            <span className="skew-italic-content inline-block">
              Meus Favoritos
            </span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl uppercase text-ink"
          >
            Sua lista de desejos
          </motion.h1>
          <p className="text-ink-400 mt-2">
            {wishlistProducts.length}{" "}
            {wishlistProducts.length === 1 ? "item salvo" : "itens salvos"}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-ink-100"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative h-56 bg-gradient-to-br from-ink-50 to-white p-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-6 drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
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

                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-ink-400 mb-1">
                    {product.brand} · {product.category}
                  </p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-base text-ink truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-3">
                    {product.originalPrice && (
                      <p className="text-xs text-ink-300 line-through font-mono">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                    <p className="font-bold text-lg text-primary font-mono">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleMoveToCart(product.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Mover ao carrinho
                    </button>
                    <button
                      onClick={() => remove(product.id)}
                      className="w-10 h-10 rounded-full border border-ink-200 text-ink-400 hover:border-primary hover:text-primary flex items-center justify-center transition-colors"
                      aria-label="Remover dos favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
