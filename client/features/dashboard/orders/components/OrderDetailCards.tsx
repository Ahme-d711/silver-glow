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
import { useTranslations, useLocale } from "next-intl"

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

import { format } from "date-fns"

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

export function OrderDetailCards({ data }: { data: Order }) {
  const t = useTranslations("Orders");
  const locale = useLocale();
  if (!data) return null;

  const id = data._id;
  const status = data.status;
  const date = data.createdAt ? format(new Date(data.createdAt), "dd MMM yyyy") : "N/A";
  const paymentMethod = data.paymentMethod ? t(`payment_${data.paymentMethod.toLowerCase()}` as Parameters<typeof t>[0]) : "N/A";
  const orderType = t("standard");
  const customer = typeof data.userId === 'object' && data.userId?.name ? data.userId.name : data.recipientName;
  const phone = data.recipientPhone;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Order Info Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{t("order_number", { id: id.slice(-6).toUpperCase() })}</CardTitle>
            <Badge className="bg-primary text-white border-none shadow-none px-3 py-1 rounded-lg">
              {t(status.toLowerCase() as Parameters<typeof t>[0])}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow icon={Calendar} label={t("added")} value={date} />
          <InfoRow icon={CreditCard} label={t("payment_method")} value={paymentMethod} />
          <InfoRow icon={ShoppingBag} label={t("type")} value={orderType} />
        </CardContent>
      </Card>

      {/* Customer Info Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">{t("customer")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow icon={User} label={t("customer")} value={customer} />
          <InfoRow icon={Smartphone} label={t("phone") || "Phone"} value={phone} />
        </CardContent>
      </Card>

      {/* Document Info Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">{t("document")}</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow 
            icon={FileText} 
            label={t("invoice")} 
            value={
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg px-6 h-9">
                {t("show")}
              </Button>
            } 
          />
        </CardContent>
      </Card>
    </div>
  )
}
