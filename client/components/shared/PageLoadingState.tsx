"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface PageLoadingStateProps {
  message?: string;
  className?: string;
  minHeight?: string;
}

export function PageLoadingState({
  message,
  className,
  minHeight = "min-h-[420px]",
}: PageLoadingStateProps) {
  const t = useTranslations("Common");

  return (
    <div
      className={cn(
        "flex items-center justify-center px-6 py-12",
        minHeight,
        className,
      )}
    >
      <div className="relative w-full max-w-md rounded-[28px] border border-divider bg-white px-8 py-10 text-center shadow-sm">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
          <div className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-8 right-8 h-24 w-24 rounded-full bg-secondary/30 blur-2xl" />
        </div>

        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
          <div className="absolute inset-1 rounded-full border-2 border-t-primary border-r-primary/20 border-b-primary/10 border-l-primary/20 animate-spin" />
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/40">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </div>

        <p className="text-lg font-semibold text-primary">
          {message || t("page_loading")}
        </p>
        <p className="mt-2 text-sm text-content-secondary">
          {t("page_loading_hint")}
        </p>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.2s]" />
          <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce [animation-delay:-0.1s]" />
          <span className="h-2 w-2 rounded-full bg-primary/30 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
