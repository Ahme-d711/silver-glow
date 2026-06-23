export interface DeliveryRateRow {
  id: string;
  areaKey: string;
  rateKey: string;
  timeKey: string;
  highlight?: boolean;
}

export interface DeliveryInfoItem {
  id: string;
  iconKey: "tracking" | "insurance";
  titleKey: string;
  descriptionKey: string;
}
