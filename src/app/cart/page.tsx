"use client";

import React, { useEffect, useState } from "react";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";
import { fetchProduct } from "@/lib/api";
import { Product } from "@/types/product";

interface CartProduct extends Product {
  quantity: number;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartProducts = async () => {
      const products = await Promise.all(
        items.map(async (item) => {
          const product = await fetchProduct(String(item.productId));
          return { ...product, quantity: item.quantity };
        })
      );
      setCartProducts(products);
      setLoading(false);
    };

    loadCartProducts();
  }, [items]);

  const total = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Carregando carrinho...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Seu Carrinho</h1>

      {cartProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Seu carrinho está vazio</p>
          <a href="/" className="text-primary hover:underline">
            Voltar às compras
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartProducts.map((product) => (
              <div key={product.id} className="flex items-center border-b py-6">
                <div className="w-24 h-24 bg-gray-100 rounded mr-6 relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold text-lg mb-2 dark:text-white">
                    {product.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center mr-6">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity - 1)
                      }
                      disabled={product.quantity <= 1}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <FiMinus />
                    </button>
                    <span className="mx-2 w-8 text-center">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <p className="font-semibold w-20 text-right dark:text-white">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="ml-6 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="dark:text-gray-300">Subtotal</span>
                <span className="dark:text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-gray-300">Frete</span>
                <span className="dark:text-white">Grátis</span>
              </div>
              <div className="flex justify-between border-t pt-4 font-bold text-lg">
                <span className="dark:text-white">Total</span>
                <span className="dark:text-white">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-emerald-600 text-white py-3 rounded-lg">
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
