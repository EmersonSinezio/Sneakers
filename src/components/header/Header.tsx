"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { ShoppingBag } from "lucide-react";

export default function Header() {
    const toggleCart = useCartStore((state) => state.toggleCart);
    const items = useCartStore((state) => state.items);

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <Link href="/" className="font-black text-2xl tracking-tighter text-gray-900">
                    SNEAKERS<span className="text-primary">.</span>
                </Link>
                <nav className="hidden md:flex space-x-8 font-medium text-gray-600">
                    <Link href="/product" className="hover:text-primary transition-colors">Lançamentos</Link>
                    <Link href="/product" className="hover:text-primary transition-colors">Masculino</Link>
                    <Link href="/product" className="hover:text-primary transition-colors">Feminino</Link>
                    {/*<Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>*/}
                </nav>

                <button
                    onClick={toggleCart}
                    className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ShoppingBag className="w-6 h-6 text-gray-700" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {items.length}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}