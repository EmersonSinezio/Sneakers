import { NextResponse } from 'next/server';
import { Product } from '@/lib/types';

const products: Product[] = [
    {
        id: '1',
        name: 'Nike Air Zoom Pegasus',
        slug: 'nike-air-zoom-pegasus',
        price: 129.99,
        description: 'Amortecimento responsivo para sua corrida diária.',
        category: 'Running',
        images: ['/shoe-red.png', '/shoe-side.png'], // Coloque imagens na pasta public
        stock: 10,
    },
    // Adicione mais produtos aqui
];

export async function GET() {
    return NextResponse.json(products);
}