"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { Category } from "@/lib/types";

interface BreadcrumbsProps {
  category: Category;
  productName: string;
}

/**
 * Breadcrumbs — Animated navigation path: Home / Category / Product
 */
export default function Breadcrumbs({
  category,
  productName,
}: BreadcrumbsProps) {
  const categoryLabel =
    CATEGORIES.find((c) => c.id === category)?.label ?? category;

  const crumbs = [
    { label: "Home", href: "/", icon: Home },
    { label: "Coleção", href: "/product" },
    {
      label: categoryLabel,
      href: `/product?category=${category}`,
    },
    { label: productName, href: null }, // current page
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          const Icon = crumb.icon;

          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center gap-1.5"
            >
              {!isLast && crumb.href ? (
                <Link
                  href={crumb.href}
                  className="inline-flex items-center gap-1 text-ink-400 hover:text-primary transition-colors uppercase tracking-wider font-medium"
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink font-bold uppercase tracking-wider">
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="w-3 h-3 text-ink-300" />
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}
