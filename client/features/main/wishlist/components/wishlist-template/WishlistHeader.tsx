"use client";

import { Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WishlistHeaderProps } from "../../types/wishlist-template.types";

export function WishlistHeader({
  title,
  description,
  count,
  clearLabel,
  onClear,
  showClear,
}: WishlistHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <h1 className="text-2xl md:text-[32px] font-bold text-primary flex items-center gap-4">
          <span className="relative">
            {title}
            <Sparkles className="absolute -top-6 -end-6 w-8 h-8 text-amber-400 opacity-50 animate-pulse" />
          </span>
          <span className="text-lg font-bold text-content-tertiary bg-white px-4 py-1.5 rounded-full border border-divider shadow-sm ms-2">
            {count}
          </span>
        </h1>
        <p className="text-content-tertiary mt-3 font-medium text-start">{description}</p>
      </div>

      {showClear && (
        <Button
          variant="outline"
          onClick={onClear}
          className="group border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl h-14 px-8 text-sm font-medium transition-all active:scale-95"
        >
          <Trash2 className="w-5 h-5 me-2 group-hover:shake" />
          {clearLabel}
        </Button>
      )}
    </div>
  );
}
