"use client";

import { AlertCircle, FileQuestion, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
  className?: string;
  minHeight?: string;
  variant?: "error" | "not-found";
}

export function PageErrorState({
  title,
  description,
  onRetry,
  backHref,
  backLabel,
  className,
  minHeight = "min-h-[420px]",
  variant = "error",
}: PageErrorStateProps) {
  const t = useTranslations("Common");
  const isNotFound = variant === "not-found";
  const Icon = isNotFound ? FileQuestion : AlertCircle;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    window.location.reload();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center px-6 py-12",
        minHeight,
        className,
      )}
    >
      <div className="relative w-full max-w-lg rounded-[28px] border border-divider bg-white px-8 py-10 text-center shadow-sm">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
          <div className="absolute -top-12 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-destructive/5 blur-3xl" />
        </div>

        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-[24px] border shadow-sm",
              isNotFound
                ? "border-amber-100 bg-amber-50 text-amber-600"
                : "border-red-100 bg-red-50 text-destructive",
            )}
          >
            <Icon className="h-9 w-9" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-primary">
          {title ||
            (isNotFound ? t("page_not_found_title") : t("page_error_title"))}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-content-secondary">
          {description ||
            (isNotFound
              ? t("page_not_found_description")
              : t("page_error_description"))}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            onClick={handleRetry}
            className="h-11 rounded-xl px-6 font-semibold"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {t("try_again")}
          </Button>

          {backHref && (
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-xl border-divider px-6 font-semibold"
            >
              <Link href={backHref}>{backLabel || t("back")}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
