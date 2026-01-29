"use client";

import { Sidebar } from "@/components/sidebar";
import { Slide } from "react-awesome-reveal";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { Suspense } from "react";
import { useLocale } from "next-intl";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <div className="flex h-screen bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
      <Sidebar />
      <div className="flex flex-1 flex-col bg-background overflow-hidden font-sans">
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            <div className="relative z-40 overflow-visible!">
              <Slide direction="up" duration={300} triggerOnce fraction={0.1} className="overflow-visible!">
                <Suspense fallback={null}>
                  <DashboardNavbar />
                </Suspense>
              </Slide>
            </div>
          <div className="relative z-0">
            <Slide direction="up" duration={400} triggerOnce fraction={0.1}>
              <main className="mt-8">{children}</main>
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
}
