"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data based on the Weekly Activity image
const weeklyData = [
  { day: "Sat", profits: 480, orders: 240 },
  { day: "Sun", profits: 350, orders: 120 },
  { day: "Mon", profits: 330, orders: 260 },
  { day: "Tue", profits: 480, orders: 370 },
  { day: "Wed", profits: 150, orders: 240 },
  { day: "Thu", profits: 390, orders: 240 },
  { day: "Fri", profits: 390, orders: 340 },
];

export function RevenueOverall() {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">
        Weekly Activity
      </h2>
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-divider">
        <div className="w-full">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={weeklyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barGap={8}
            >
              <CartesianGrid 
                strokeDasharray="0" 
                vertical={false} 
                stroke="#F5F5F5"
              />
              <Legend 
                verticalAlign="top" 
                align="right" 
                height={50}
                iconType="circle"
                iconSize={10}
                formatter={(value) => <span className="text-sm font-medium text-primary ml-2">{value}</span>}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 14, fontWeight: 400 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 14, fontWeight: 400 }}
                dx={-10}
                domain={[0, 500]}
                ticks={[0, 100, 200, 300, 400, 500]}
              />
              
              <Bar
                name="Orders"
                dataKey="orders"
                fill="#E5E7EB"
                radius={[50, 50, 50, 50]}
                barSize={16}
              />
              <Bar
                name="Profits"
                dataKey="profits"
                fill="var(--primary)"
                radius={[50, 50, 50, 50]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
