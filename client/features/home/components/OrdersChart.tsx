"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { MoreVertical } from "lucide-react";

// Order status data
const orderData = [
  { name: "Delivered", value: 1021, color: "var(--success)" },
  { name: "Accepted", value: 331, color: "var(--success)" },
  { name: "In The Way", value: 1221, color: "#00367D" },
  { name: "Return", value: 881, color: "var(--error)" },
  { name: "Pending", value: 521, color: "var(--warning)" },
  { name: "InProgress", value: 721, color: "var(--primary)" },
];

// Calculate total orders
const totalOrders = orderData.reduce((sum, item) => sum + item.value, 0);

interface OrderStatusItemProps {
  name: string;
  value: number;
  color: string;
}

function OrderStatusItem({ name, value, color }: OrderStatusItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium text-content-primary">{name}</span>
      </div>
      <span className="text-sm font-semibold text-content-primary">{value}</span>
    </div>
  );
}

export function OrdersChart() {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-divider h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-content-primary">Orders</h2>
        <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-content-tertiary" />
        </button>
      </div>

      {/* Donut Chart */}
      <div className="relative mb-8">
        <ResponsiveContainer width="100%" height={252}>
          <PieChart>
            <Pie
              data={orderData}
              cx="50%"
              cy="50%"
              innerRadius={110}
              outerRadius={122}
              dataKey="value"
              strokeWidth={0}
            >
              {orderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <div className="text-xl text-content-primary">
              {totalOrders}
            </div>
            <div className="text-sm text-content-secondary mt-1">
              Order
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-4">
        {orderData.map((item) => (
          <OrderStatusItem
            key={item.name}
            name={item.name}
            value={item.value}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
}
