"use client"

import { ShoppingCart, Wallet } from "lucide-react"
import { UserStatCard } from "./UserStatCard"
import { useTranslations } from "next-intl"
import type { UserStatTrend } from "../types"

interface UserStatsGridProps {
  totalOrders: string
  totalBalance: string
  orderTrend: UserStatTrend
  balanceTrend: UserStatTrend
}

export function UserStatsGrid({
  totalOrders,
  totalBalance,
  orderTrend,
  balanceTrend,
}: UserStatsGridProps) {
  const t = useTranslations("Users")
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UserStatCard
        title={t("total_orders")}
        value={totalOrders}
        trend={orderTrend}
        icon={ShoppingCart}
        iconBg="bg-orange-50"
        iconColor="text-orange-500"
      />
      <UserStatCard
        title={t("total_balance")}
        value={totalBalance}
        trend={balanceTrend}
        icon={Wallet}
        iconBg="bg-purple-50"
        iconColor="text-primary"
      />
    </div>
  )
}
