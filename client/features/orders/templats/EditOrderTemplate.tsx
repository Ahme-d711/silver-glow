// "use client"

// import React from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { OrderForm } from "../components/OrderForm"

// interface EditOrderTemplateProps {
//   isOpen: boolean
//   onClose: () => void
//   orderData?: any
// }

// export function EditOrderTemplate({ isOpen, onClose, orderData }: EditOrderTemplateProps) {
//   const handleSubmit = (data: any) => {
//     console.log("Submit Edit Order:", data)
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent className="sm:max-w-[500px] border-none p-0 overflow-hidden bg-white rounded-3xl">
//         <div className="p-8 max-h-[90vh] overflow-y-auto no-scrollbar">
//           <DialogHeader className="mb-6">
//             <DialogTitle className="text-xl font-bold text-primary">
//               {orderData ? "Edit Order" : "Add Order"}
//             </DialogTitle>
//           </DialogHeader>
//           <OrderForm initialData={orderData} onSubmit={handleSubmit} />
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
