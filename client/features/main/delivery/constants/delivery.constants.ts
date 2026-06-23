import type { DeliveryInfoItem, DeliveryRateRow } from "../types/delivery-template.types";

export const DELIVERY_RATE_ROWS: DeliveryRateRow[] = [
  {
    id: "cairo",
    areaKey: "cairo_area",
    rateKey: "cairo_rate",
    timeKey: "cairo_time",
  },
  {
    id: "alex",
    areaKey: "alex_area",
    rateKey: "alex_rate",
    timeKey: "alex_time",
  },
  {
    id: "delta",
    areaKey: "delta_area",
    rateKey: "delta_rate",
    timeKey: "delta_time",
  },
  {
    id: "free",
    areaKey: "free_label",
    rateKey: "free_rate",
    timeKey: "free_condition",
    highlight: true,
  },
];

export const DELIVERY_INFO_ITEMS: DeliveryInfoItem[] = [
  {
    id: "tracking",
    iconKey: "tracking",
    titleKey: "tracking_title",
    descriptionKey: "tracking_desc",
  },
  {
    id: "insurance",
    iconKey: "insurance",
    titleKey: "insurance_title",
    descriptionKey: "insurance_desc",
  },
];
