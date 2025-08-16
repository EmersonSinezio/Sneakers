export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://fakestoreapi.com/products/category/women's clothing"
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};
