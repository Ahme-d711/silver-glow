"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface StorefrontPageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  titleClassName?: string;
  className?: string;
}

export const StorefrontPageHeader: React.FC<StorefrontPageHeaderProps> = ({
  title,
  breadcrumbs,
  titleClassName,
  className,
}) => {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className={cn("mb-12", className)}>
      <SectionHeader 
        title={title} 
        className="mb-2"
        titleClassName={titleClassName}
      />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-content-secondary">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <React.Fragment key={index}>
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast && "text-primary font-bold capitalize")}>
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};
