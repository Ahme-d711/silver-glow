"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, CartesianGrid } from "recharts";

const data = [
  { name: "Fayoum", value: 17000, color: "#45516B" },
  { name: "Giza", value: 30000, color: "#CBD2DC" },
  { name: "Cairo", value: 21000, color: "#000000" },
  { name: "Suis", value: 33000, color: "#6F7895" },
  { name: "Alex", value: 12000, color: "#192C56" },
  { name: "Sohag", value: 26000, color: "#A0AEC0" },
];

export function TrafficByGovernmentChart() {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-divider h-full">
      <h3 className="text-lg font-bold text-black mb-8">Traffic by Government</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
            barSize={32}
          >
           {/* No grid lines visible in design except maybe faint ones? keeping it clean */}
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#6B7280", fontSize: 13 }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              ticks={[0, 10000, 20000, 30000]}
              tickFormatter={(value) => value === 0 ? "0" : `${value / 1000}K`}
              dx={-10}
            />
            <Bar dataKey="value" radius={[16, 16, 16, 16]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
