export interface AppSettings {
  shippingCost: number;
  taxRate: number;
  freeShippingThreshold: number;
  currency: string;
  contactEmail: string;
  contactPhone: string;
  facebookLink: string;
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  data: {
    settings: AppSettings;
  };
}
