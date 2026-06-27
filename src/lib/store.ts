import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "./types";
import { BUSINESS_RULES } from "./constants";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode?: string;
  couponDiscount: number;

  addItem: (product: Product, selectedSize: number) => void;
  removeItem: (id: string, size: number) => void;
  updateQuantity: (id: string, size: number, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;

  subtotal: () => number;
  shipping: () => number;
  discountAmount: () => number;
  total: () => number;
  itemCount: () => number;

  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: undefined,
      couponDiscount: 0,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, selectedSize) =>
        set((state) => {
          if (product.stock === 0) return state;

          const existing = state.items.find(
            (i) => i.id === product.id && i.selectedSize === selectedSize
          );

          if (existing) {
            const newQuantity = Math.min(
              existing.quantity + 1,
              BUSINESS_RULES.MAX_QUANTITY_PER_ITEM,
              product.stock
            );
            return {
              items: state.items.map((i) =>
                i.id === product.id && i.selectedSize === selectedSize
                  ? { ...i, quantity: newQuantity }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { ...product, quantity: 1, selectedSize },
            ],
          };
        }),

      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.selectedSize === size)
          ),
        })),

      updateQuantity: (id, size, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (i) => !(i.id === id && i.selectedSize === size)
              ),
            };
          }

          const clampedQuantity = Math.min(
            quantity,
            BUSINESS_RULES.MAX_QUANTITY_PER_ITEM
          );

          return {
            items: state.items.map((i) =>
              i.id === id && i.selectedSize === size
                ? { ...i, quantity: clampedQuantity }
                : i
            ),
          };
        }),

      clearCart: () =>
        set({ items: [], couponCode: undefined, couponDiscount: 0 }),

      subtotal: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      shipping: () => {
        const subtotal = get().subtotal();
        if (subtotal === 0) return 0;
        if (subtotal >= BUSINESS_RULES.FREE_SHIPPING_THRESHOLD) return 0;
        return BUSINESS_RULES.SHIPPING_COST;
      },

      discountAmount: () => {
        const couponDiscount = get().couponDiscount;
        return get().subtotal() * couponDiscount;
      },

      total: () => {
        const subtotal = get().subtotal();
        const shipping = get().shipping();
        const discount = get().discountAmount();
        return subtotal + shipping - discount;
      },

      itemCount: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      applyCoupon: (code) => {
        const upper = code.trim().toUpperCase();
        if (upper === BUSINESS_RULES.COUPON_BEMVINDO10.code) {
          set({
            couponCode: upper,
            couponDiscount: BUSINESS_RULES.COUPON_BEMVINDO10.discount,
          });
          return true;
        }
        return false;
      },

      removeCoupon: () =>
        set({ couponCode: undefined, couponDiscount: 0 }),
    }),
    {
      name: "sneakers:cart",
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
    }
  )
);
