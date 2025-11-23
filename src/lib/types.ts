export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    category: string;
    images: string[];
    stock: number;
}

export interface CartItem extends Product {
    quantity: number;
}