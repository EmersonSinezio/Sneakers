import React from 'react';
import Link from 'next/link';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <main className="flex-grow bg-gray-50">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Sobre</h3>
                        <p className="text-sm text-gray-400">A melhor loja de sneakers vermelhos do Brasil.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Ajuda</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Entregas</a></li>
                            <li><a href="#" className="hover:text-white">Devoluções</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    &copy; 2024 Sneakers. Todos os direitos reservados.
                </div>
            </footer>
        </div >
    );
}
