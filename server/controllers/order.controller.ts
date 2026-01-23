import { Request, Response } from "express";
import { OrderModel } from "../models/order.model.js";
import { IOrder } from "../types/order.type.js";
import { createOrderSchema, updateOrderSchema, queryOrderSchema } from "../schemas/order.schema.js";
import AppError from "../errors/AppError.js";

/**
 * Get all orders with filtering and pagination
 */
export const getAllOrders = async (req: Request, res: Response) => {
  const validatedQuery = queryOrderSchema.parse(req.query);
  const { status, userId, driverId, search, page, limit } = validatedQuery;

  const query: any = {};

  if (status) query.status = status;
  if (userId) query.userId = userId;
  if (driverId) query.driverId = driverId;

  if (search) {
    query.$or = [
      { trackingNumber: { $regex: search, $options: "i" } },
      { recipientName: { $regex: search, $options: "i" } },
      { recipientPhone: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    OrderModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name phone email")
      .populate("driverId", "name phone"),
    OrderModel.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: {
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    },
  });
};

/**
 * Get order by ID
 */
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderModel.findById(id)
    .populate("userId", "name phone email")
    .populate("driverId", "name phone");

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: { order },
  });
};

/**
 * Create new order
 */
export const createOrder = async (req: Request, res: Response) => {
  const validatedBody = createOrderSchema.parse(req.body);
  
  // In a real app, userId would come from req.user
  const userId = (req as any).user?._id;
  if (!userId) {
     throw new AppError("Authentication required", 401);
  }

  // Generate tracking number
  const trackingNumber = `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const order = await OrderModel.create({
    ...validatedBody,
    userId,
    trackingNumber,
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: { order },
  });
};

/**
 * Update order
 */
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedBody = updateOrderSchema.parse(req.body);
  
  const order = await OrderModel.findById(id);
  if (!order) {
    throw new AppError("Order not found", 404);
  }

  // Update logic
  const updateData: any = { ...validatedBody };
  
  // Set timestamps for status changes
  if (validatedBody.status === "ACCEPTED" && order.status !== "ACCEPTED") {
    updateData.confirmedAt = new Date();
  } else if (validatedBody.status === "IN_PROGRESS" && order.status !== "IN_PROGRESS") {
    updateData.pickedUpAt = new Date();
  } else if (validatedBody.status === "DELIVERED" && order.status !== "DELIVERED") {
    updateData.deliveredAt = new Date();
  }

  const updatedOrder = await OrderModel.findByIdAndUpdate(id, updateData, { new: true })
    .populate("userId", "name phone email")
    .populate("driverId", "name phone");

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: { order: updatedOrder },
  });
};

/**
 * Assign driver to order
 */
export const assignDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { driverId } = req.body;

  if (!driverId) {
    throw new AppError("Driver ID is required", 400);
  }

  const order = await OrderModel.findByIdAndUpdate(
    id,
    { driverId, status: "ACCEPTED", confirmedAt: new Date() },
    { new: true }
  ).populate("driverId", "name phone");

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Driver assigned successfully",
    data: { order },
  });
};
