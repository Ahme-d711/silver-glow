import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title?: string;
  children?: React.ReactNode;
  className?: string; // Container className
  titleClassName?: string; // Title className
  centered?: boolean;
  leftOnMobile?: boolean; // Centered on mobile, left on desktop
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  children,
  className,
  titleClassName,
  centered = false,
  leftOnMobile = false,
}) => {
  return (
    <div className={cn(
      "mb-8", 
      centered && "text-center", 
      leftOnMobile && "text-center md:text-start",
      className
    )}>
      <h2 className={cn("text-[26px] leading-[28px] font-bold text-content-primary", titleClassName)}>
        {title || children}
      </h2>
    </div>
  );
};
