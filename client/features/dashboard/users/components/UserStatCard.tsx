"use client"

import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserStatCardProps {
  title: string
  value: string
  trend: {
    value: string
    isUp: boolean
    sub: string
  }
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export function UserStatCard({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  iconBg, 
  iconColor 
}: UserStatCardProps) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-divider flex justify-between items-start">
      <div className="space-y-2">
        <h4 className="text-content-secondary">{title}</h4>
        <div className="space-y-1">
          <span className="text-2xl font-bold text-content-primary">{value}</span>
          <div className="flex items-center gap-2">
            <div className={cn("flex items-center text-sm font-bold", trend.isUp ? "text-green-600" : "text-red-600")}>
              <span>{trend.value}</span>
              {trend.isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            </div>
            <span className="text-sm text-content-tertiary font-medium">{trend.sub}</span>
          </div>
        </div>
      </div>
      <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", iconBg)}>
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
    </div>
  )
}
