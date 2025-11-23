"use client";
import { useCartStore } from '@/lib/store';
import { Product } from '@/lib/types';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const handleAddToCart = () => {
        addItem(product);
        toggleCart();
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
        >
            <ShoppingBag className="w-6 h-6" />
            Adicionar ao Carrinho
        </motion.button>
    );
}
