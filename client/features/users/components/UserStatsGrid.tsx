"use client"

import { ShoppingCart, Wallet } from "lucide-react"
import { UserStatCard } from "./UserStatCard"

interface UserStatsGridProps {
  totalOrders: string
  totalBalance: string
  orderTrend: { value: string; isUp: boolean; sub: string }
  balanceTrend: { value: string; isUp: boolean; sub: string }
}

export function UserStatsGrid({
  totalOrders,
  totalBalance,
  orderTrend,
  balanceTrend,
}: UserStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UserStatCard
        title="Total Orders"
        value={totalOrders}
        trend={orderTrend}
        icon={ShoppingCart}
        iconBg="bg-orange-50"
        iconColor="text-orange-500"
      />
      <UserStatCard
        title="Total Balance"
        value={totalBalance}
        trend={balanceTrend}
        icon={Wallet}
        iconBg="bg-purple-50"
        iconColor="text-primary"
      />
    </div>
  )
}
