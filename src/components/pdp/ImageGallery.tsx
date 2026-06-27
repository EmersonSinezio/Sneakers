"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

/**
 * ImageGallery — Vertical thumbnails + main image with zoom on hover + lightbox.
 *
 * Features:
 *  - Vertical thumbnail rail (left on desktop, horizontal on mobile)
 *  - Main image with zoom-on-hover (CSS transform)
 *  - Click opens fullscreen lightbox with swipe navigation
 *  - Keyboard navigation in lightbox (← → Esc)
 */
export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const activeImage = images[activeIndex] ?? images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const nextLightbox = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightbox = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation for lightbox
  const handleLightboxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setLightboxOpen(false);
    if (e.key === "ArrowRight") nextLightbox();
    if (e.key === "ArrowLeft") prevLightbox();
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails rail */}
        <div className="flex md:flex-col gap-2 md:w-20 overflow-x-auto md:overflow-y-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                activeIndex === i
                  ? "border-primary shadow-lg"
                  : "border-ink-100 hover:border-ink-300"
              )}
              aria-label={`Ver imagem ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} - vista ${i + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1.5 bg-white"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          ref={mainImageRef}
          className="relative flex-1 aspect-square bg-gradient-to-br from-ink-50 via-white to-ink-50 rounded-3xl overflow-hidden cursor-zoom-in group"
          onClick={() => setLightboxOpen(true)}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
        >
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
            style={
              isZooming
                ? {
                    transform: `scale(1.8)`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: "transform 0.2s ease-out",
                  }
                : undefined
            }
          >
            <Image
              src={activeImage}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8 drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 bg-ink/80 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5" />
            Clique para ampliar
          </div>

          {/* Image counter */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-ink px-3 py-1.5 rounded-full text-xs font-bold font-mono">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
            onKeyDown={handleLightboxKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Galeria de imagens"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevLightbox();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextLightbox();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh] max-w-[1200px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={`${productName} - vista ${activeIndex + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-mono font-bold">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
