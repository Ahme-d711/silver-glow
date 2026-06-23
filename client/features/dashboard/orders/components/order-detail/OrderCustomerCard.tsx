import { Smartphone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderDetailInfoRow } from "./OrderDetailInfoRow";

type OrderCustomerCardProps = {
  title: string;
  customerLabel: string;
  phoneLabel: string;
  customer: string;
  phone: string;
};

export function OrderCustomerCard({
  title,
  customerLabel,
  phoneLabel,
  customer,
  phone,
}: OrderCustomerCardProps) {
  return (
    <Card className="rounded-[24px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <OrderDetailInfoRow icon={User} label={customerLabel} value={customer} />
        <OrderDetailInfoRow icon={Smartphone} label={phoneLabel} value={phone} />
      </CardContent>
    </Card>
  );
}
