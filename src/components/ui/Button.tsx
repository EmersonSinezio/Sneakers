"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "angled";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children" | "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-lg hover:shadow-xl",
  secondary:
    "bg-ink text-white hover:bg-ink-800 active:bg-ink-900 shadow-md",
  ghost:
    "bg-transparent text-ink border border-ink-200 hover:bg-ink-50 active:bg-ink-100",
  angled:
    "bg-primary text-white hover:bg-primary-dark shadow-lg btn-angled skew-italic",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isAngled = variant === "angled";

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-bold uppercase tracking-wide rounded-full transition-colors duration-200 select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : (
        icon && <span aria-hidden="true">{icon}</span>
      )}
      <span className={cn(isAngled && "skew-italic-content inline-block")}>
        {loading ? "Processando..." : children}
      </span>
    </motion.button>
  );
}
