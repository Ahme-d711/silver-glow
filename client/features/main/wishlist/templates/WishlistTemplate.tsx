"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useWishlist } from "../hooks/useWishlist";
import { ShopProductCard } from "@/features/main/shop/components/cards/ShopProductCard";
import { Heart, ShoppingBag, Trash2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SectionHeader } from "@/components/shared/SectionHeader";

export const WishlistTemplate: React.FC = () => {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const { wishlist, isLoading, clearWishlist } = useWishlist();
  const products = wishlist?.products || [];

  return (
    <div className="min-h-screen bg-[#F8F9FB] pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-primary flex items-center gap-4">
              <span className="relative">
                {t("wishlist")}
                <Sparkles className="absolute -top-6 -right-6 w-8 h-8 text-amber-400 opacity-50 animate-pulse" />
              </span>
              <span className="text-lg font-bold text-content-tertiary bg-white px-4 py-1.5 rounded-full border border-divider shadow-sm ml-2">
                {products.length}
              </span>
            </h1>
            <p className="text-content-tertiary mt-3 font-medium">
              Saved items you love and want to keep an eye on.
            </p>
          </div>

          {products.length > 0 && (
            <Button
              variant="outline"
              onClick={() => clearWishlist()}
              className="group border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl h-14 px-8 text-sm font-medium transition-all active:scale-95"
            >
              <Trash2 className="w-5 h-5 mr-2 group-hover:shake" />
              Clear All Favorites
            </Button>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6 bg-white rounded-[48px] border border-divider shadow-sm">
            <div className="relative">
              <div className="absolute inset-0 animate-ping bg-primary/10 rounded-full" />
              <Loader2 className="w-12 h-12 animate-spin text-primary relative" />
            </div>
            <p className="text-content-tertiary font-black tracking-tight animate-pulse">Loading your favorites...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[48px] border border-divider shadow-sm">
            <div className="bg-neutral-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-14 h-14 text-neutral-200" />
            </div>
            <SectionHeader 
              title="Your wishlist is empty" 
              centered 
              className="mb-3"
              titleClassName="text-2xl font-black"
            />
            <p className="text-content-tertiary max-w-sm mx-auto mb-10 font-medium leading-relaxed">
              Looks like you haven't saved any items yet. Start exploring our premium collection.
            </p>
            <Link href="/shop">
              <Button className="h-16 px-10 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/10 group active:scale-95">
                Explore Collection
                <ArrowRight className={cn("w-5 h-5 ml-2 transition-transform", isRtl ? "rotate-180" : "group-hover:translate-x-1")} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ShopProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
