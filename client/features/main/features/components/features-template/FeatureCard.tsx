"use client";

import type { FeatureCardProps } from "../../types/features-template.types";

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="space-y-4 group">
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-colors group-hover:bg-primary/15">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-primary text-start">{title}</h3>
      <p className="text-content-secondary leading-relaxed text-start">{description}</p>
    </div>
  );
}
