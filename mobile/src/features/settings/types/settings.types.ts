export interface AppSettings {
  shippingCost: number;
  taxRate: number;
  freeShippingThreshold: number;
  currency: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    platform: string;
    link: string;
  }[];
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  data: AppSettings;
}
