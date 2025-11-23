import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgnike-a.akamaihd.net',
      },
      {
        protocol: 'https',
        hostname: 'maze.jetassets.com.br',
      },
      {
        protocol: 'https',
        hostname: 'cdnv2.moovin.com.br',
      },
      {
        protocol: 'https',
        hostname: 'lksneakers.com.br',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lojasradan.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'artwalk.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'imgcentauro-a.akamaihd.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vnda.com.br',
      },
    ],
  },
};

export default nextConfig;
