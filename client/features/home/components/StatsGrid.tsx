"use client";

import { StatsCard } from "./StatsCard";

export function StatsGrid() {
  const statistics = [
    {
      title: "Views",
      value: "2,318",
      trend: "+11.01%",
      isUp: true,
      variant: "light" as const,
    },
    {
      title: "Visits",
      value: "2,318",
      trend: "-0.03%",
      isUp: false,
      variant: "dark" as const,
    },
    {
      title: "Active Users",
      value: "2,318",
      trend: "+6.08%",
      isUp: true,
      variant: "light" as const,
    },
    {
      title: "New Users",
      value: "2,318",
      trend: "+15.03%",
      isUp: true,
      variant: "dark" as const,
    },
  ];

  const orders = [
    {
      title: "Pending",
      value: "2,318",
      trend: "+11.01%",
      isUp: true,
      variant: "dark" as const,
    },
    {
      title: "Waiting",
      value: "2,318",
      trend: "+6.08%",
      isUp: true,
      variant: "light" as const,
    },
    {
      title: "Cancelled",
      value: "2,318",
      trend: "-0.03%",
      isUp: false,
      variant: "dark" as const,
    },
    {
      title: "Completed",
      value: "2,318",
      trend: "+15.03%",
      isUp: true,
      variant: "light" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Statistics Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-primary">Statistics</h2>
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
        <h2 className="text-lg font-bold text-primary">Orders</h2>
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
