"use client";

import { ArrowRight, Heart } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import type { WishlistEmptyProps } from "../../types/wishlist-template.types";

export function WishlistEmpty({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: WishlistEmptyProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const actionButton = (
    <Button
      className="h-16 px-10 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/10 group active:scale-95"
      onClick={onAction}
    >
      {actionLabel}
      <ArrowRight
        className={cn(
          "w-5 h-5 ms-2 transition-transform",
          isRtl ? "rotate-180" : "group-hover:translate-x-1"
        )}
      />
    </Button>
  );

  return (
    <div className="text-center py-32 bg-white rounded-[48px] border border-divider shadow-sm">
      <div className="bg-neutral-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
        <Heart className="w-14 h-14 text-neutral-200" />
      </div>
      <SectionHeader
        title={title}
        centered
        className="mb-3"
        titleClassName="text-2xl font-black"
      />
      <p className="text-content-tertiary max-w-sm mx-auto mb-10 font-medium leading-relaxed">
        {description}
      </p>
      {actionHref ? <Link href={actionHref}>{actionButton}</Link> : actionButton}
    </div>
  );
}
