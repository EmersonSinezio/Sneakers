"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Shield, Truck, RotateCcw, Sparkles } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Lazy-load the heavy parallax + 3D components
const HeroParallax = dynamic(() => import("./HeroParallax"), {
  ssr: false,
  loading: () => <HeroVisualSkeleton />,
});

const Sneaker3DScene = dynamic(() => import("./Sneaker3DScene"), {
  ssr: false,
  loading: () => <ModelSkeleton />,
});

const ScrollStorytelling = dynamic(() => import("./ScrollStorytelling"), {
  ssr: false,
});

function HeroVisualSkeleton() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full shimmer-bg animate-shimmer" />
    </div>
  );
}

function ModelSkeleton() {
  return (
    <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
      <div className="relative w-56 h-56 sm:w-72 sm:h-72">
        <div className="absolute inset-0 rounded-full shimmer-bg animate-shimmer" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-ink-100 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Truck, label: "Frete Grátis", sublabel: "Acima de R$ 299" },
  { icon: Shield, label: "100% Autêntico", sublabel: "Garantia vitalícia" },
  { icon: RotateCcw, label: "30 Dias", sublabel: "Para trocar" },
  { icon: Sparkles, label: "Edição 2026", sublabel: "Limitada" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: content fades out and moves up as user scrolls
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* ===== SECTION 1: MAIN HERO ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-ink-50 via-white to-white flex items-center"
      >
        <div className="absolute inset-0 noise-bg pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none z-0">
          <HeroParallax />
        </div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:py-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* LEFT — Copy */}
            <div className="relative z-10 mt-12 lg:mt-0">
              {/* Edition badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-ink text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 skew-italic"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-volt rounded-full animate-pulse" />
                <span className="skew-italic-content inline-block">
                  Coleção Performance 2026
                </span>
              </motion.div>

              {/* H1 - CORRIGIDO PARA MOBILE (Reduzido para text-[64px]) */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-[64px] sm:text-[90px] md:text-[110px] lg:text-[130px] leading-[0.85] tracking-tight uppercase relative z-10"
              >
                <span className="text-black drop-shadow-sm block mb-1 sm:mb-2 lg:mb-4">CORRA</span>
                <span className="text-black drop-shadow-sm block">ALÉM</span>
                <span className="text-gradient block mt-1 sm:mt-2">DO LIMITE</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-ink-500 max-w-[90%] sm:max-w-md leading-relaxed"
              >
                Engenharia de ponta em cada camada. Tecnologia Zoom Air,
                cabedal Flyknit e design autoral para quem não aceita o comum.
              </motion.p>

              {/* CTAs - Empilhados no mobile, lado a lado no tablet/desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  href="/product"
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-primary text-white text-sm sm:text-base font-bold uppercase tracking-wide shadow-xl hover:bg-primary-dark transition-all hover:shadow-2xl hover:shadow-primary/30"
                >
                  Comprar agora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-ink border-2 border-ink-100 text-sm sm:text-base font-bold uppercase tracking-wide hover:border-ink-300 hover:bg-ink-50 transition-all"
                >
                  Ver Coleção
                </Link>
              </motion.div>

              {/* Stats - Ajuste do tamanho da fonte e espaçamento no mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4 max-w-md"
              >
                <div>
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink">
                    4.9<span className="text-volt">★</span>
                  </div>
                  <div className="text-[9px] sm:text-xs text-ink-400 uppercase tracking-wider mt-0.5 sm:mt-1">
                    1.2k reviews
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink">
                    100<span className="text-primary">%</span>
                  </div>
                  <div className="text-[9px] sm:text-xs text-ink-400 uppercase tracking-wider mt-0.5 sm:mt-1">
                    Autêntico
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink">
                    280<span className="text-volt">g</span>
                  </div>
                  <div className="text-[9px] sm:text-xs text-ink-400 uppercase tracking-wider mt-0.5 sm:mt-1">
                    Ultraleve
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Visual placeholder (Ocupa espaço na grade do desktop, no mobile a imagem fica atrás como background absoluto) */}
            <div className="relative hidden lg:block h-[600px]"></div>
          </div>
        </motion.div>

        {/* Scroll indicator - Escondido no mobile para não poluir */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-ink-400"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
              Role
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SECTION 2: FEATURE STRIP ===== */}
      <section className="bg-ink text-white py-8 lg:py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-ink-800 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-4 h-4 sm:w-5 sm:h-5 text-volt" />
                </div>
                <div>
                  <p className="font-bold text-[11px] sm:text-sm uppercase tracking-wide leading-tight">
                    {f.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-ink-300 mt-0.5">{f.sublabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: 3D SHOWCASE ===== */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-ink-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-bold skew-italic mb-3">
                <span className="skew-italic-content inline-block">
                  Experiência 3D
                </span>
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase leading-[0.95] text-ink">
                Veja em
                <br className="hidden sm:block" />
                <span className="text-gradient sm:ml-0 ml-2">360°</span>
              </h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-ink-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Explore cada ângulo do modelo. Arraste para girar, scroll para
                aproximar. Experiência exclusiva Sneakers.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                <div className="bg-white border border-ink-100 rounded-2xl p-3 sm:p-4 shadow-sm text-left">
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-ink-400 mb-1">
                    Tecnologia
                  </div>
                  <div className="font-display text-xl sm:text-2xl text-ink uppercase">
                    Zoom Air
                  </div>
                </div>
                <div className="bg-ink text-white rounded-2xl p-3 sm:p-4 shadow-md text-left">
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-ink-300 mb-1">
                    Drop
                  </div>
                  <div className="font-display text-xl sm:text-2xl uppercase">
                    10<span className="text-volt">mm</span>
                  </div>
                </div>
              </div>

              <Link
                href="/product"
                className="mt-8 inline-flex items-center gap-2 text-primary text-sm sm:text-base font-bold uppercase tracking-wide group justify-center lg:justify-start"
              >
                Ver especificações completas
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right — 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex justify-center w-full"
            >
              <Sneaker3DScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SCROLL STORYTELLING ===== */}
      <ScrollStorytelling />
    </>
  );
}
