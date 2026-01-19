"use client"

import React from "react"
import { RecentOrdersTable } from "./RecentOrdersTable"
import { CustomerGrowth } from "./CustomerGrowth"

export function HomeBottomSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <RecentOrdersTable />
      </div>
      <div className="lg:col-span-1">
        <CustomerGrowth />
      </div>
    </div>
  )
}
