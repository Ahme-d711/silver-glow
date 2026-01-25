"use client";

import { useTranslations } from "next-intl";
import { StatsCard } from "./StatsCard";

interface StatsGridProps {
  stats: any;
  isLoading?: boolean;
}

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  const t = useTranslations("Dashboard");
  const tCommon = useTranslations("Common");

  const statistics = [
    {
      title: "Total Users",
      value: stats?.summary?.totalUsers?.toLocaleString() || "0",
      trend: stats?.summary?.newUsersLast30Days ? `+${stats.summary.newUsersLast30Days} new` : "0 new",
      isUp: true,
      variant: "light" as const,
    },
    {
      title: "Total Products",
      value: stats?.summary?.totalProducts?.toLocaleString() || "0",
      trend: "Available",
      isUp: true,
      variant: "dark" as const,
    },
    {
      title: "Total Orders",
      value: stats?.summary?.totalOrders?.toLocaleString() || "0",
      trend: "Cumulative",
      isUp: true,
      variant: "light" as const,
    },
    {
      title: "Total Revenue",
      value: `${stats?.summary?.totalRevenue?.toLocaleString() || "0"} ${tCommon("currency")}`,
      trend: "Delivered",
      isUp: true,
      variant: "dark" as const,
    },
  ];

  const orders = [
    {
      title: "Pending",
      value: stats?.ordersByStatus?.PENDING?.toLocaleString() || "0",
      trend: "Awaiting",
      isUp: true,
      variant: "dark" as const,
    },
    {
      title: "Processing",
      value: (
        (stats?.ordersByStatus?.CONFIRMED || 0) + 
        (stats?.ordersByStatus?.PROCESSING || 0)
      ).toLocaleString(),
      trend: "In progress",
      isUp: true,
      variant: "light" as const,
    },
    {
      title: "Cancelled",
      value: stats?.ordersByStatus?.CANCELLED?.toLocaleString() || "0",
      trend: "Failed",
      isUp: false,
      variant: "dark" as const,
    },
    {
      title: "Completed",
      value: stats?.ordersByStatus?.DELIVERED?.toLocaleString() || "0",
      trend: "Delivered",
      isUp: true,
      variant: "light" as const,
    },
  ];

  if (isLoading) {
    return <div className="h-40 flex items-center justify-center">Loading stats...</div>
  }

  return (
    <div className="space-y-8">
      {/* Statistics Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-primary">{t("statistics")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <StatsCard 
              key={index}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              isUp={stat.isUp}
              variant={stat.variant}
            />
          ))}
        </div>
      </div>

      {/* Orders Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-primary">{t("orders")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orders.map((stat, index) => (
            <StatsCard 
              key={index}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              isUp={stat.isUp}
              variant={stat.variant}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

