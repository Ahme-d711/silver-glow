"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { WifiOff, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StorefrontErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  fullPage?: boolean;
  className?: string;
}

export const StorefrontError: React.FC<StorefrontErrorProps> = ({
  title,
  description,
  onRetry,
  fullPage = true,
  className
}) => {
  const t = useTranslations("Errors");

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center px-4",
        fullPage ? "min-h-[60vh] py-20" : "py-12",
        className
      )}
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-150 animate-pulse" />
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-divider">
          <WifiOff className="w-12 h-12 text-primary animate-in fade-in zoom-in duration-700" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center shadow-lg border border-red-100">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 tracking-tight">
        {title || t("server_error_title")}
      </h3>
      
      <p className="text-content-secondary text-lg max-w-md mb-10 leading-relaxed">
        {description || t("server_error_desc")}
      </p>

      <Button
        size="lg"
        onClick={handleRetry}
        className="rounded-2xl h-14 px-10 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
      >
        <RefreshCw className="w-5 h-5" />
        {t("retry_button")}
      </Button>
    </div>
  );
};
