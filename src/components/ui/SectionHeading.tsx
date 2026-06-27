import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  accent?: boolean;
}

const alignMap = {
  left: "text-left items-start",
  center: "text-center items-center mx-auto",
  right: "text-right items-end",
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  accent = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn("flex flex-col gap-2 max-w-3xl", alignMap[align], className)}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-primary skew-italic">
          <span className="skew-italic-content inline-block">{eyebrow}</span>
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase leading-[0.95] text-ink">
        {title}
        {accent && (
          <span className="inline-block w-12 sm:w-16 h-1.5 bg-primary ml-3 align-middle skew-italic" />
        )}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-ink-400 max-w-2xl mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
