"use client"

import * as React from "react"
import { SlidersHorizontal } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StatusFilterProps {
  value: string
  onValueChange: (value: string) => void
  options?: { label: string; value: string }[]
  placeholder?: string
  className?: string
}

const defaultOptions = [
  { label: "All Orders", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
]

export function StatusFilter({
  value,
  onValueChange,
  options = defaultOptions,
  placeholder = "Filters",
  className,
}: StatusFilterProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={
          "rounded-xl border-divider text-content-secondary text-sm font-semibold gap-2 bg-white h-11 px-4 hover:bg-white focus:ring-0 focus:ring-offset-0 " +
          (className || "")
        }
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-content-tertiary" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-divider" align="end" position="popper" sideOffset={4}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
