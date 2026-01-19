"use client"

import { Trash2, Pencil } from "lucide-react"

export function ContactUsView() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-content-primary">Watts Up</h3>
        <div className="flex items-center gap-2">
          <button className="p-2 text-error hover:bg-red-50 rounded-lg cursor-pointer">
            <Trash2 className="h-5 w-5" />
          </button>
          <button className="p-2 text-content-tertiary hover:bg-gray-50 rounded-lg cursor-pointer">
            <Pencil className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-6 rounded-[24px] border border-divider bg-white text-content-secondary text-base">
        +01260688021
      </div>
    </div>
  )
}
