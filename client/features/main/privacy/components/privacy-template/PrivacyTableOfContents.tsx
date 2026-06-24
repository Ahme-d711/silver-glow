"use client";

import type { PrivacyTableOfContentsProps } from "../../types/privacy-template.types";
import { useTranslations } from "next-intl";

export function PrivacyTableOfContents({ sections }: PrivacyTableOfContentsProps) {
  const t = useTranslations("Privacy");

  return (
    <nav
      aria-label={t("toc_label")}
      className="rounded-xl border border-border bg-background p-5 md:p-6"
    >
      <h2 className="text-sm font-bold uppercase tracking-wide text-content-secondary mb-4 text-start">
        {t("toc_title")}
      </h2>
      <ol className="space-y-2 text-sm">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="block text-start text-content-secondary hover:text-primary transition-colors leading-snug py-0.5"
            >
              <span className="text-content-tertiary me-1.5">{index + 1}.</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
