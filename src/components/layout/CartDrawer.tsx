"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { toast } from 'sonner';

export default function CartDrawer() {
    const { isOpen, toggleCart, items, removeItem, total, clearCart } = useCartStore();

    const handleCheckout = () => {
        clearCart();
        toggleCart();
        toast.success('Compra realizada com sucesso!');
    };

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
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-4 flex justify-between items-center border-b">
                            <h2 className="text-xl font-bold">Seu Carrinho</h2>
                            <button onClick={toggleCart}><X /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {items.length === 0 ? (
                                <p className="text-center text-gray-500 mt-10">Carrinho vazio.</p>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg"
                                    >
                                        <div className="relative w-16 h-16">
                                            <Image src={item.images[0]} alt={item.name} fill className="object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">{item.name}</h4>
                                            <p className="text-primary font-bold">R$ {item.price}</p>
                                            <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex justify-between mb-4 text-lg font-bold">
                                <span>Total</span>
                                <span>R$ {total().toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={items.length === 0}
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
