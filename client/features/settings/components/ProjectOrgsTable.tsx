"use client"

import UniTable from "@/components/shared/UniTable"
import { actionCell } from "./SettingsCommon"

export const orgsData = [
  { 
    id: "1", 
    image: "", 
    nameAr: "Handmade Pouch", 
    nameEn: "Handmade Pouch", 
    detailsAr: "Handmade Pouch", 
    detailsEn: "Handmade Pouch", 
    phone: "01152136068", 
    address: "elboray456@gmail.com" 
  },
]

const orgColumns = [
  { id: "image", header: "Image", cell: () => <div className="h-12 w-12 bg-gray-100 rounded-xl mx-auto" />, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "nameAr", header: "Name Arabic", cell: (_: any, row: any) => <span className="text-content-secondary">{row.nameAr}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "nameEn", header: "Name English", cell: (_: any, row: any) => <span className="text-content-secondary">{row.nameEn}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "detailsAr", header: "Details Arabic", cell: (_: any, row: any) => <span className="text-content-secondary">{row.detailsAr}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "detailsEn", header: "Details English", cell: (_: any, row: any) => <span className="text-content-secondary">{row.detailsEn}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "phone", header: "Phone", cell: (_: any, row: any) => <span className="text-content-secondary">{row.phone}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "address", header: "Address", cell: (_: any, row: any) => <span className="text-content-secondary leading-tight">{row.address}</span>, className: "border-r border-divider px-4 h-full", headerClassName: "border-r border-divider px-4" },
  { id: "actions", header: "Action", cell: actionCell, className: "justify-center px-4", headerClassName: "justify-center px-4" }
]

export function ProjectOrgsTable() {
  return <UniTable columns={orgColumns} data={orgsData} />
}
