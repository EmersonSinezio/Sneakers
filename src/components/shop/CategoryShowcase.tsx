"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui";

/**
 * CategoryShowcase — 3 large category cards with hover zoom.
 *
 * Categories: Running, Lifestyle, Basketball
 * Each card links to /product?category=<id>
 */

const CATEGORIES = [
  {
    id: "running",
    title: "Running",
    subtitle: "Corra sem limites",
    description: "Performance para longas distâncias",
    image:
      "https://imgnike-a.akamaihd.net/1300x1300/02608551A12.jpg",
    accent: "#EF233C",
    count: "24 modelos",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    subtitle: "Estilo urbano",
    description: "Do asfalto para o dia a dia",
    image:
      "https://artwalk.vtexassets.com/arquivos/ids/321958/55508-8-161-1.jpg?v=638060296027730000",
    accent: "#D4FF00",
    count: "32 modelos",
  },
  {
    id: "basketball",
    title: "Basketball",
    subtitle: "Domine a quadra",
    description: "Contenção e explosão",
    image:
      "https://imgcentauro-a.akamaihd.net/1200x1200/M1555307A10.jpg",
    accent: "#0B0B0F",
    count: "18 modelos",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categorias"
          title="Encontre seu estilo"
          subtitle="Três universos, uma única obsessão: performance com design autoral."
          className="mb-12 lg:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/product?category=${cat.id}`}
                className="group relative block overflow-hidden rounded-3xl aspect-[4/5] bg-ink-50"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90" />
                </div>

                {/* Top badge */}
                <div
                  className="absolute top-5 left-5 z-10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-ink skew-italic"
                  style={{ backgroundColor: cat.accent }}
                >
                  <span className="skew-italic-content inline-block">
                    {cat.count}
                  </span>
                </div>

                {/* Arrow */}
                <div className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-ink text-white transition-all">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                    style={{ color: cat.accent === "#0B0B0F" ? "#D4FF00" : cat.accent }}
                  >
                    {cat.subtitle}
                  </p>
                  <h3 className="font-display text-4xl lg:text-5xl uppercase leading-[0.9] mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-white/80 max-w-xs">
                    {cat.description}
                  </p>

                  {/* Underline that grows on hover */}
                  <div className="mt-4 h-0.5 bg-white/0 group-hover:bg-white transition-all duration-500 w-0 group-hover:w-full" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
