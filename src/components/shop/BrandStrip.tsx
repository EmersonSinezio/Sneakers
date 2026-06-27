"use client";

import { motion } from "framer-motion";

/**
 * BrandStrip — Infinite marquee with brand logos.
 *
 * Uses inline SVG/text representations (since external SVG files are optional assets).
 * The marquee duplicates the list to create a seamless infinite scroll effect.
 *
 * Spec reference: Section 5 (Componentes Chave) — marquee animation 30s linear.
 */

const BRANDS = [
  {
    id: "nike",
    name: "NIKE",
    svg: (
      <svg viewBox="0 0 100 35" className="h-6 w-auto" fill="currentColor">
        <path d="M21.2 35L96.8 4.6c.9-.4 1.6-1 2-1.8.4-.8.3-1.6-.3-2.2-.6-.6-1.6-.7-2.8-.4L5 24.8c-1 .4-1.7 1-2 1.8-.3.8-.1 1.5.6 2.1.7.6 1.7.7 2.8.4L21.2 35z" />
      </svg>
    ),
  },
  {
    id: "jordan",
    name: "JORDAN",
    text: true,
  },
  {
    id: "adidas",
    name: "adidas",
    svg: (
      <svg viewBox="0 0 100 60" className="h-8 w-auto" fill="currentColor">
        <path d="M0 60l20-34h15L15 60zM20 60l20-34h15L35 60zM40 60l20-34h15L55 60z" />
        <text x="0" y="58" fontSize="14" fontWeight="900" fontFamily="Arial" letterSpacing="-0.5">
          adidas
        </text>
      </svg>
    ),
  },
  {
    id: "puma",
    name: "PUMA",
    text: true,
  },
  {
    id: "nb",
    name: "NEW BALANCE",
    text: true,
  },
  {
    id: "asics",
    name: "ASICS",
    text: true,
  },
];

export default function BrandStrip() {
  // Duplicate the list to create seamless loop
  const items = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="relative py-10 bg-white border-y border-ink-100 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {items.map((brand, i) => (
          <motion.div
            key={`${brand.id}-${i}`}
            className="flex items-center gap-3 text-ink-300 hover:text-ink transition-colors flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            {brand.svg ? (
              <div className="h-8">{brand.svg}</div>
            ) : (
              <span className="font-display text-2xl lg:text-3xl uppercase tracking-tight">
                {brand.name}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
