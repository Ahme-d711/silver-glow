"use client";

import { cn } from "@/lib/utils";
import type { SupportContactCardProps } from "../../types/support-template.types";

export function SupportContactCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  href,
  actionType,
  onAction,
}: SupportContactCardProps) {
  return (
    <div className="group relative bg-white p-8 rounded-3xl border border-divider shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 end-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

      <div className="relative flex flex-col flex-1 text-start space-y-4">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Icon className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-content-secondary leading-relaxed flex-1">{description}</p>

        {actionType === "link" && href ? (
          <a
            href={href}
            className="inline-flex items-center text-primary font-bold hover:underline transition-opacity hover:opacity-80 mt-auto"
          >
            {actionLabel}
          </a>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className={cn(
              "inline-flex items-center text-primary font-bold hover:underline transition-opacity hover:opacity-80 mt-auto text-start",
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
