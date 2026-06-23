import { Calendar, CreditCard, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderDetailInfoRow } from "./OrderDetailInfoRow";

type OrderSummaryCardProps = {
  orderNumber: string;
  statusLabel: string;
  date: string;
  paymentMethod: string;
  orderType: string;
  addedLabel: string;
  paymentMethodLabel: string;
  typeLabel: string;
};

export function OrderSummaryCard({
  orderNumber,
  statusLabel,
  date,
  paymentMethod,
  orderType,
  addedLabel,
  paymentMethodLabel,
  typeLabel,
}: OrderSummaryCardProps) {
  return (
    <Card className="rounded-[24px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{orderNumber}</CardTitle>
          <Badge className="bg-primary text-white px-3 py-1 rounded-lg">
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <OrderDetailInfoRow icon={Calendar} label={addedLabel} value={date} />
        <OrderDetailInfoRow icon={CreditCard} label={paymentMethodLabel} value={paymentMethod} />
        <OrderDetailInfoRow icon={ShoppingBag} label={typeLabel} value={orderType} />
      </CardContent>
    </Card>
  );
}
