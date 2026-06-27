import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Sneakers — Performance Edition | Corra além do limite",
    template: "%s | Sneakers",
  },
  description:
    "E-commerce premium de sneakers. Coleção exclusiva Nike, Jordan, Adidas com tecnologia de ponta e design autoral.",
  keywords: [
    "sneakers",
    "tênis",
    "nike",
    "jordan",
    "adidas",
    "e-commerce",
    "performance",
  ],
  authors: [{ name: "Emerson" }],
  creator: "Emerson",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Sneakers",
    title: "Sneakers — Performance Edition",
    description:
      "Corra além do limite. Coleção exclusiva de sneakers com design autoral.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sneakers — Performance Edition",
    description:
      "Corra além do limite. Coleção exclusiva de sneakers com design autoral.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
    <html lang="pt-BR" className={`${anton.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-white text-ink">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0B0B0F",
              color: "#fff",
              border: "1px solid #2C2C2E",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
