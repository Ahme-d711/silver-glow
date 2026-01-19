"use client"

import Image from "next/image"
import { LucideIcon, User, MapPin, Phone, ShoppingCart, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserInfoSidebarProps {
  user: {
    id: string
    name: string
    status: string
    address: string
    phone: string
    lastTransaction: string
    lastOnline: string
    profileImage?: string
    isBlocked?: boolean
    isActive?: boolean
  }
  onBlockToggle?: () => void
  onDelete?: () => void
  disableActions?: boolean
}

export function UserInfoSidebar({
  user,
  onBlockToggle,
  onDelete,
  disableActions,
}: UserInfoSidebarProps) {
  return (
    <div className="bg-white rounded-[32px] border border-divider overflow-hidden flex flex-col items-center p-6 pb-8 relative">
      <div className="absolute top-0 left-0 right-0 h-37 w-full">
        <Image 
          src="/customer-bg.svg" 
          alt="User Background" 
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative mt-8 mb-4">
        <Avatar className="h-37 w-37 border-4 border-white shadow-xl bg-gray-100">
          {user.profileImage && (
            <AvatarImage src={user.profileImage} alt={user.name} className="object-cover" />
          )}
          <AvatarFallback className="bg-gray-100 text-3xl font-bold uppercase">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <h2 className="text-xl font-semibold text-content-primary mb-1">{user.name}</h2>
      <Badge 
        className={`text-sm border-none px-4 py-1 rounded-xl mb-8 shadow-none ${
          user.status === "Active" 
            ? "bg-green-100/50 text-green-600 hover:bg-green-100/50" 
            : "bg-red-100/50 text-red-600 hover:bg-red-100/50"
        }`}
      >
        {user.status}
      </Badge>

      <div className="w-full space-y-6 border-t border-divider pt-8">
        <DetailItem icon={User} label="User ID" value={user.id.slice(0,6)} />
        <DetailItem icon={MapPin} label="Address" value={user.address} />
        <DetailItem icon={Phone} label="Phone Number" value={user.phone} />
        <DetailItem icon={ShoppingCart} label="Last Transaction" value={user.lastTransaction} />
        <DetailItem icon={Clock} label="Last Online" value={user.lastOnline} />
      </div>

      <div className="w-full pt-8 space-y-3">
        <Button
          variant="destructive"
          className="w-full bg-error hover:bg-error/80 cursor-pointer text-white rounded-xl h-12 font-semibold shadow-none"
          onClick={onBlockToggle}
          disabled={disableActions}
        >
          {user.isBlocked ? "Unblock User" : "Block User"}
        </Button>
        <Button
          variant="destructive"
          className="w-full bg-error hover:bg-error/80 cursor-pointer text-white rounded-xl h-12 font-semibold shadow-none"
          onClick={onDelete}
          disabled={disableActions}
        >
          {user.isActive === false ? "Activate User" : "Delete User"}
        </Button>
      </div>
    </div>
  )
}

function DetailItem({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="h-10 w-10 shrink-0 rounded-full bg-divider flex items-center justify-center text-content-tertiary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <p className="text-base text-content-secondary opacity-60">{label}</p>
        <p className="text-base text-content-primary font-medium leading-snug">{value}</p>
      </div>
    </div>
  )
}
