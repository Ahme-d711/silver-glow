"use client";

import type { TermsSectionProps } from "../../types/terms-template.types";

export function TermsSection({
  id,
  title,
  intro,
  body,
  listItems,
}: TermsSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-32 border-b border-border pb-8 last:border-b-0 last:pb-0"
    >
      <h2 className="text-lg md:text-xl font-bold text-content-primary mb-3 text-start">
        {title}
      </h2>

      {intro ? (
        <p className="text-content-secondary leading-relaxed text-start mb-3">
          {intro}
        </p>
      ) : null}

      {listItems && listItems.length > 0 ? (
        <ul className="list-disc ps-5 space-y-2 text-content-secondary leading-relaxed text-start mb-3">
          {listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {body ? (
        <p className="text-content-secondary leading-relaxed text-start whitespace-pre-line">
          {body}
        </p>
      ) : null}
    </section>
  );
}
