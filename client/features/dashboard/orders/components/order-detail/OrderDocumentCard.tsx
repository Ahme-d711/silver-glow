import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderDetailInfoRow } from "./OrderDetailInfoRow";

type OrderDocumentCardProps = {
  title: string;
  invoiceLabel: string;
  showLabel: string;
};

export function OrderDocumentCard({
  title,
  invoiceLabel,
  showLabel,
}: OrderDocumentCardProps) {
  return (
    <Card className="rounded-[24px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderDetailInfoRow
          icon={FileText}
          label={invoiceLabel}
          value={
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg px-6 h-9">
              {showLabel}
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
