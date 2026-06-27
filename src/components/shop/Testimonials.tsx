"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui";

/**
 * Testimonials — Auto-rotating carousel of customer reviews.
 *
 * Each testimonial has: avatar, name, rating, review text, product purchased.
 */

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rafael Mendes",
    role: "Corredor amador",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "O Pegasus 41 mudou minha rotina de treinos. Amortecimento perfeito, leve e com visual que arranca elogios. Já é meu terceiro par da marca.",
    product: "Nike Pegasus 41",
  },
  {
    id: 2,
    name: "Juliana Costa",
    role: "Personal trainer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "Atendimento impecável e entrega super rápida. O Metcon 9 é exatamente o que eu precisava para meus treinos de CrossFit.",
    product: "Nike Metcon 9",
  },
  {
    id: 3,
    name: "Lucas Pereira",
    role: "Skatista profissional",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "Dunk Low é icônico por um motivo. Construção robusta, estilo atemporal. Comprei o vermelho e não tiro do pé.",
    product: "Nike Dunk Low",
  },
  {
    id: 4,
    name: "Beatriz Almeida",
    role: "Designer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "Air Force 1 nunca decepciona. Comprei pela estética e fiquei pela qualidade. Loja de confiança, recomendo demais!",
    product: "Nike Air Force 1",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  return (
    <section className="relative py-20 lg:py-28 bg-ink text-white overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,255,0,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Depoimentos"
          title="Quem usa, recomenda"
          subtitle="Histórias reais de atletas e entusiastas que escolheram Sneakers."
          className="mb-12 lg:mb-16 text-white [&_h2]:text-white [&_p]:text-ink-300 [&_span]:text-volt"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">
          {/* Left — Big stats */}
          <div className="space-y-8">
            <div>
              <div className="font-display text-7xl lg:text-8xl text-volt leading-none">
                4.9
              </div>
              <div className="flex gap-1 mt-2 text-volt">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5" fill="currentColor" />
                ))}
              </div>
              <p className="text-ink-300 mt-3 text-sm">
                Com base em mais de <span className="text-white font-bold">3.240</span> avaliações verificadas
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="bg-ink-800 rounded-2xl p-4">
                <div className="font-display text-3xl text-white">98%</div>
                <div className="text-xs text-ink-300 uppercase tracking-wider mt-1">
                  Recompra
                </div>
              </div>
              <div className="bg-ink-800 rounded-2xl p-4">
                <div className="font-display text-3xl text-white">
                  100<span className="text-volt">%</span>
                </div>
                <div className="text-xs text-ink-300 uppercase tracking-wider mt-1">
                  Autênticos
                </div>
              </div>
            </div>
          </div>

          {/* Right — Rotating testimonial */}
          <div className="relative min-h-[360px]">
            <Quote className="absolute -top-2 -left-2 w-20 h-20 text-primary/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-ink-800 rounded-3xl p-8 lg:p-10 relative z-10"
              >
                <div className="flex gap-1 mb-5 text-volt">
                  {Array.from({
                    length: TESTIMONIALS[current].rating,
                  }).map((_, i) => (
                    <Star key={i} className="w-4 h-4" fill="currentColor" />
                  ))}
                </div>

                <p className="text-lg lg:text-xl leading-relaxed text-white/95 font-medium mb-8">
                  &ldquo;{TESTIMONIALS[current].text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-volt">
                    <Image
                      src={TESTIMONIALS[current].avatar}
                      alt={TESTIMONIALS[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {TESTIMONIALS[current].name}
                    </p>
                    <p className="text-xs text-ink-300 uppercase tracking-wider">
                      {TESTIMONIALS[current].role} ·{" "}
                      <span className="text-volt">
                        {TESTIMONIALS[current].product}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Ver depoimento ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current
                        ? "bg-volt w-8"
                        : "bg-ink-600 w-2 hover:bg-ink-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-full bg-ink-800 hover:bg-volt hover:text-ink transition-colors flex items-center justify-center"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-full bg-ink-800 hover:bg-volt hover:text-ink transition-colors flex items-center justify-center"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
