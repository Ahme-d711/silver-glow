"use client";

import type { StaticPageContentProps } from "./types/static-page-template.types";

export function StaticPageContent({ children }: StaticPageContentProps) {
  return (
    <div className="container max-w-[1440px] mx-auto py-16 px-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-divider min-h-[400px]">
        <div className="prose prose-lg max-w-none text-content-secondary leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
