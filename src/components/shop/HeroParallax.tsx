"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * HeroParallax — Multi-layer parallax that responds to mouse movement.
 *
 * Layers move at different speeds to create a 3D depth effect.
 * Uses `useSpring` for smooth physics-based tracking.
 *
 * Layers (from back to front):
 *  - Background gradient orbs (slowest)
 *  - Decorative text / graphics
 *  - Main product image
 *  - Floating badges (fastest)
 */
export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Raw mouse values (centered: -0.5 to 0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth springs for each "depth" layer
  const bgX = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.5 });
  const bgY = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.5 });

  const midX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.5 });
  const midY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.5 });

  const fgX = useSpring(rawX, { stiffness: 160, damping: 18, mass: 0.5 });
  const fgY = useSpring(rawY, { stiffness: 160, damping: 18, mass: 0.5 });

  const badgeX = useSpring(rawX, { stiffness: 200, damping: 16, mass: 0.5 });
  const badgeY = useSpring(rawY, { stiffness: 200, damping: 16, mass: 0.5 });

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(x);
      rawY.set(y);
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    el?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el?.removeEventListener("mousemove", handleMouseMove);
      el?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY]);

  if (!isMounted) {
    return <div ref={containerRef} className="relative w-full h-full" />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* LAYER 0 — Background gradient orbs (slowest) */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(239,35,60,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[5%] right-[10%] w-[350px] h-[350px] rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(212,255,0,0.35) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* LAYER 1 — Decorative graphics (medium-slow) */}
      <motion.div
        style={{ x: midX, y: midY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Speed lines */}
        <svg
          className="absolute top-[20%] left-[5%] w-32 h-32 text-primary/20"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M10 50 L90 50 M10 60 L70 60 M10 70 L50 70"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Number 01 - Removido do topo direito e passado para trás do título na esquerda */}
        <div className="absolute top-[5%] left-[5%] font-display text-[240px] leading-none text-black/[0.02] select-none -z-10">
          01
        </div>

        {/* Dots grid - Afastado para a direita */}
        <div className="absolute bottom-[15%] lg:right-[15%] grid grid-cols-4 gap-2 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-black" />
          ))}
        </div>
      </motion.div>

      {/* LAYER 2 — Main sneaker image (foreground) */}
      <motion.div
        style={{ x: fgX, y: fgY }}
        className="absolute inset-0 hidden lg:flex items-center justify-center lg:justify-end lg:pr-[12%]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative w-[85%] max-w-[520px] aspect-square opacity-45 lg:opacity-100 transition-opacity duration-300"
        >
          {/* Shadow plate - CORRIGIDO */}
          <div className="absolute bottom-[18%] left-[15%] right-[15%] h-6 bg-black/40 blur-xl rounded-[100%]" /> 

          <Image
            src="/shoe-red-transparent.png"
            alt="Tênis vermelho em destaque"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 520px"
            className="object-contain drop-shadow-2xl z-10 relative"
          />
        </motion.div>
      </motion.div>

      {/* LAYER 3 — Floating badges (fastest) */}
      <motion.div
        style={{ x: badgeX, y: badgeY }}
        className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[12%] pointer-events-none"
      >
        <div className="relative w-[85%] max-w-[520px] aspect-square">
          {/* Price badge - Movido para perto do bico do tênis */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className={cn(
              "absolute top-[10%] right-[-10%] lg:right-[-5%]",
              "bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl border border-gray-100",
              "hidden lg:flex items-center gap-3 z-20 pointer-events-auto"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-[#D4FF00] flex items-center justify-center">
              <span className="text-black font-bold">$</span>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                A partir de
              </div>
              <div className="font-bold text-black font-mono">R$ 549,90</div>
            </div>
          </motion.div>

          {/* Tech badge - Movido para o calcanhar do tênis */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className={cn(
              "absolute bottom-[25%] left-[-15%] lg:left-[-10%]",
              "bg-[#0B0B0F] text-white rounded-2xl px-4 py-3 shadow-2xl",
              "hidden lg:flex items-center gap-3 z-20 pointer-events-auto"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-[#EF233C] flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400">
                Tecnologia
              </div>
              <div className="font-bold text-sm">Zoom Air</div>
            </div>
          </motion.div>

          {/* Rating badge - Centralizado abaixo do tênis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className={cn(
              "absolute bottom-[0%] left-[50%] -translate-x-1/2",
              "bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 shadow-xl border border-gray-100",
              "hidden lg:flex items-center gap-2 z-20 pointer-events-auto"
            )}
          >
            <div className="flex text-[#D4FF00]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-black text-sm ml-1">4.9</span>
            <span className="text-gray-400 text-xs">(1287)</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
