"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type TimePeriod = "Today" | "Yesterday" | "Week" | "Month";

const periods: TimePeriod[] = ["Today", "Yesterday", "Week", "Month"];

interface TimePeriodTabsProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
}

export function TimePeriodTabs({ value, onChange }: TimePeriodTabsProps) {
  return (
    <div className="bg-white rounded-[16px] p-1.5 inline-flex gap-4 shadow-sm border border-divider">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={cn(
            "px-6 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-200",
            value === period
              ? "bg-primary text-white shadow-sm"
              : "text-content-secondary hover:text-content-primary hover:bg-gray-50"
          )}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
