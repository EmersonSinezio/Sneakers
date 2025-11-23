import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/shop/AddToCartButton';
import { PRODUCTS } from '@/data/products';

// Gera os parâmetros estáticos para todas as páginas de produtos
export async function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

// SEO Dinâmico
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        return {
            title: 'Produto não encontrado',
        };
    }

    return {
        title: `${product.name} | Sneakers`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-12 min-h-screen flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 relative w-full h-[400px] md:h-[600px] bg-gray-100 rounded-3xl overflow-hidden">
                {/* Next/Image Otimizado */}
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-8 hover:scale-105 transition-transform duration-500"
                    priority
                />
            </div>

            <div className="flex-1 space-y-6">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                    {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    {product.description}
                </p>
                <div className="text-3xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                </div>

                <div className="flex gap-4 pt-4">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </main>
    );
}
