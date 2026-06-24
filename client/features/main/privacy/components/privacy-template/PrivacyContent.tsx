"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  isValidParsedLegalDocumentContent,
  parseLegalDocumentContent,
} from "@/features/main/legal/utils/parseLegalDocumentContent";
import type { LegalDocumentSection } from "@/features/main/legal/types/legal-document.types";
import { PRIVACY_SECTIONS } from "../../constants/privacy.constants";
import { PrivacySection } from "./PrivacySection";
import { PrivacyTableOfContents } from "./PrivacyTableOfContents";

interface PrivacyContentProps {
  customContent?: string;
}

function resolveDefaultSections(
  t: ReturnType<typeof useTranslations<"Privacy">>
): LegalDocumentSection[] {
  return PRIVACY_SECTIONS.map((section) => ({
    id: section.id,
    title: t(section.titleKey),
    intro: section.introKey ? t(section.introKey) : undefined,
    body: section.bodyKey ? t(section.bodyKey) : undefined,
    listItems: section.listKeys?.map((key) => t(key)),
  }));
}

export function PrivacyContent({ customContent }: PrivacyContentProps) {
  const t = useTranslations("Privacy");

  const sections = (() => {
    if (!customContent) return resolveDefaultSections(t);

    const parsed = parseLegalDocumentContent(customContent);
    if (isValidParsedLegalDocumentContent(parsed)) {
      return parsed;
    }

    return resolveDefaultSections(t);
  })();

  const tocSections = sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return (
    <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
      <aside className="lg:sticky lg:top-28">
        <PrivacyTableOfContents sections={tocSections} />
      </aside>

      <article className="space-y-8 min-w-0">
        {sections.map((section) => {
          const isContactSection =
            section.id === "contact" ||
            /contact|تواصل/i.test(section.title);

          return (
            <div key={section.id}>
              <PrivacySection
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
