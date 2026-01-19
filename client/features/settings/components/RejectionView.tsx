"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import UniTable from "@/components/shared/UniTable"
import { actionCell } from "./SettingsCommon"

// Mock Data
const driverRejectionData = [
  { id: "1", arabic: "سبب رفض استلام السائق", english: "The reason for refusing to receive the driver" }
]

const addresseeRejectionData = [
  { id: "1", arabic: "سبب رفض استلام السائق", english: "The reason for refusing to receive the driver" } // Keep mock consistent with image
]

// Column Definitions
const commonHeaderClass = "border-r border-divider px-4"
const commonCellClass = "border-r border-divider px-4 h-full"

const rejectionColumns = [
  { id: "arabic", header: "Reason for rejection Arabic", cell: (_: any, row: any) => <span className="text-content-secondary px-4 w-full">{row.arabic}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "english", header: "Reason for rejection English", cell: (_: any, row: any) => <span className="text-content-secondary px-4 w-full">{row.english}</span>, className: commonCellClass, headerClassName: commonHeaderClass },
  { id: "actions", header: "Action", cell: actionCell, className: "justify-center px-4", headerClassName: "justify-center px-4" }
]

interface RejectionViewProps {
  activeSubTab: string
  onTabChange: (id: string) => void
}

export function RejectionView({ activeSubTab, onTabChange }: RejectionViewProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex w-fit items-center gap-1 rounded-xl border border-divider p-1">
        {[
          { id: "driver", label: "The reason for refusing to receive the driver" },
          { id: "addressee", label: "The reason for refusing to receive the addressee" }
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
        <UniTable 
          columns={rejectionColumns} 
          data={activeSubTab === "driver" ? driverRejectionData : addresseeRejectionData} 
        />
      </div>
    </div>
  )
}
