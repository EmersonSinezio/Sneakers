"use client";

import Hero from "@/components/shop/Hero";
import BrandStrip from "@/components/shop/BrandStrip";
import CategoryShowcase from "@/components/shop/CategoryShowcase";
import BestSellers from "@/components/shop/BestSellers";
import Testimonials from "@/components/shop/Testimonials";
import InstagramFeed from "@/components/shop/InstagramFeed";
import Newsletter from "@/components/shop/Newsletter";
import ProductGrid from "@/components/shop/ProductGrid";
import { PRODUCTS } from "@/data/products";
import { SectionHeading } from "@/components/ui";

/**
 * Shop home page — orchestrates all sections defined in the Spec.
 *
 * Order (top to bottom):
 *  1. Hero (with Feature Strip + 3D Showcase + Scroll Storytelling)
 *  2. BrandStrip
 *  3. CategoryShowcase
 *  4. BestSellers
 *  5. Featured products (grid)
 *  6. Testimonials
 *  7. InstagramFeed
 *  8. Newsletter
 */
export default function ShopHome() {
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div>
      {/* 1. Hero cinematográfico + feature strip + 3D + storytelling */}
      <Hero />

      {/* 2. Brand strip */}
      <BrandStrip />

      {/* 3. Category showcase */}
      <CategoryShowcase />

      {/* 4. Best sellers */}
      <BestSellers />

      {/* 5. Featured products grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Novidades"
            title="Drop recente"
            subtitle="As últimas adições ao nosso catálogo. Edições limitadas e colaborações exclusivas."
            align="center"
            className="mb-12"
          />
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Instagram feed */}
      <InstagramFeed />

      {/* 8. Newsletter CTA */}
      <Newsletter />
    </div>
  );
}
