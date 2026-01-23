import { Schema, model } from "mongoose";
import { IOrder } from "../types/order.type.js";

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
      default: null,
    },
    pickupLatitude: {
      type: Number,
      required: true,
    },
    pickupLongitude: {
      type: Number,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
      trim: true,
    },
    recipientLatitude: {
      type: Number,
      required: true,
    },
    recipientLongitude: {
      type: Number,
      required: true,
    },
    recipientAddress: {
      type: String,
      required: true,
      trim: true,
    },
    recipientName: {
      type: String,
      required: true,
      trim: true,
    },
    recipientPhone: {
      type: String,
      required: true,
      trim: true,
    },
    orderType: {
      type: String,
      enum: ["CLOTHES", "ELECTRONICS", "DOCUMENTS", "FOOD", "FRAGILE", "OTHER"],
      required: true,
    },
    insuranceValue: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryCost: {
      type: Number,
      required: true,
      default: 0,
    },
    pictureUrl: {
      type: String,
      required: false,
      default: null,
    },
    additionalNotes: {
      type: String,
      required: false,
      default: null,
    },
    collectionDate: {
      type: String,
      required: true,
    },
    collectionTime: {
      type: String,
      required: true,
    },
    anyTime: {
      type: Boolean,
      required: true,
      default: false,
    },
    allowInspection: {
      type: Boolean,
      required: true,
      default: true,
    },
    receiverPaysShipping: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: ["CREATED", "PENDING", "ACCEPTED", "IN_PROGRESS", "IN_THE_WAY", "RETURN", "DELIVERED"],
      default: "CREATED",
      required: true,
    },
    trackingNumber: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      default: null,
    },
    distanceKm: {
      type: Number,
      required: true,
      default: 0,
    },
    pickupConfirmed: {
      type: Boolean,
      default: false,
    },
    deliveryConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmedAt: {
      type: Date,
      default: null,
    },
    pickedUpAt: {
      type: Date,
      default: null,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrderSchema.index({ userId: 1 });
OrderSchema.index({ driverId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export const OrderModel = model<IOrder>("orders", OrderSchema);
