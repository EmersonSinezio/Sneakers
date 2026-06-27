import type { MetadataRoute } from "next";

/**
 * robots.txt generation.
 *
 * Allows all crawlers on public pages.
 * Disallows checkout, admin, and API routes.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/product", "/product/*", "/wishlist"],
        disallow: ["/checkout", "/checkout/*", "/api/*", "/admin", "/admin/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
