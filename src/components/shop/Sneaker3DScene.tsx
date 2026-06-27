"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ZoomIn, Info } from "lucide-react";
import { cn } from "@/lib/utils";

import Sneaker3D from "./Sneaker3D";

function ModelSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 rounded-full shimmer-bg animate-shimmer" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-ink-100 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}

interface Sneaker3DSceneProps {
  className?: string;
}

/**
 * Sneaker3DScene — Wrapper around the Three.js Canvas.
 *
 * Features:
 *  - Lazy-loaded Canvas (heavy three.js bundle)
 *  - OrbitControls for drag-to-rotate
 *  - Studio lighting with contact shadows
 *  - Interactive hint overlay that fades after first interaction
 */
export default function Sneaker3DScene({ className }: Sneaker3DSceneProps) {
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <div className={cn("relative w-full aspect-square max-w-[600px]", className)}>
      {/* Hint overlay */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          >
            <div className="bg-ink/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 whitespace-nowrap">
              <RotateCcw className="w-3.5 h-3.5" />
              Arraste para girar
              <span className="w-1 h-1 bg-ink-400 rounded-full" />
              <ZoomIn className="w-3.5 h-3.5" />
              Scroll para zoom
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info tag */}
      <div className="absolute top-4 left-4 z-10 bg-volt text-ink px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 skew-italic">
        <Info className="w-3 h-3" />
        <span className="skew-italic-content inline-block">Modelo 3D Interativo</span>
      </div>

      {/* Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        onPointerDown={() => setHasInteracted(true)}
        className="!touch-none cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={<Html center><ModelSkeleton /></Html>}>
          {/* Studio Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight
            position={[-5, 8, -5]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[2, -2, 2]} intensity={0.5} color="#EF233C" />

          {/* Model */}
          <Sneaker3D />

          {/* Ground shadows */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.65}
            scale={10}
            blur={2.5}
            far={3}
            color="#0B0B0F"
          />

          {/* Environment preset */}
          <Environment preset="city" />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.7}
            autoRotate={!hasInteracted}
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>

      {/* Background gradient plate */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl opacity-80"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(239,35,60,0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
