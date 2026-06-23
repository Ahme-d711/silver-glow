"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";

interface ShopAllCategoryCardProps {
  productCount: number;
}

export function ShopAllCategoryCard({ productCount }: ShopAllCategoryCardProps) {
  const t = useTranslations("Shop");
  const searchParams = useSearchParams();
  const isActive = !searchParams.get("category");

  return (
    <Link
      href="/shop"
      className={cn(
        "group relative overflow-hidden rounded-2xl aspect-4/5 block bg-primary shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
        isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
    >
      <Image
        src="/images/shop-all-categories.png"
        alt={t("all")}
        fill
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/45 to-primary/20 transition-colors duration-300 group-hover:from-primary/95 group-hover:via-primary/55" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <LayoutGrid className="size-5" strokeWidth={1.75} />
        </div>

        <h3 className="mb-2 text-2xl font-bold uppercase tracking-tight md:text-3xl transition-transform duration-500 group-hover:-translate-y-0.5">
          {t("all")}
        </h3>
        <p className="text-sm font-medium uppercase tracking-widest text-white/85 md:text-base">
          {productCount} {t("items")}
        </p>
      </div>

      <div className="absolute inset-4 rounded-xl border border-white/25 opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100" />
    </Link>
  );
}
