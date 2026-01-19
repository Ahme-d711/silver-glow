"use client"

import { cn } from "@/lib/utils"

export const tabs = [
  { id: "admins", label: "Admins" },
  { id: "project_organizations", label: "Project Organizations" },
  { id: "drivers", label: "Drivers" },
  { id: "terms", label: "Terms and Conditions" },
  { id: "shipping", label: "Shipping Terms" },
  { id: "request_type", label: "Request type" },
  { id: "places", label: "Places" },
  { id: "rejection", label: "Reason for rejection" },
  { id: "price", label: "Price" },
  { id: "contact", label: "Contact Us" },
  { id: "passwords", label: "Passwords" },
]

interface TabsHeaderProps {
  activeTab: string
  onTabChange: (id: string) => void
}

export function TabsHeader({ activeTab, onTabChange }: TabsHeaderProps) {
  return (
    <div className="bg-white rounded-[16px] border border-divider p-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap",
              activeTab === tab.id ? "bg-secondary text-primary" : "text-content-tertiary hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
