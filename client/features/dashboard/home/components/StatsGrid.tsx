"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { StatsCard } from "./StatsCard";
import { DashboardStats } from "../types/dashboard.types";

interface StatsGridProps {
  stats: DashboardStats | undefined;
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
      variant: "secondary" as const,
    },
    {
      title: "Total Products",
      value: stats?.summary?.totalProducts?.toLocaleString() || "0",
      trend: "Available",
      isUp: true,
      variant: "primary" as const,
    },
    {
      title: "Total Orders",
      value: stats?.summary?.totalOrders?.toLocaleString() || "0",
      trend: "Cumulative",
      isUp: true,
      variant: "secondary" as const,
    },
    {
      title: "Total Revenue",
      value: `${stats?.summary?.totalRevenue?.toLocaleString() || "0"}`,
      trend: "Delivered",
      isUp: true,
      variant: "primary" as const,
    },
  ];

  const orders = [
    {
      title: "Pending",
      value: stats?.ordersByStatus?.PENDING?.toLocaleString() || "0",
      trend: "Awaiting",
      isUp: true,
      variant: "primary" as const,
    },
    {
      title: "Processing",
      value: (
        (stats?.ordersByStatus?.CONFIRMED || 0) + 
        (stats?.ordersByStatus?.PROCESSING || 0)
      ).toLocaleString(),
      trend: "In progress",
      isUp: true,
      variant: "secondary" as const,
    },
    {
      title: "Cancelled",
      value: stats?.ordersByStatus?.CANCELLED?.toLocaleString() || "0",
      trend: "Failed",
      isUp: false,
      variant: "primary" as const,
    },
    {
      title: "Completed",
      value: stats?.ordersByStatus?.DELIVERED?.toLocaleString() || "0",
      trend: "Delivered",
      isUp: true,
      variant: "secondary" as const,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[140px] rounded-[24px] p-6 bg-secondary/20 animate-pulse border border-divider space-y-4">
             <div className="h-4 w-24 bg-primary/10 rounded-lg" />
             <div className="h-8 w-16 bg-primary/10 rounded-lg" />
             <div className="flex gap-2">
               <div className="h-4 w-12 bg-primary/10 rounded-lg" />
               <div className="h-4 w-12 bg-primary/10 rounded-lg" />
             </div>
          </div>
        ))}
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Statistics Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-primary">{t("statistics")}</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {statistics.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <StatsCard 
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                isUp={stat.isUp}
                variant={stat.variant}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Orders Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-primary">{t("orders")}</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {orders.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <StatsCard 
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                isUp={stat.isUp}
                variant={stat.variant}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

