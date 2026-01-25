"use client"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrdersSubTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function OrdersSubTabs({ activeTab, setActiveTab }: OrdersSubTabsProps) {
  return (
    <div className="p-6 pb-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
        <TabsList className="bg-background p-1.5 rounded-2xl h-auto gap-4">
          <TabsTrigger
            value="orders"
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all border-none shadow-none data-[state=active]:bg-secondary data-[state=active]:text-primary text-content-tertiary hover:bg-gray-50 cursor-pointer"
            )}
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="wasel"
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all border-none shadow-none data-[state=active]:bg-secondary data-[state=active]:text-primary text-content-tertiary hover:bg-gray-50 cursor-pointer"
            )}
          >
            Wasel Elkhaer
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
