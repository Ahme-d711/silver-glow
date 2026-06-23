"use client";

import type { PrivacySectionProps } from "../../types/privacy-template.types";

export function PrivacySection({ title, body }: PrivacySectionProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-primary mb-2 text-start">{title}</h2>
      <p className="text-content-secondary leading-relaxed text-start">{body}</p>
    </section>
  );
}
