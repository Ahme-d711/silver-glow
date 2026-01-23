import { Document, Types } from "mongoose";

export type OrderStatus = 
  | "CREATED" 
  | "PENDING" 
  | "ACCEPTED" 
  | "IN_PROGRESS" 
  | "IN_THE_WAY" 
  | "RETURN" 
  | "DELIVERED";

export type OrderType = 
  | "CLOTHES" 
  | "ELECTRONICS" 
  | "DOCUMENTS"
  | "FOOD"
  | "FRAGILE"
  | "OTHER";

export interface IOrder extends Document {
  userId: Types.ObjectId;
  driverId: Types.ObjectId | null;
  pickupLatitude: number;
  pickupLongitude: number;
  pickupAddress: string;
  recipientLatitude: number;
  recipientLongitude: number;
  recipientAddress: string;
  recipientName: string;
  recipientPhone: string;
  orderType: OrderType;
  insuranceValue: number;
  deliveryCost: number;
  pictureUrl: string | null;
  additionalNotes: string | null;
  collectionDate: string;
  collectionTime: string;
  anyTime: boolean;
  allowInspection: boolean;
  receiverPaysShipping: boolean;
  status: OrderStatus;
  trackingNumber: string | null;
  distanceKm: number;
  pickupConfirmed: boolean;
  deliveryConfirmed: boolean;
  confirmedAt: Date | null;
  pickedUpAt: Date | null;
  deliveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
