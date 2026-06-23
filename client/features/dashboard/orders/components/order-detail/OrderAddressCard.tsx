import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderAddressRow } from "./OrderAddressRow";

type OrderAddressCardProps = {
  title: string;
  billingLabel: string;
  shippingLabel: string;
  billingAddress: string;
  shippingAddress: string;
};

export function OrderAddressCard({
  title,
  billingLabel,
  shippingLabel,
  billingAddress,
  shippingAddress,
}: OrderAddressCardProps) {
  return (
    <Card className="rounded-[24px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <OrderAddressRow label={billingLabel} address={billingAddress} />
        <OrderAddressRow label={shippingLabel} address={shippingAddress} />
      </CardContent>
    </Card>
  );
}
