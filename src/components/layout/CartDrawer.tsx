"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  ArrowRight,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { BUSINESS_RULES } from "@/lib/constants";
import { toast } from "sonner";

/**
 * CartDrawer — Full-featured cart sidebar with:
 *  - Quantity controls (+/-)
 *  - Coupon code input (BEMVINDO10)
 *  - Free shipping progress bar
 *  - Subtotal, shipping, discount, total
 *  - Checkout link
 *  - Empty state
 */
export default function CartDrawer() {
  const router = useRouter();
  const {
    isOpen,
    toggleCart,
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    discountAmount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      toast.success(`Cupom ${couponInput.toUpperCase()} aplicado! 10% OFF`);
      setCouponInput("");
    } else {
      toast.error("Cupom inválido");
    }
  };

  const handleCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  const subtotalValue = subtotal();
  const shippingValue = shipping();
  const discountValue = discountAmount();
  const totalValue = total();
  const remainingForFreeShipping =
    BUSINESS_RULES.FREE_SHIPPING_THRESHOLD - subtotalValue;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black z-40"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed right-0 top-0 h-full w-full md:w-[440px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 flex justify-between items-center border-b border-ink-100">
              <h2
                id="cart-title"
                className="font-display text-2xl uppercase text-ink"
              >
                Carrinho
                {items.length > 0 && (
                  <span className="text-ink-400 text-base font-body ml-2">
                    ({items.length})
                  </span>
                )}
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-ink-50 rounded-full transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress bar */}
            {items.length > 0 && remainingForFreeShipping > 0 && (
              <div className="px-5 py-3 bg-ink-50 text-xs text-ink-600">
                <p className="mb-1.5">
                  Faltam{" "}
                  <span className="font-bold text-primary">
                    {formatPrice(remainingForFreeShipping)}
                  </span>{" "}
                  para frete grátis!
                </p>
                <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        (subtotalValue / BUSINESS_RULES.FREE_SHIPPING_THRESHOLD) *
                          100,
                        100
                      )}%`,
                    }}
                    transition={{ duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-primary to-volt"
                  />
                </div>
              </div>
            )}

            {items.length > 0 && remainingForFreeShipping <= 0 && (
              <div className="px-5 py-3 bg-volt/20 text-xs text-ink font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Você ganhou FRETE GRÁTIS!
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-ink-50 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-ink-300" />
                  </div>
                  <div>
                    <p className="font-display text-xl uppercase text-ink">
                      Carrinho vazio
                    </p>
                    <p className="text-sm text-ink-400 mt-2 max-w-xs">
                      Explore nossa coleção e encontre seu próximo tênis.
                    </p>
                  </div>
                  <button
                    onClick={toggleCart}
                    className="mt-4 px-6 py-2.5 bg-primary text-white rounded-full font-bold uppercase text-sm hover:bg-primary-dark transition-colors"
                  >
                    Explorar produtos
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-3 items-center bg-ink-50 p-3 rounded-2xl"
                    >
                      <div className="relative w-20 h-20 bg-white rounded-xl flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-contain p-1.5"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-ink truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-ink-400 mt-0.5">
                          Tam: {item.selectedSize} · {item.brand ?? "Nike"}
                        </p>
                        <p className="text-primary font-bold text-sm mt-1 font-mono">
                          {formatPrice(item.price * item.quantity)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-ink-200 rounded-full bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 hover:bg-ink-50 rounded-l-full transition-colors"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm font-bold min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.selectedSize,
                                  item.quantity + 1
                                )
                              }
                              disabled={
                                item.quantity >=
                                BUSINESS_RULES.MAX_QUANTITY_PER_ITEM
                              }
                              className="p-1.5 hover:bg-ink-50 rounded-r-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.selectedSize)}
                        className="text-ink-300 hover:text-primary hover:bg-white p-2 rounded-lg transition-colors"
                        aria-label={`Remover ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-ink-100 bg-white space-y-4">
                {/* Coupon */}
                <div>
                  {!couponCode ? (
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-ink-50 border border-ink-200 rounded-full">
                        <Tag className="w-4 h-4 text-ink-400" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Cupom de desconto"
                          className="flex-1 bg-transparent text-sm focus:outline-none"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                        />
                      </div>
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-ink text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-ink-800 transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-3 py-2 bg-volt/20 border border-volt/40 rounded-full">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-bold font-mono">
                          {couponCode}
                        </span>
                        <span className="text-xs text-green-600">
                          -{formatPrice(discountValue)}
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-ink-400 hover:text-primary font-bold"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                  <p className="text-[10px] text-ink-400 mt-1.5">
                    Dica: experimente{" "}
                    <span className="font-mono font-bold">BEMVINDO10</span>
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-ink-500">
                    <span>Subtotal</span>
                    <span className="font-mono">
                      {formatPrice(subtotalValue)}
                    </span>
                  </div>
                  <div className="flex justify-between text-ink-500">
                    <span>Frete</span>
                    <span className="font-mono">
                      {shippingValue === 0 ? (
                        <span className="text-green-600 font-bold">GRÁTIS</span>
                      ) : (
                        formatPrice(shippingValue)
                      )}
                    </span>
                  </div>
                  {couponCode && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto</span>
                      <span className="font-mono font-bold">
                        -{formatPrice(discountValue)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-ink-100">
                    <span>Total</span>
                    <span className="text-primary font-mono">
                      {formatPrice(totalValue)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-full font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg"
                >
                  <Lock className="w-4 h-4" />
                  Finalizar compra
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[10px] text-ink-400 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Compra 100% segura · SSL
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
