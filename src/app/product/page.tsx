"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PRODUCTS } from "@/data/products";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";

export default function ProductPage() {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtra os produtos baseado no texto digitado
    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* --- Header & Search Section --- */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-bold text-gray-900"
                        >
                            Coleção <span className="text-red-600">Exclusiva</span>
                        </motion.h1>

                        {/* Barra de Pesquisa */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative w-full md:w-96"
                        >
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar tênis..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out sm:text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <SlidersHorizontal className="h-4 w-4 text-gray-400 cursor-pointer hover:text-red-600" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- Product Grid Section --- */}
            <div className="container mx-auto px-4 py-12">

                {filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500 py-20"
                    >
                        <p className="text-xl">Nenhum produto encontrado para "{searchTerm}".</p>
                    </motion.div>
                )}

                <motion.div
                    layout // Permite animação suave ao reorganizar o grid
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

// --- Componente Individual do Card ---
function ProductCard({ product, index }: { product: Product, index: number }) {
    const addItem = useCartStore((state) => state.addItem);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation();
        addItem(product);
        toggleCart();
    };

    return (
        <motion.div
            layout
            // Animação Inicial (Fade In + Slide Up)
            initial={{ opacity: 0, y: 50 }}
            // Animação ao entrar na tela (Scroll Animation)
            whileInView={{ opacity: 1, y: 0 }}
            // Configurações da Viewport
            viewport={{ once: true, margin: "-50px" }}
            // Transição com delay baseado no índice para efeito cascata
            transition={{ duration: 0.5, delay: index * 0.05 }}
            // Hover Effect
            whileHover={{ y: -10 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 relative"
        >
            <Link href={`/product/${product.id}`} className="block h-full">
                {/* Imagem */}
                <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full relative"
                    >
                        {/* Usando img normal para o exemplo funcionar sem config do next.config.js, mas prefira <Image> */}
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>

                    {/* Badge de Categoria */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-800">
                        {product.category}
                    </span>
                </div>

                {/* Detalhes */}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                        <p className="text-gray-500 text-sm">Original Nike</p>
                        <span className="text-xl font-bold text-gray-900">
                            R$ {product.price}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Botão de Adicionar Rápido (Aparece no Hover) - Fora do Link */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="absolute bottom-24 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center z-10"
            >
                <ShoppingBag size={20} />
            </motion.button>
        </motion.div>
    );
}