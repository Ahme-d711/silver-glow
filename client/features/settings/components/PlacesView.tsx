"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import UniTable from "@/components/shared/UniTable"
import { actionCell } from "./SettingsCommon"
import { Eye, Trash2 } from "lucide-react"

// Mock Data
const governorateData = [
  { id: "1", arabic: "القاهره", english: "Cairo" }
]

const regionData = [
  { 
    id: "1", 
    arabic: "مساكن حلوان", 
    english: "masakin hulwan", 
    neighborhood: "helwan", 
    lat: "29.7989548", 
    long: "31.3119207" 
  }
]

const neighborhoodData = [
  { id: "1", arabic: "حلوان", english: "helwan", governorate: "Cairo" }
]

// Column Definitions
const commonHeaderClass = "border-r border-divider px-4"
const commonCellClass = "border-r border-divider px-4 h-full"

const governorateColumns = [
  { id: "arabic", header: "Governorate Arabic", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.arabic}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "english", header: "Governorate English", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.english}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "actions", header: "Action", cell: actionCell, className: "justify-center px-4", headerClassName: "justify-center px-4" }
]

const regionColumns = [
  { id: "arabic", header: "Region Arabic", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.arabic}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "english", header: "Region English", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.english}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "neighborhood", header: "Neighborhood", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.neighborhood}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "lat", header: "Lat", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.lat}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "long", header: "Long", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.long}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { 
    id: "actions", 
    header: "Action", 
    cell: () => (
      <div className="flex items-center gap-2 justify-center w-full">
        <button className="p-2 text-content-tertiary hover:bg-gray-50 rounded-lg cursor-pointer">
          <Eye className="h-5 w-5" />
        </button>
        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    ), 
    className: "justify-center px-4", 
    headerClassName: "justify-center px-4" 
  }
]

const neighborhoodColumns = [
  { id: "arabic", header: "Neighborhood Arabic", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.arabic}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "english", header: "Neighborhood English", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.english}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "governorate", header: "Governorate", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.governorate}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "actions", header: "Action", cell: actionCell, className: "justify-center px-4", headerClassName: "justify-center px-4" }
]

interface PlacesViewProps {
  activePlaceTab: string
  onTabChange: (id: string) => void
}

export function PlacesView({ activePlaceTab, onTabChange }: PlacesViewProps) {
  const renderTable = () => {
    switch (activePlaceTab) {
      case "governorate":
        return <UniTable columns={governorateColumns} data={governorateData} />
      case "region":
        return <UniTable columns={regionColumns} data={regionData} />
      case "neighborhood":
        return <UniTable columns={neighborhoodColumns} data={neighborhoodData} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-fit items-center gap-1 rounded-xl border border-divider p-1">
        {[
          { id: "governorate", label: "Governorate" },
          { id: "region", label: "Region" },
          { id: "neighborhood", label: "Neighborhood" }
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => onTabChange(p.id)}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer",
              activePlaceTab === p.id ? "bg-secondary text-primary" : "text-content-tertiary hover:bg-gray-50"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-[24px] border border-divider overflow-hidden">
        {renderTable()}
      </div>
    </div>
  )
}
