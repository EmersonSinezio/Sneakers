"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
        toggleCart();
    };

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <Link href={`/product/${product.id}`}>
                <div className="relative h-64 w-full bg-gray-100 p-4 flex items-center justify-center">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-contain drop-shadow-lg"
                        />
                    </motion.div>
                </div>
            </Link>

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                    </span>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddToCart}
                        className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
                    >
                        <ShoppingBag size={20} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
