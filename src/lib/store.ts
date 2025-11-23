import { create } from 'zustand';
import { CartItem, Product } from './types';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    toggleCart: () => void;
    total: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isOpen: false,
    toggleCart: () => set({ isOpen: !get().isOpen }),
    addItem: (product) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === product.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),
    total: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    clearCart: () => set({ items: [] }),
}));