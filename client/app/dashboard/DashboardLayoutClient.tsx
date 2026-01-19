"use client";

import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { Slide } from "react-awesome-reveal";
import { DashboardNavbar } from "@/components/dashboard-navbar";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const loginPaths = ["/dashboard/login"];
  const isLoginPage = loginPaths.includes(pathname);

  // List of valid routes that should show sidebar and navbar
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

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-background overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
            <Slide direction="up" duration={300} triggerOnce fraction={0.1}>
              <DashboardNavbar />
            </Slide>
          <Slide direction="up" duration={400} triggerOnce fraction={0.1}>
            <main className="mt-8">{children}</main>
          </Slide>
        </div>
      </div>
    </div>
  );
}

