"use client"

import { ShoppingCart, Wallet } from "lucide-react"
import { CustomerStatCard } from "./CustomerStatCard"

interface CustomerStatsGridProps {
  totalOrders: string
  totalBalance: string
  orderTrend: { value: string; isUp: boolean; sub: string }
  balanceTrend: { value: string; isUp: boolean; sub: string }
}

export function CustomerStatsGrid({
  totalOrders,
  totalBalance,
  orderTrend,
  balanceTrend,
}: CustomerStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CustomerStatCard
        title="Total Orders"
        value={totalOrders}
        trend={orderTrend}
        icon={ShoppingCart}
        iconBg="bg-orange-50"
        iconColor="text-orange-500"
      />
      <CustomerStatCard
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
