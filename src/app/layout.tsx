import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

import CartDrawer from "@/components/layout/CartDrawer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// adicionar icone no do navegador
export const metadata: Metadata = {
  title: "Sneakers",
  description: "E-commerce de sneakers",
  icons: {
    icon: "/shoe_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <CartDrawer />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
