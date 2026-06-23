export const SETTINGS_TABS = [
  { value: "shipping", labelKey: "shipping_and_tax" as const },
  { value: "contact", labelKey: "contact_info" as const },
  { value: "links", labelKey: "social_links" as const },
  { value: "terms", labelKey: "terms_conditions" as const },
  { value: "security", labelKey: "security" as const },
  { value: "phone", labelKey: "phone_settings" as const },
] as const;

export type SettingsTabValue = (typeof SETTINGS_TABS)[number]["value"];

export const SETTINGS_TABS_WITH_GLOBAL_SAVE: SettingsTabValue[] = [
  "shipping",
  "contact",
  "links",
  "terms",
];
