"use client";

import { cn } from "@/lib/utils";
import type { WorksShowcaseItemProps } from "../../types/works-template.types";

export function WorksShowcaseItem({
  label,
  title,
  description,
  imagePlaceholder,
  reverse = false,
}: WorksShowcaseItemProps) {
  return (
    <section
      className={cn(
        "grid md:grid-cols-2 gap-12 items-center",
        reverse && "md:flex-row-reverse",
      )}
    >
      <div className={cn("space-y-4", reverse && "md:order-2")}>
        <span className="text-sm font-semibold text-primary/60 uppercase tracking-widest block text-start">
          {label}
        </span>
        <h2 className="text-3xl font-bold text-primary text-start">{title}</h2>
        <p className="text-content-secondary leading-relaxed text-start">{description}</p>
      </div>
      <div
        className={cn(
          "bg-secondary/20 h-80 rounded-3xl border border-divider flex items-center justify-center",
          reverse && "md:order-1",
        )}
      >
        <span className="text-primary/30 font-medium italic px-6 text-center">
          {imagePlaceholder}
        </span>
      </div>
    </section>
  );
}
