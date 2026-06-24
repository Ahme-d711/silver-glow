"use client";

import { ChevronDown } from "lucide-react";
import type { SupportFaqItemProps } from "../../types/support-template.types";

export function SupportFaqItem({ question, answer }: SupportFaqItemProps) {
  return (
    <details className="group bg-white rounded-2xl border border-divider px-6 py-5 cursor-pointer transition-shadow hover:shadow-sm open:shadow-md open:border-primary/15">
      <summary className="text-lg font-semibold text-primary list-none flex justify-between items-center gap-4 transition-all text-start">
        <span>{question}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary group-open:bg-primary group-open:text-white transition-colors">
          <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <p className="text-content-secondary leading-relaxed text-start pt-4 mt-2 border-t border-divider/60">
        {answer}
      </p>
    </details>
  );
}
