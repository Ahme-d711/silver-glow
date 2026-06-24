"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WorksShowcaseItemProps } from "../../types/works-template.types";

export function WorksShowcaseItem({
  image,
  imageAlt,
  label,
  title,
  description,
  reverse = false,
}: WorksShowcaseItemProps) {
  return (
    <article
      className={cn(
        "grid md:grid-cols-2 gap-10 lg:gap-16 items-center",
        reverse && "md:[&>*:first-child]:order-2",
      )}
    >
      <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-divider shadow-lg group">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="space-y-5 text-start">
        <span className="text-sm font-semibold text-primary/60 uppercase tracking-widest block">
          {label}
        </span>
        <div className="h-1 w-12 rounded-full bg-primary/80" />
        <h2 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
          {title}
        </h2>
        <p className="text-content-secondary text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
