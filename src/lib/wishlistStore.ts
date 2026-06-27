import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistItem } from "./types";

interface WishlistState {
  items: WishlistItem[];
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  count: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (productId) =>
        set((state) => {
          const exists = state.items.some((i) => i.productId === productId);
          if (exists) {
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          }
          return {
            items: [
              ...state.items,
              { productId, addedAt: new Date().toISOString() },
            ],
          };
        }),

      add: (productId) =>
        set((state) => {
          if (state.items.some((i) => i.productId === productId)) return state;
          return {
            items: [
              ...state.items,
              { productId, addedAt: new Date().toISOString() },
            ],
          };
        }),

      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      has: (productId) => get().items.some((i) => i.productId === productId),

      clear: () => set({ items: [] }),

      count: () => get().items.length,
    }),
    {
      name: "sneakers:wishlist",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
