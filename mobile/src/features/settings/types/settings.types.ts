export interface AppSettings {
  shippingCost: number;
  taxRate: number;
  freeShippingThreshold: number;
  currency: string;
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  data: {
    settings: AppSettings;
  };
}
