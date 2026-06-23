"use client";

import type { AboutValueCardProps } from "../../types/about-template.types";

export function AboutValueCard({ title, description }: AboutValueCardProps) {
  return (
    <div className="bg-background p-6 rounded-2xl border border-divider transition-shadow hover:shadow-sm">
      <h3 className="text-xl font-semibold text-primary mb-2 text-start">{title}</h3>
      <p className="text-content-secondary leading-relaxed text-start">{description}</p>
    </div>
  );
}
