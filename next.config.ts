import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the "workspace root" warning in monorepo/dev setups
  turbopack: {
    root: process.cwd(),
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgnike-a.akamaihd.net",
      },
      {
        protocol: "https",
        hostname: "maze.jetassets.com.br",
      },
      {
        protocol: "https",
        hostname: "cdnv2.moovin.com.br",
      },
      {
        protocol: "https",
        hostname: "lksneakers.com.br",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lojasradan.vtexassets.com",
      },
      {
        protocol: "https",
        hostname: "artwalk.vtexassets.com",
      },
      {
        protocol: "https",
        hostname: "imgcentauro-a.akamaihd.net",
      },
      {
        protocol: "https",
        hostname: "cdn.vnda.com.br",
      },
    ],
  },
};

export default nextConfig;
