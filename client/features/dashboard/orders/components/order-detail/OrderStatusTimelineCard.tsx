import {
  BadgeCheck,
  CheckCircle,
  CheckCircle2,
  Clock,
  PackageX,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderStatus } from "../../types";
import { OrderStatusStep } from "./OrderStatusStep";
import {
  getTimelineProgressIndex,
  getTimelineStepState,
  isTimelineConnectorActive,
} from "./orderTimeline.utils";

type OrderStatusTimelineCardProps = {
  title: string;
  status: OrderStatus;
  orderDate: string;
  updatedDate: string;
  shippedDate: string;
  deliveredDate: string;
  hasShippedAt: boolean;
  hasDeliveredAt: boolean;
  pendingDatePlaceholder: string;
};

export function OrderStatusTimelineCard({
  title,
  status,
  orderDate,
  updatedDate,
  shippedDate,
  deliveredDate,
  hasShippedAt,
  hasDeliveredAt,
  pendingDatePlaceholder,
}: OrderStatusTimelineCardProps) {
  const t = useTranslations("Orders");
  const progressIndex = getTimelineProgressIndex(status, {
    shippedAt: hasShippedAt ? shippedDate : undefined,
    deliveredAt: hasDeliveredAt ? deliveredDate : undefined,
  });

  const steps = [
    {
      icon: CheckCircle2,
      title: t("order_placed"),
      description: t("order_placed_desc"),
      getDate: (stepState: "completed" | "current" | "pending") =>
        stepState === "pending" ? pendingDatePlaceholder : orderDate,
      tone: "default" as const,
    },
    {
      icon: BadgeCheck,
      title: t("confirmed"),
      description: t("confirmed_desc"),
      getDate: (stepState: "completed" | "current" | "pending") =>
        stepState === "pending" ? pendingDatePlaceholder : updatedDate,
      tone: "default" as const,
    },
    {
      icon: Clock,
      title: t("processing"),
      description: t("processing_desc"),
      getDate: (stepState: "completed" | "current" | "pending") =>
        stepState === "pending" ? pendingDatePlaceholder : updatedDate,
      tone: "default" as const,
    },
    {
      icon: Truck,
      title: t("shipped"),
      description: hasShippedAt ? t("on_the_way") : t("pending_shipping"),
      getDate: (stepState: "completed" | "current" | "pending") =>
        stepState === "pending" ? pendingDatePlaceholder : shippedDate,
      tone: "default" as const,
    },
    {
      icon: CheckCircle,
      title: t("delivered"),
      description: hasDeliveredAt ? t("has_been_delivered") : t("pending_delivery"),
      getDate: (stepState: "completed" | "current" | "pending") =>
        stepState === "pending" ? pendingDatePlaceholder : deliveredDate,
      tone: "default" as const,
    },
    {
      icon: RotateCcw,
      title: t("returned"),
      description: t("returned_desc"),
      getDate: (stepState: "completed" | "current" | "pending") =>
        stepState === "pending" ? pendingDatePlaceholder : updatedDate,
      tone: "default" as const,
    },
    {
      icon: status === "CANCELLED" ? XCircle : PackageX,
      title: t("cancelled"),
      description: t("cancelled_desc"),
      getDate: (stepState: "completed" | "current" | "pending") =>
        stepState === "pending" ? pendingDatePlaceholder : updatedDate,
      tone: "danger" as const,
    },
  ];

  return (
    <Card className="rounded-[24px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {steps.map((step, index) => {
          const stepState = getTimelineStepState(index, status, progressIndex);
          const isLast = index === steps.length - 1;

          return (
            <OrderStatusStep
              key={step.title}
              icon={step.icon}
              stepState={stepState}
              title={step.title}
              description={step.description}
              date={step.getDate(stepState)}
              showConnector={!isLast}
              connectorActive={isTimelineConnectorActive(
                index,
                status,
                progressIndex,
              )}
              tone={step.tone}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
