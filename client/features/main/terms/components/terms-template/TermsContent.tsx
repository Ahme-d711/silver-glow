"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { TERMS_SECTIONS } from "../../constants/terms.constants";
import type { TermsResolvedSection } from "../../types/terms-template.types";
import { parseTermsContent } from "../../utils/parseTermsContent";
import { TermsSection } from "./TermsSection";
import { TermsTableOfContents } from "./TermsTableOfContents";

interface TermsContentProps {
  customContent?: string;
}

function resolveDefaultSections(
  t: ReturnType<typeof useTranslations<"Terms">>
): TermsResolvedSection[] {
  return TERMS_SECTIONS.map((section) => ({
    id: section.id,
    title: t(section.titleKey),
    intro: section.introKey ? t(section.introKey) : undefined,
    body: section.bodyKey ? t(section.bodyKey) : undefined,
    listItems: section.listKeys?.map((key) => t(key)),
  }));
}

export function TermsContent({ customContent }: TermsContentProps) {
  const t = useTranslations("Terms");

  const sections = customContent
    ? parseTermsContent(customContent)
    : resolveDefaultSections(t);

  const tocSections = sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return (
    <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
      <aside className="lg:sticky lg:top-28">
        <TermsTableOfContents sections={tocSections} />
      </aside>

      <article className="space-y-8 min-w-0">
        {sections.map((section) => {
          const isContactSection =
            section.id === "contact" ||
            /contact|تواصل/i.test(section.title);

          return (
            <div key={section.id}>
              <TermsSection
                id={section.id}
                title={section.title}
                intro={section.intro}
                body={section.body}
                listItems={section.listItems}
              />
              {isContactSection ? (
                <Link
                  href="/support"
                  className="inline-flex mt-4 text-sm font-semibold text-primary hover:underline underline-offset-4"
                >
                  {t("contact_cta")} →
                </Link>
              ) : null}
            </div>
          );
        })}

        <footer className="pt-4 border-t border-border">
          <p className="text-xs text-content-tertiary leading-relaxed text-start">
            {t("footer_disclaimer")}
          </p>
        </footer>
      </article>
    </div>
  );
}
