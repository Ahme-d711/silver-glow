"use client";

import { Loader2 } from "lucide-react";
import type { WishlistLoadingProps } from "../../types/wishlist-template.types";

export function WishlistLoading({ message }: WishlistLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-40 gap-6 bg-white rounded-[48px] border border-divider shadow-sm">
      <div className="relative">
        <div className="absolute inset-0 animate-ping bg-primary/10 rounded-full" />
        <Loader2 className="w-12 h-12 animate-spin text-primary relative" />
      </div>
      <p className="text-content-tertiary font-black tracking-tight animate-pulse">{message}</p>
    </div>
  );
}
