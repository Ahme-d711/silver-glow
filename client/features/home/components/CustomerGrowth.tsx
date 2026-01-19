"use client";

import React from "react";
import { MoreVertical, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues with Leaflet
const EgyptMap = dynamic(() => import("./EgyptMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-gray-50 animate-pulse flex items-center justify-center rounded-xl">
      <span className="text-content-tertiary text-sm italic">Loading map...</span>
    </div>
  )
});

interface GovernorateData {
  name: string;
  customers: string;
  percentage: number;
  color: string;
  coords: [number, number];
}

const governorateData: GovernorateData[] = [
  { name: "Cairo", customers: "1,240 Customers", percentage: 60, color: "bg-[#F86624]", coords: [30.0444, 31.2357] },
  { name: "Giza", customers: "1,240 Customers", percentage: 100, color: "bg-primary", coords: [30.0131, 31.2089] },
  { name: "Fayoum", customers: "1,240 Customers", percentage: 80, color: "bg-success", coords: [29.3081, 30.8428] },
  { name: "Maadi", customers: "1,240 Customers", percentage: 49, color: "bg-warning", coords: [29.9575, 31.2588] },
  { name: "Matorh", customers: "1,240 Customers", percentage: 50, color: "bg-error", coords: [31.3543, 27.2373] },
];

export function CustomerGrowth() {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-divider flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-content-primary">Customer Growth</h3>
          <p className="text-sm text-content-tertiary">Based on governorate</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-content-tertiary hover:bg-gray-50">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Map Section */}
      <div className="relative flex-1 mb-8 min-h-[180px]">
        <EgyptMap data={governorateData} />
      </div>

      {/* Governorate List */}
      <div className="space-y-4">
        {governorateData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-content-primary/20 shrink-0 flex items-center justify-center font-bold text-primary group-hover:bg-primary transition-colors">
              {item.name.charAt(0)}
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-start mb-1.5">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-content-primary leading-tight">{item.name}</span>
                    <span className="text-[11px] font-medium text-content-tertiary mt-0.5">{item.customers}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 justify-end ml-4">
                     <div className="relative w-full max-w-[100px] h-2 bg-divider rounded-full overflow-hidden">
                        <div 
                           className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-1000", item.color)} 
                           style={{ width: `${item.percentage}%` }}
                        />
                     </div>
                     <span className="text-xs font-bold text-content-tertiary w-8 text-right">{item.percentage}%</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

