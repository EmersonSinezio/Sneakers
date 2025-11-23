"use client";

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/types';

export default function ProductGrid({ products }: { products: Product[] }) {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    const handleShowLess = () => {
        setVisibleCount(4);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length > 4 && (
                <div className="mt-12 text-center">
                    {visibleCount < products.length ? (
                        <button
                            onClick={handleShowMore}
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Ver mais
                        </button>
                    ) : (
                        <button
                            onClick={handleShowLess}
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Ver menos
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
