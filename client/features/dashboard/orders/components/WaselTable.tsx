"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import UniTable, { 
  ProductCell, 
  ActionCell, 
  ActionButton, 
  Trash2, 
  Pencil,
  Eye,
  SelectionHeader,
  SelectionCell
} from "@/components/shared/UniTable"
import { cn } from "@/lib/utils"
// import { EditOrderTemplate } from "../templats/EditOrderTemplate"
import React from "react"

interface WaselOrder {
  id: string;
  productName: string;
  otherProducts: string;
  productImage: string;
  date: string;
  recipientsLocation: string;
  status: string;
  selected: boolean;
}

// Mock data for Wasel Elkhaer
const waselData = [
  {
    id: "302012",
    productName: "Handmade Pouch",
    otherProducts: "+3 Products",
    productImage: "",
    date: "29 Dec 2022",
    recipientsLocation: "John Bushmill",
    status: "Processing",
    selected: true,
  },
  {
    id: "302011",
    productName: "Smartwatch E2",
    otherProducts: "+3 Products",
    productImage: "",
    date: "24 Dec 2022",
    recipientsLocation: "Linda Blair",
    status: "Delivered",
    selected: true,
  },
  {
    id: "302002",
    productName: "Smartwatch E1",
    otherProducts: "+3 Products",
    productImage: "",
    date: "12 Dec 2022",
    recipientsLocation: "M Karim",
    status: "Returned",
    selected: false,
  },
  {
    id: "301901",
    productName: "Headphone G1 Pro",
    otherProducts: "+3 Products",
    productImage: "",
    date: "21 Oct 2022",
    recipientsLocation: "Rajesh Masvidal",
    status: "Returned",
    selected: false,
  },
  {
    id: "301900",
    productName: "Iphone X",
    otherProducts: "+3 Products",
    productImage: "",
    date: "21 Oct 2022",
    recipientsLocation: "Laura Prichet",
    status: "Returned",
    selected: false,
  },
]

export function WaselTable() {
  const [editingOrder, setEditingOrder] = React.useState<WaselOrder | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  const handleEdit = (order: WaselOrder) => {
    setEditingOrder(order)
    setIsEditOpen(true)
  }

  const columns = [
    {
      id: "id",
      header: (props: { table: { getIsAllPageRowsSelected: () => boolean; getIsSomePageRowsSelected: () => boolean; toggleAllPageRowsSelected: (val: boolean) => void } }) => (
        <SelectionHeader 
          label="Order ID" 
          checked={props.table.getIsAllPageRowsSelected()}
          indeterminate={props.table.getIsSomePageRowsSelected()}
          onChange={(val) => props.table.toggleAllPageRowsSelected(val)}
        />
      ),
      cell: (_: unknown, row: WaselOrder, props: { row: { getIsSelected: () => boolean; toggleSelected: (val: boolean) => void } }) => (
        <SelectionCell 
          checked={props.row.getIsSelected()} 
          onChange={(val) => props.row.toggleSelected(val)}
          id={row.id} 
        />
      ),
    },
    {
      id: "product",
      header: "Product",
      cell: (_: unknown, row: WaselOrder) => (
        <ProductCell
          title={row.productName}
          subtitle={row.otherProducts}
          image={row.productImage}
        />
      ),
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      className: "text-content-secondary",
    },
    {
      id: "recipientsLocation",
      header: "Recipients Location",
      accessorKey: "recipientsLocation",
      className: "font-medium text-content-primary",
    },
    {
      id: "status",
      header: "Status",
      cell: (_: unknown, row: WaselOrder) => {
        const statusColors: Record<string, string> = {
          Processing: "bg-purple-100 text-purple-600",
          Delivered: "bg-green-100 text-green-600",
          Returned: "bg-red-100 text-red-600",
        }
        return (
          <Badge className={cn(
            "border-none px-3 py-1 rounded-lg font-medium shadow-none",
            statusColors[row.status] || "bg-gray-100 text-gray-600"
          )}>
            {row.status}
          </Badge>
        )
      },
    },
    {
      id: "action",
      header: "Action",
      className: "flex justify-center gap-2",
      headerClassName: "flex justify-center",
      cell: (_: unknown, row: WaselOrder) => {
        const router = useRouter()
        return (
          <ActionCell>
            <ActionButton 
              icon={Eye} 
              onClick={() => router.push(`/orders/${row.id}`)} 
            />
            <ActionButton 
              icon={Pencil} 
              onClick={() => handleEdit(row)} 
            />
            <ActionButton 
              icon={Trash2} 
              variant="danger" 
              onClick={() => console.log("Delete")} 
            />
          </ActionCell>
        )
      },
    },
  ]

  return (
    <>
      <UniTable 
        data={waselData}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        itemLabel="Orders"
        showSelection={true}
      />
      {/* <EditOrderTemplate 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        orderData={editingOrder} 
      /> */}
    </>
  )
}
