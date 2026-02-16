import { Schema, model, Document } from "mongoose";

export interface ISettings extends Document {
  shippingCost: number;
  taxRate: number; // Percentage
  freeShippingThreshold: number;
  currency: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    shippingCost: {
      type: Number,
      required: true,
      default: 50, // Default shipping cost
    },
    taxRate: {
      type: Number,
      required: true,
      default: 14, // Default tax rate (14%)
    },
    freeShippingThreshold: {
      type: Number,
      required: true,
      default: 1000, // Free shipping over 1000
    },
    currency: {
      type: String,
      required: true,
      default: "EGP",
    },
  },
  {
    timestamps: true,
  }
);

// We only need one settings document, so we can ensure it exists or create it
export const SettingsModel = model<ISettings>("settings", SettingsSchema);
