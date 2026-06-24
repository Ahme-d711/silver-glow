"use client";

import type { ReactNode } from "react";
import type { StaticPageHeroProps } from "./types/static-page-template.types";

interface StaticPageHeroComponentProps extends StaticPageHeroProps {
  breadcrumbs?: ReactNode;
}

export function StaticPageHero({
  title,
  description,
}: StaticPageHeroComponentProps) {
  return (
    <div className="bg-primary text-white pt-34 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 start-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 end-0 w-96 h-96 bg-secondary rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />
      </div>

      <div className="container max-w-[1440px] mx-auto relative z-10">
        <div className="text-center space-y-4">
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
    </div>
  );
}
