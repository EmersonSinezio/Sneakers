"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="bg-white">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" title="Logo" className="inline-flex">
              <span className="sr-only">logo</span>
              <span className="font-bold text-xl">Logo</span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden lg:flex lg:justify-start lg:ml-16 lg:space-x-8 xl:space-x-14">
            <Link href="/products">Produtos</Link>
            <Link href="/offer">Promoções</Link>
            <Link href="/contact">Contato</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center justify-end ml-auto">
            {/* Auth Links - Desktop */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <Link
                href="/register"
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none px-4 py-2 bg-[#af162a] hover:bg-[#830024] text-white"
                // style={{
                //   background: `linear-gradient(135deg, #44021e 0%, #5a0e3d 30%, #830024 70%, #af162a 100%)`,
                // }}
              >
                Criar conta
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center justify-end space-x-5">
              {/* Hamburger Menu */}
              <button
                type="button"
                className="p-2 -m-2 text-gray-900 transition-all duration-200 lg:hidden hover:text-gray-700"
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Cart Icon */}
              <button
                type="button"
                className="relative p-2 -m-2 text-gray-900 transition-all duration-200 hover:text-gray-700"
                aria-label="Cart"
                onClick={() => setShowCart(!showCart)}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showCart && (
          <>
            {/* Overlay mais claro no fundo */}
            <motion.div
              className="fixed inset-0 bg-black/20" // menos opacidade, fundo mais leve
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowCart(false)}
            />

            {/* Drawer do carrinho */}
            <motion.div
              className="fixed right-4 top-[12vh] w-screen max-w-sm rounded-lg shadow-lg border border-gray-200 px-4 py-8 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                zIndex: 100,
                backgroundColor: "rgba(175, 22, 42, 0.9)", // bg da paleta color1 com menos transparência
              }}
            >
              <button
                className="absolute end-4 top-4 text-gray-100 transition hover:scale-110"
                onClick={() => setShowCart(false)}
              >
                <span className="sr-only">Close cart</span>✕
              </button>

              {/* Conteúdo do carrinho */}
              <div className="mt-4 space-y-6 text-white">
                <ul className="space-y-4">{/* itens do carrinho */}</ul>

                <div className="space-y-4 text-center">
                  <Link
                    href="/cart"
                    className="block rounded-sm border border-gray-100 px-5 py-3 text-sm text-white transition hover:ring-1 hover:ring-gray-300"
                  >
                    View my cart (2)
                  </Link>

                  <a
                    href="#"
                    className="block rounded-sm bg-color2 px-5 py-3 text-sm text-white transition hover:bg-color3"
                  >
                    Checkout
                  </a>

                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="inline-block text-sm text-gray-200 underline underline-offset-4 transition hover:text-gray-100"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

// Reusable subcomponent for nav links
interface NavLinkProps {
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ label }) => (
  <a
    href="#"
    title={label}
    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
  >
    {label}
  </a>
);
