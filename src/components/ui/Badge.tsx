import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "low-stock" | "discount" | "category" | "soldout";

interface BadgeProps {
  variant: BadgeVariant;
  value: string;
  className?: string;
  skewed?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-volt text-ink",
  "low-stock": "bg-orange-500 text-white",
  discount: "bg-primary text-white",
  category: "bg-ink-50 text-ink border border-ink-200",
  soldout: "bg-ink text-white",
};

export default function Badge({
  variant,
  value,
  className,
  skewed = true,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded",
        skewed && "skew-italic",
        variantStyles[variant],
        className
      )}
    >
      <span className={cn(skewed && "skew-italic-content inline-block")}>
        {value}
      </span>
    </span>
  );
}
