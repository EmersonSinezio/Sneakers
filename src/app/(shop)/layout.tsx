import React from "react";
import Header from "@/components/header/Header";
import CartDrawer from "@/components/layout/CartDrawer";
import Footer from "@/components/layout/Footer";

/**
 * Shop layout — wraps every /, /product, /wishlist, /checkout route
 * with the shared Header, CartDrawer and Footer.
 */
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-body bg-white text-ink">
      <Header />
      <CartDrawer />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
