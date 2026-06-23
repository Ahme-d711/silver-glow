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
    <div className="group bg-white p-8 rounded-3xl border border-divider shadow-sm text-center space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto transition-colors group-hover:bg-primary/15">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <p className="text-content-secondary leading-relaxed">{description}</p>

      {actionType === "link" && href ? (
        <a
          href={href}
          className="inline-block text-primary font-bold hover:underline transition-opacity hover:opacity-80"
        >
          {actionLabel}
        </a>
      ) : (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            "text-primary font-bold hover:underline transition-opacity hover:opacity-80",
          )}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
