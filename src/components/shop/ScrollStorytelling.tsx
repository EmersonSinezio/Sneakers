"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Layer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const LAYERS: Layer[] = [
  {
    id: "upper",
    title: "Cabedal Flyknit",
    subtitle: "Leve como uma segunda pele",
    description:
      "Malha tecida em fio único que se adapta ao pé. Respirável, sustentável e ultraleve (apenas 28g).",
    color: "#EF233C",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: "air",
    title: "Unidade Zoom Air",
    subtitle: "Amortecimento responsivo",
    description:
      "Cápsula de ar pressurizada com fibras tensionadas. Absorve impacto e libera energia instantaneamente.",
    color: "#D4FF00",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: "midsole",
    title: "Entressola React",
    subtitle: "Espuma que retorna energia",
    description:
      "Espuma ultraleve que se comprime no impacto e devolve energia a cada passada. 30% mais retorno que EVA.",
    color: "#F5F5F7",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "sole",
    title: "Solado de Borracha",
    subtitle: "Tração em qualquer superfície",
    description:
      "Composto de alta durabilidade com padrão Waffle. Aderência superior em asfalto molhado e trilhas.",
    color: "#0B0B0F",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="3" y="12" width="18" height="8" rx="1" />
        <path d="M6 12V8M10 12V8M14 12V8M18 12V8" />
      </svg>
    ),
  },
];

export default function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 lg:mb-24"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#EF233C] font-bold skew-italic mb-3">
            <span className="skew-italic-content inline-block">
              Engenharia de Performance
            </span>
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase leading-[0.95] text-black">
            Construído
            <br />
            Camada por
            <br />
            <span className="text-gradient block mt-1">Camada</span>
          </h2>
          <p className="mt-6 text-base lg:text-lg text-gray-500 max-w-xl">
            Cada componente do tênis foi projetado com uma função específica.
            Role para explorar a anatomia completa da performance em 3D.
          </p>
        </motion.div>

        {/* Layout de 2 Colunas */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Coluna Esquerda: Textos da Timeline */}
          <div className="space-y-24 lg:space-y-40 relative pb-32">
            {/* Linha guia da Timeline */}
            <div className="absolute left-[15px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-200 to-transparent" />

            {LAYERS.map((layer, i) => (
              <LayerCard key={layer.id} layer={layer} index={i} />
            ))}
          </div>

          {/* Coluna Direita: Sticky Blueprint Visual */}
          <div className="hidden lg:block col-span-1">
            {/* Aumentei a altura aqui de 600px para 750px */}
            <div className="sticky top-24 h-full w-full rounded-3xl bg-gray-50/50 border border-gray-100 flex items-center justify-center overflow-hidden noise-bg">
              {/* Grid Tech Background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />
              <SneakerExploded scrollProgress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LayerCard({ layer, index }: { layer: Layer; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40% 0px -40% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
      transition={{ duration: 0.5 }}
      className="relative pl-12 sm:pl-16"
    >
      {/* Círculo do Número alinhado perfeitamente com a linha */}
      <div
        className={cn(
          "absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors duration-500 z-10",
          isInView ? "bg-white shadow-lg" : "bg-gray-50"
        )}
        style={{
          borderColor: isInView ? layer.color : "#E5E5EA",
          color: isInView ? (layer.color === "#F5F5F7" ? "#000" : layer.color) : "#8A8A93",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform duration-500"
          style={{
            backgroundColor: layer.color,
            color: layer.color === "#F5F5F7" || layer.color === "#D4FF00" ? "#0B0B0F" : "#FFFFFF",
            transform: isInView ? "scale(1.05)" : "scale(1)",
          }}
        >
          {layer.icon}
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">
            Camada {index + 1}
          </p>
          <h3 className="font-display text-2xl lg:text-3xl uppercase text-black leading-none">
            {layer.title}
          </h3>
        </div>
      </div>

      <p className="font-bold text-sm lg:text-base text-gray-800 mb-2">
        {layer.subtitle}
      </p>
      <p className="text-sm lg:text-base text-gray-500 leading-relaxed max-w-md">
        {layer.description}
      </p>
    </motion.div>
  );
}

function SneakerExploded({ scrollProgress }: { scrollProgress: any }) {
  // Configuração das distâncias do Parallax ajustadas para não vazarem da tela
  const upperY = useTransform(scrollProgress, [0, 1], [0, -140]);
  const airY = useTransform(scrollProgress, [0, 1], [0, -30]);
  const midsoleY = useTransform(scrollProgress, [0, 1], [0, 40]);
  const soleY = useTransform(scrollProgress, [0, 1], [0, 120]);

  // Opacidade dinâmica
  const upperOp = useTransform(scrollProgress, [0, 0.3, 1], [0.5, 1, 1]);
  const airOp = useTransform(scrollProgress, [0.2, 0.5, 1], [0.5, 1, 1]);
  const midOp = useTransform(scrollProgress, [0.4, 0.7, 1], [0.5, 1, 1]);
  const soleOp = useTransform(scrollProgress, [0.6, 0.9, 1], [0.5, 1, 1]);

  return (
    <div className="relative w-full h-[650px] max-w-[500px] flex flex-col items-center justify-center">

      {/* Brilho de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,35,60,0.03)_0%,transparent_70%)]" />

      {/* 2. Ajustamos o top de cada imagem de forma proporcional para encaixarem perfeitamente */}
      <motion.div style={{ y: upperY, opacity: upperOp }} className="absolute w-full z-40" style={{ top: "-35%" }}>
        <TechLayer id="upper" color="#EF233C" label="Cabedal" />
      </motion.div>

      <motion.div style={{ y: airY, opacity: airOp }} className="absolute w-full z-50" style={{ top: "20%" }}>
        <TechLayer id="air" color="#D4FF00" label="Zoom Air" />
      </motion.div>

      <motion.div style={{ y: midsoleY, opacity: midOp }} className="absolute w-full z-30" style={{ top: "65%" }}>
        <TechLayer id="midsole" color="#F5F5F7" label="React" />
      </motion.div>

      <motion.div style={{ y: soleY, opacity: soleOp }} className="absolute w-full z-20" style={{ top: "110%" }}>
        <TechLayer id="sole" color="#0B0B0F" label="Solado" />
      </motion.div>

    </div>
  );
}

function TechLayer({ id, label, color }: { id: string; label: string; color: string }) {
  const isLight = color === "#F5F5F7" || color === "#D4FF00";
  const labelColor = isLight ? "#000" : "#FFF";

  // 3. Removemos as margens negativas (mt-4) que estavam bugando a posição. 
  // Agora controlamos apenas a largura (w-%) de cada imagem.
  const sizeClasses: Record<string, string> = {
    upper: "w-[85%] mx-auto",
    air: "w-[40%] mx-auto", // A bolha de ar é menor, fica no centro
    midsole: "w-[82%] mx-auto",
    sole: "w-[85%] mx-auto",
  };

  return (
    <div className="relative w-full flex justify-center items-center group">
      <div className={cn("relative transition-transform duration-500 group-hover:scale-105", sizeClasses[id])}>
        <img
          src={`/layers/layer-${id}.png?v=4`}
          alt={label}
          className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
        />
      </div>

      {/* Etiqueta Flutuante ajustada para não quebrar em telas menores */}
      <div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-md z-50"
        style={{
          backgroundColor: isLight ? `${color}` : color,
          color: labelColor,
          border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.2)"
        }}
      >
        {label}
      </div>
    </div>
  );
}
