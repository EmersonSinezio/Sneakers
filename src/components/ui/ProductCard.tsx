"use client";

import React from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 dark:text-white">
          {product.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addItem(product.id)}
          className="mt-4 w-full bg-primary hover:bg-emerald-600 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          <FiShoppingCart /> Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
