"use client"

import { useRouter } from "next/navigation"
import { MoreVertical } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CustomerCardProps {
  id: string
  name: string
  avatar?: string
  status: "Active" | "Blocked"
  orders: string
  balance: string
  selected?: boolean
  onSelect?: (id: string, selected: boolean) => void
}

export function CustomerCard({
  id,
  name,
  avatar,
  status,
  orders,
  balance,
  selected,
  onSelect,
}: CustomerCardProps) {
  const router = useRouter()

  return (
    <div 
      onClick={() => router.push(`/dashboard/users/${id}`)}
      className="bg-white rounded-[24px] border border-divider p-6 flex flex-col items-center relative group hover:shadow-md transition-shadow cursor-pointer"
    >
      <div 
        className="absolute top-4 left-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox 
          checked={selected} 
          onCheckedChange={(checked) => onSelect?.(id, !!checked)}
          className="h-5 w-5 rounded border-divider data-[state=checked]:bg-primary !data-[state=checked]:border-primary data-[state=checked]:text-white cursor-pointer"
        />
      </div>
      
      <button 
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-content-tertiary cursor-pointer z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      <Avatar className="h-20 w-20 mb-4 bg-gray-200">
        <AvatarImage src={avatar} className="object-cover" />
        <AvatarFallback className="bg-gray-200 text-content-tertiary text-xl font-bold uppercase">{name.charAt(0)}</AvatarFallback>
      </Avatar>

      <h3 className="font-semibold text-content-primary mb-1">{name}</h3>
      
      <Badge 
        className={cn(
          "px-3 py-1 rounded-xl text-sm border-none mb-6 shadow-none",
          status === "Active" 
            ? "bg-green-100/50 text-green-600 hover:bg-green-100/50" 
            : "bg-red-100/50 text-red-600 hover:bg-red-100/50"
        )}
      >
        {status}
      </Badge>

      <div className="w-full border-t border-dashed border-divider pt-6 flex justify-between px-2">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider mb-1 opacity-60">Orders</span>
          <span className="text-sm font-bold text-content-primary">{orders}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider mb-1 opacity-60">Balance</span>
          <span className="text-sm font-bold text-content-primary">{balance}</span>
        </div>
      </div>
    </div>
  )
}
