import type { DeliveryStatItem } from "../types/delivery-template.types";

export const DELIVERY_STATS: DeliveryStatItem[] = [
  { id: "speed", valueKey: "stat_speed_value", labelKey: "stat_speed_label" },
  { id: "free", valueKey: "stat_free_value", labelKey: "stat_free_label" },
  { id: "insured", valueKey: "stat_insured_value", labelKey: "stat_insured_label" },
];
