"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import UniTable from "@/components/shared/UniTable"
import { actionCell } from "./SettingsCommon"

// Mock Data
const priceKmData = [
  { id: "1", from: "0", to: "500", price: "50" }
]

const priceWasalData = [
  { id: "1", price: "50" }
]

// Column Definitions
const commonHeaderClass = "border-r border-divider px-4"
const commonCellClass = "border-r border-divider px-4 h-full"

const priceKmColumns = [
  { id: "from", header: "From", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.from}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "to", header: "To", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.to}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "price", header: "Price", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.price}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "actions", header: "Action", cell: actionCell, className: "justify-center px-4", headerClassName: "justify-center px-4" }
]

const priceWasalColumns = [
  { id: "id", header: "ID", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.id}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "price", header: "Price", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.price}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "actions", header: "Action", cell: actionCell, className: "justify-center px-4", headerClassName: "justify-center px-4" }
]

interface PriceViewProps {
  activeSubTab: string
  onTabChange: (id: string) => void
}

export function PriceView({ activeSubTab, onTabChange }: PriceViewProps) {

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-fit items-center gap-1 rounded-xl border border-divider p-1">
        {[
          { id: "km", label: "Price km" },
          { id: "wasal", label: "Price wasal" }
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => onTabChange(p.id)}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap",
              activeSubTab === p.id ? "bg-secondary text-primary" : "text-content-tertiary hover:bg-gray-50"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-[24px] border border-divider overflow-hidden">
        {activeSubTab === "km" ? (
          <UniTable columns={priceKmColumns} data={priceKmData} />
        ) : (
          <UniTable columns={priceWasalColumns} data={priceWasalData} />
        )}
      </div>
    </div>
  )
}
