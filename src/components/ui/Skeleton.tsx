import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "rectangular" | "circular" | "text";
}

/**
 * Skeleton loading placeholder with shimmer animation.
 * Uses the custom `animate-shimmer` keyframe defined in tailwind.config.ts
 */
export default function Skeleton({
  className,
  variant = "rectangular",
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "shimmer-bg animate-shimmer bg-ink-100",
        variant === "rectangular" && "rounded-lg",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded h-4",
        className
      )}
    />
  );
}

/**
 * Pre-made skeleton for a ProductCard
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" aria-hidden="true">
      <Skeleton className="h-64 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2 h-3" />
        <div className="flex items-center gap-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="circular" className="w-3 h-3" />
          ))}
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton variant="text" className="w-1/3 h-6" />
          <Skeleton variant="circular" className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
}

/**
 * Pre-made skeleton grid for product listing
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
