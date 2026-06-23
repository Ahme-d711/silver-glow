"use client";

import { ChevronDown } from "lucide-react";
import type { SupportFaqItemProps } from "../../types/support-template.types";

export function SupportFaqItem({ question, answer }: SupportFaqItemProps) {
  return (
    <details className="group border-b border-divider pb-4 cursor-pointer">
      <summary className="text-lg font-medium text-primary list-none flex justify-between items-center gap-4 group-open:mb-2 transition-all text-start">
        <span>{question}</span>
        <ChevronDown className="h-5 w-5 shrink-0 text-content-tertiary transition-transform group-open:rotate-180" />
      </summary>
      <p className="text-content-secondary leading-relaxed text-start">{answer}</p>
    </details>
  );
}
