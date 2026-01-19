"use client"

import { Trash2, Pencil } from "lucide-react"

export const actionCell = () => (
  <div className="flex items-center gap-2 w-full">
    <button className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer">
      <Trash2 className="h-5 w-5" />
    </button>
    <button className="p-2 text-content-tertiary hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <Pencil className="h-5 w-5" />
    </button>
  </div>
)
