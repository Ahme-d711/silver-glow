"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { useLocale } from "next-intl";

interface StaticPageTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const StaticPageTemplate: React.FC<StaticPageTemplateProps> = ({
  title,
  description,
  children,
}) => {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b border-divider bg-white">
        <div className="container max-w-[1440px] mx-auto py-4 flex items-center gap-2 text-sm text-content-secondary">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home size={16} />
            <span>{isRtl ? "الرئيسية" : "Home"}</span>
          </Link>
          <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
          <span className="text-primary font-medium">{title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-primary text-white py-20 pt-30 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
        </div>
        
        <div className="container max-w-[1440px] mx-auto relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-[1440px] mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-divider min-h-[400px]">
          <div className="prose prose-lg max-w-none text-content-secondary leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPageTemplate;
