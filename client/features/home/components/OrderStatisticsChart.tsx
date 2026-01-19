"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Tahado", value: 30, color: "#192C56" },
  { name: "For Him", value: 35, color: "#3B4758" },
  { name: "For Her", value: 20, color: "#6F7895" },
  { name: "For You", value: 15, color: "#A0AEC0" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
      <tspan x={x} dy="-0.6em" fontSize="14">{`${(percent * 100).toFixed(0)}%`}</tspan>
      <tspan x={x} dy="1.4em" fontSize="11">{name}</tspan>
    </text>
  );
};

export function OrderStatisticsChart() {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-bold text-primary mb-6">Order statistics</h3>
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
         <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                stroke="#fff"
                strokeWidth={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
            </PieChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
}
