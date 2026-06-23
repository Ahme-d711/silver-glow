import type { OrderStatus } from "../../types";

export type TimelineStepState = "completed" | "current" | "pending";

export const ORDER_TIMELINE_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "RETURNED",
  "CANCELLED",
];

const STATUS_STEP_INDEX: Record<OrderStatus, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  PROCESSING: 2,
  SHIPPED: 3,
  DELIVERED: 4,
  RETURNED: 5,
  CANCELLED: 6,
};

type TimelineProgressInput = {
  shippedAt?: string;
  deliveredAt?: string;
};

export function getOrderTimelineStepIndex(status: OrderStatus): number {
  return STATUS_STEP_INDEX[status] ?? 0;
}

export function getMaxFulfilledStepIndex({
  shippedAt,
  deliveredAt,
}: TimelineProgressInput): number {
  if (deliveredAt) return 4;
  if (shippedAt) return 3;
  return 0;
}

export function getTimelineProgressIndex(
  status: OrderStatus,
  order: TimelineProgressInput,
): number {
  if (status === "CANCELLED") {
    return getMaxFulfilledStepIndex(order);
  }

  return getOrderTimelineStepIndex(status);
}

export function getTimelineStepState(
  stepIndex: number,
  status: OrderStatus,
  progressIndex: number,
): TimelineStepState {
  const currentIndex = getOrderTimelineStepIndex(status);

  if (status === "CANCELLED") {
    if (stepIndex === currentIndex) return "current";
    if (stepIndex <= progressIndex) return "completed";
    return "pending";
  }

  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "pending";
}

export function isTimelineConnectorActive(
  stepIndex: number,
  status: OrderStatus,
  progressIndex: number,
): boolean {
  if (status === "CANCELLED") {
    return stepIndex < progressIndex;
  }

  return stepIndex < progressIndex;
}
