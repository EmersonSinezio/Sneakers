"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui";

/**
 * InstagramFeed — Grid of "looks from the community" with hover overlay.
 *
 * Uses Unsplash lifestyle sneaker images.
 * Handles: @sneakersbr (mock).
 */

const POSTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop",
    likes: 1247,
    comments: 84,
    handle: "@rafa.runs",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
    likes: 2103,
    comments: 156,
    handle: "@ju.streetwear",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop",
    likes: 892,
    comments: 43,
    handle: "@lucas.kicks",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    likes: 3540,
    comments: 234,
    handle: "@bia.style",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
    likes: 1789,
    comments: 112,
    handle: "@marcos.fit",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=600&fit=crop",
    likes: 2456,
    comments: 178,
    handle: "@carol.urbana",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop",
    likes: 1120,
    comments: 67,
    handle: "@pedro.sk8",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop",
    likes: 4201,
    comments: 289,
    handle: "@leticia.run",
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Comunidade"
            title="#sneakersbr"
            subtitle="Looks reais de quem vive o lifestyle. Marque @sneakersbr para aparecer."
            className="mb-0"
          />

          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-ink font-bold text-sm uppercase tracking-wide hover:text-primary transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Seguir no Instagram
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        {/* Grid 4x2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href="#"
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-ink-50"
              >
                <Image
                  src={post.image}
                  alt={`Post de ${post.handle}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/70 transition-all duration-300 flex items-center justify-center">
                  <div className="flex gap-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Heart className="w-5 h-5" fill="currentColor" />
                      <span className="text-sm">
                        {post.likes.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <MessageCircle className="w-5 h-5" fill="currentColor" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Handle tag */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {post.handle}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
