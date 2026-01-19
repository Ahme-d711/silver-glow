"use client";

import { TimePeriodTabs } from './TimePeriodTabs';
import { RevenueOverall } from './RevenueOverall';

export function ChartsSection() {
  return (
    <>
      {/* Time Period Tabs */}
      <div className="flex justify-center">
        <TimePeriodTabs />
      </div>
      
      <RevenueOverall />
    </>
  );
}
