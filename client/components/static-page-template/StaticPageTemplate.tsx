"use client";

import { StaticPageBreadcrumbs } from "./StaticPageBreadcrumbs";
import { StaticPageContent } from "./StaticPageContent";
import { StaticPageHero } from "./StaticPageHero";
import type { StaticPageTemplateProps } from "./types/static-page-template.types";

export function StaticPageTemplate({
  title,
  description,
  children,
}: StaticPageTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      <StaticPageHero
        title={title}
        description={description}
        breadcrumbs={<StaticPageBreadcrumbs title={title} />}
      />
      <StaticPageContent>{children}</StaticPageContent>
    </div>
  );
}

export default StaticPageTemplate;
