import ProductGrid from '@/components/shop/ProductGrid';
import Hero from '@/components/shop/Hero';
import { Product } from '@/lib/types';

import { PRODUCTS } from '@/data/products';

async function getProducts(): Promise<Product[]> {
    // Simulating API fetch
    return PRODUCTS;
}

export default async function ShopHome() {
    const products = await getProducts();

    return (
        <div>
            <Hero />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Mais Vendidos
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Confira os modelos que estão fazendo sucesso.
                    </p>
                </div>

                <ProductGrid products={products} />
            </div>
        </div>
    );
}
