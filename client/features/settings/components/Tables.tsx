"use client"

import UniTable from "@/components/shared/UniTable"
import { Badge } from "@/components/ui/badge"
import { actionCell } from "./SettingsCommon"

// Mock Data
export const adminsData = [
  { id: "1", name: "Handmade Pouch", password: "01152136068", email: "elboray456@gmail.com" },
]

export const driversData = [
  { 
    id: "1234560", 
    image: "", 
    nameAr: "Handmade Pouch", 
    phone: "01152136068", 
    imageID: "452361", 
    type: "Car", 
    wallet: "19990", 
    status: "Processing" 
  },
]

export const shippingTermsData = [
  { id: "1", arabic: "Handmade Pouch", english: "01152136068" }
]

export const requestTypeData = [
  { id: "1", arabic: "ملابس", english: "Clothes" }
]

// Column Definitions
// Column Definitions
const adminColumns = [
  { id: "name", header: "Name", cell: (_: any, row: any) => <span className="text-content-secondary">{row.name}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "password", header: "Password", cell: (_: any, row: any) => <span className="text-content-secondary">{row.password}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "email", header: "Email", cell: (_: any, row: any) => <span className="text-content-secondary">{row.email}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "actions", header: "Action", cell: actionCell, className: "px-4", headerClassName: "px-4" }
]

const driverColumns = [
  { id: "image", header: "Image", cell: () => <div className="h-12 w-12 bg-gray-100 rounded-xl" />, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "nameAr", header: "Name Arabic", cell: (_: any, row: any) => <span className="text-content-secondary">{row.nameAr}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "phone", header: "Phone", cell: (_: any, row: any) => <span className="text-content-secondary">{row.phone}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "id", header: "ID", cell: (_: any, row: any) => <span className="text-content-secondary">{row.id}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "imageID", header: "Image ID", cell: (_: any, row: any) => <span className="text-content-secondary">{row.imageID}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "type", header: "Type", cell: (_: any, row: any) => <span className="text-content-secondary">{row.type}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "wallet", header: "Wallet", cell: (_: any, row: any) => <span className="text-content-secondary">{row.wallet}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "status", header: "Status", cell: (_: any, row: any) => <Badge className="bg-purple-50 text-primary border-none font-bold px-4 py-1.5 rounded-xl">{row.status}</Badge>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "actions", header: "Action", cell: actionCell, className: "px-4", headerClassName: "px-4" }
]

const shippingColumns = [
  { id: "arabic", header: "Shipping Terms arabic", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.arabic}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "english", header: "Shipping Terms English", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.english}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "actions", header: "Action", cell: actionCell, className: "px-4", headerClassName: "px-4" }
]

const requestTypeColumns = [
  { id: "arabic", header: "Type Order Arabic", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.arabic}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "english", header: "Type Order English", cell: (_: any, row: any) => <span className="text-content-secondary w-full">{row.english}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "actions", header: "Action", cell: actionCell, className: "px-4", headerClassName: "px-4" }
]

// Components
export function AdminsTable() {
  return <UniTable columns={adminColumns} data={adminsData} />
}

export function DriversTable() {
  return <UniTable columns={driverColumns} data={driversData} />
}

export function ShippingTermsTable() {
  return <UniTable columns={shippingColumns} data={shippingTermsData} />
}

export function RequestTypeTable() {
  return <UniTable columns={requestTypeColumns} data={requestTypeData} />
}
