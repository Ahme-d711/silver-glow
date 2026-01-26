import { 
  Calendar, 
  CreditCard, 
  ShoppingBag, 
  User, 
  Smartphone, 
  FileText,
  LucideIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Order } from "../types"

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="h-5 w-5 text-content-tertiary" />
        </div>
        <span className="text-content-secondary">{label}</span>
      </div>
      <div className="text-content-primary font-medium">{value}</div>
    </div>
  )
}

interface MockOrder {
  id: string;
  status: string;
  date: string;
  payment_method: string;
  order_type: string;
  customer: string;
  recipient_phone: string;
  billing_address: string;
  shipping_address: string;
}

export function OrderDetailCards({ data }: { data: MockOrder | Order }) {
  if (!data) return null;

  // Type guard or simple cast for mock vs real data 
  // Since the component currently relies on mock properties, we cast to any internally but keep prop strict
  const d = data as any; 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Order Info Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Order #{d.id || d._id}</CardTitle>
            <Badge className="bg-primary text-white border-none shadow-none px-3 py-1 rounded-lg">
              {d.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow icon={Calendar} label="Added" value={d.date || d.createdAt} />
          <InfoRow icon={CreditCard} label="Payment Method" value={d.payment_method || d.paymentMethod} />
          <InfoRow icon={ShoppingBag} label="Type" value={d.order_type || "Standard"} />
        </CardContent>
      </Card>

      {/* Customer Info Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Customer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow icon={User} label="Customer" value={d.customer || d.recipientName} />
          <InfoRow icon={Smartphone} label="Phone" value={d.recipient_phone || d.recipientPhone} />
        </CardContent>
      </Card>

      {/* Document Info Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Document</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow 
            icon={FileText} 
            label="Invoice" 
            value={
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg px-6 h-9">
                Show
              </Button>
            } 
          />
        </CardContent>
      </Card>
    </div>
  )
}
