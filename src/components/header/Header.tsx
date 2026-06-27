"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";

/**
 * Header — Top navigation with:
 *  - Logo (brand)
 *  - Category nav (desktop)
 *  - Mobile hamburger
 *  - Search, Wishlist, Cart icons
 *
 * Features:
 *  - Sticky with backdrop blur
 *  - Animated cart badge (bounce on change)
 *  - Mobile slide-in menu
 */
export default function Header() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemCount = useCartStore((state) => state.itemCount());
  const wishlistCount = useWishlistStore((state) => state.count());

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          {/* Left: Mobile menu toggle + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-ink-50 rounded-full transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/"
              className="font-display text-2xl uppercase tracking-tight text-ink"
            >
              Sneak<span className="text-primary">ers</span>
              <span className="text-volt">.</span>
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/product?category=${cat.id}`}
                className="text-sm font-bold uppercase tracking-wider text-ink-600 hover:text-primary transition-colors relative group"
              >
                {cat.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/product"
              className="text-sm font-bold uppercase tracking-wider text-white bg-ink px-4 py-1.5 rounded-full hover:bg-primary transition-colors"
            >
              Todos
            </Link>
          </nav>

          {/* Right: Search + Wishlist + Cart */}
          <div className="flex items-center gap-1">
            <Link
              href="/product"
              className="p-2.5 hover:bg-ink-50 rounded-full transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5 text-ink" />
            </Link>

            <Link
              href="/wishlist"
              className="relative p-2.5 hover:bg-ink-50 rounded-full transition-colors"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5 text-ink" />
              {wishlistCount > 0 && (
                <motion.span
                  key={wishlistCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -top-0.5 -right-0.5 bg-ink text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2.5 hover:bg-ink-50 rounded-full transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5 text-ink" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 p-6 lg:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-display text-xl uppercase text-ink">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-ink-50 rounded-full"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider text-ink hover:bg-ink-50 transition-colors"
                >
                  Home
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/product?category=${cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider text-ink-600 hover:bg-ink-50 hover:text-primary transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
                <Link
                  href="/product"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
                >
                  Ver todos
                </Link>
              </nav>

              <div className="mt-8 pt-8 border-t border-ink-100 space-y-1">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider text-ink-600 hover:bg-ink-50 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Favoritos
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-ink text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>

              <div className="mt-8 p-4 bg-ink text-white rounded-2xl">
                <p className="text-xs uppercase tracking-wider text-ink-300 mb-1">
                  Atendimento
                </p>
                <p className="font-display text-xl">0800 123 4567</p>
                <p className="text-xs text-ink-300 mt-1">Seg a Sex · 9h às 18h</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
