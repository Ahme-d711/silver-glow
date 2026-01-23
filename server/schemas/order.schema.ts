import { z } from "zod";

export const orderStatusSchema = z.enum([
  "CREATED",
  "PENDING",
  "ACCEPTED",
  "IN_PROGRESS",
  "IN_THE_WAY",
  "RETURN",
  "DELIVERED",
]);

export const orderTypeSchema = z.enum([
  "CLOTHES",
  "ELECTRONICS",
  "DOCUMENTS",
  "FOOD",
  "FRAGILE",
  "OTHER",
]);

export const createOrderSchema = z.object({
  pickupLatitude: z.number(),
  pickupLongitude: z.number(),
  pickupAddress: z.string().min(1),
  recipientLatitude: z.number(),
  recipientLongitude: z.number(),
  recipientAddress: z.string().min(1),
  recipientName: z.string().min(1),
  recipientPhone: z.string().min(1),
  orderType: orderTypeSchema,
  insuranceValue: z.number().min(0).default(0),
  deliveryCost: z.number().min(0).default(0),
  additionalNotes: z.string().optional(),
  collectionDate: z.string(),
  collectionTime: z.string(),
  anyTime: z.boolean().default(false),
  allowInspection: z.boolean().default(true),
  receiverPaysShipping: z.boolean().default(false),
});

export const updateOrderSchema = createOrderSchema.partial().extend({
  status: orderStatusSchema.optional(),
  driverId: z.string().optional(),
  pickupConfirmed: z.boolean().optional(),
  deliveryConfirmed: z.boolean().optional(),
});

export const queryOrderSchema = z.object({
  status: orderStatusSchema.optional(),
  userId: z.string().optional(),
  driverId: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});
