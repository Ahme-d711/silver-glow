import React from "react";

interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      {children}
    </div>
  );
}
