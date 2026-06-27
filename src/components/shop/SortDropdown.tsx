"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, SortOption } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

/**
 * SortDropdown — Dropdown for sorting products.
 */
export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const currentLabel =
    SORT_OPTIONS.find((opt) => opt.id === value)?.label ?? "Relevância";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className={cn(
          "appearance-none bg-white border border-ink-200 rounded-full px-5 py-2.5 pr-10",
          "text-sm font-medium text-ink cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          "transition-colors hover:border-ink-300"
        )}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
    </div>
  );
}
