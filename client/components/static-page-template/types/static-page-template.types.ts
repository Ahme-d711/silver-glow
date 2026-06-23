import type { ReactNode } from "react";

export interface StaticPageTemplateProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export interface StaticPageBreadcrumbsProps {
  title: string;
}

export interface StaticPageHeroProps {
  title: string;
  description?: string;
}

export interface StaticPageContentProps {
  children: ReactNode;
}
