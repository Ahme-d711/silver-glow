"use client";

import type { AboutSectionProps } from "../../types/about-template.types";

export function AboutSection({ title, body }: AboutSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-primary mb-4 text-start">{title}</h2>
      <p className="text-content-secondary leading-relaxed text-start">{body}</p>
    </section>
  );
}
