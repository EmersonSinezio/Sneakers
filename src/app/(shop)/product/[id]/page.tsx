import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import ProductPageClient from "./ProductPageClient";

/**
 * Generate static params for all product pages at build time.
 */
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

/**
 * Dynamic SEO metadata per product.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return { title: "Produto não encontrado" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: product.name,
    description: product.description,
    keywords: [
      product.name,
      product.category,
      product.brand ?? "sneaker",
      "tênis",
      "performance",
    ],
    openGraph: {
      title: `${product.name} — ${formatPrice(product.price)}`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
      type: "website",
      url: `${baseUrl}/product/${product.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: `${formatPrice(product.price)} — ${product.category}`,
      images: [product.images[0]],
    },
    alternates: {
      canonical: `/product/${product.id}`,
    },
  };
}

/**
 * Product Detail Page — Server Component that fetches product
 * and delegates interactive UI to a Client Component.
 *
 * Includes JSON-LD structured data for SEO.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // JSON-LD structured data for SEO
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand ?? "Nike",
    },
    offers: {
      "@type": "Offer",
      url: `/product/${product.id}`,
      priceCurrency: "BRL",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Coleção",
        item: "/product",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `/product?category=${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `/product/${product.id}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD scripts for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ProductPageClient product={product} />
    </>
  );
}
