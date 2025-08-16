import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShoeStore - E-commerce de Calçados",
  description: "Compre os melhores calçados online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <Header />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <footer className="bg-white dark:bg-gray-800 py-6 border-t">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} ShoeStore. Todos os direitos
              reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
