"use client";

import { Sidebar } from "@/components/sidebar";
import { usePathname } from "@/i18n/routing";
import { Slide } from "react-awesome-reveal";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { Suspense } from "react";
import { useLocale } from "next-intl";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  
  const loginPaths = ["/dashboard/login"];
  const isLoginPage = loginPaths.includes(pathname);

  // List of valid routes that should show sidebar and navbar
  // next-intl usePathname returns path without locale prefix
  const validRoutes = [
    "/dashboard",
    "/dashboard/packages",
    "/dashboard/users",
    "/dashboard/ads",
    "/dashboard/services",
    "/dashboard/orders",
    "/dashboard/settings",
  ];

  // Check if current pathname is a valid route or starts with a valid route
  const isValidRoute = validRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Hide sidebar and navbar for login page or invalid routes (404 pages)
  if (isLoginPage || !isValidRoute) {
    return <>{children}</>;
  }

  const isRtl = locale === 'ar';

  return (
    <div className="flex h-screen bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
      <Sidebar />
      <div className="flex flex-1 flex-col bg-background overflow-hidden font-sans">
        <div className="flex-1 overflow-y-auto p-6">
            <Slide direction="up" duration={300} triggerOnce fraction={0.1}>
              <Suspense>
                <DashboardNavbar />
              </Suspense>
            </Slide>
          <Slide direction="up" duration={400} triggerOnce fraction={0.1}>
            <main className="mt-8">{children}</main>
          </Slide>
        </div>
      </div>
    </div>
  );
}


