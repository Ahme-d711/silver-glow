import { Request, Response } from "express";
import { OrderModel } from "../models/order.model.js";
import { UserModel } from "../models/user.model.js";
import { IOrder } from "../types/order.type.js";
import { createOrderSchema, updateOrderSchema, queryOrderSchema } from "../schemas/order.schema.js";
import AppError from "../errors/AppError.js";

/**
 * Get all orders with filtering and pagination
 */
export const getAllOrders = async (req: Request, res: Response) => {
  const validatedQuery = queryOrderSchema.parse(req.query);
  const { status, paymentStatus, userId, search, page, limit } = validatedQuery;

  const query: any = {};

  if (status) query.status = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;
  if (userId) query.userId = userId;

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
      .populate("items.productId", "nameAr nameEn mainImage"),
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
    .populate("items.productId", "nameAr nameEn mainImage");

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
  
  const userId = (req as any).user?._id;
  if (!userId) {
     throw new AppError("Authentication required", 401);
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Calculate pricing
  const subtotal = validatedBody.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 50; 
  const discountAmount = 0; 
  const totalAmount = subtotal + shippingCost - discountAmount;

  // Balance deduction logic
  if (user.role !== "admin") {
    if ((user.totalBalance || 0) < totalAmount) {
      throw new AppError(`Insufficient balance. Current balance: ${user.totalBalance}`, 400);
    }
    
    user.totalBalance = (user.totalBalance || 0) - totalAmount;
    await user.save();
  }

  // Generate tracking number
  const trackingNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const order = await OrderModel.create({
    ...validatedBody,
    userId,
    subtotal,
    shippingCost,
    discountAmount,
    totalAmount,
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

  // Update logic with automatic timestamp updates
  const updateData: any = { ...validatedBody };
  
  // Set timestamps for status changes
  if (validatedBody.status === "SHIPPED" && order.status !== "SHIPPED") {
    updateData.shippedAt = new Date();
  } else if (validatedBody.status === "DELIVERED" && order.status !== "DELIVERED") {
    updateData.deliveredAt = new Date();
  }

  const updatedOrder = await OrderModel.findByIdAndUpdate(id, updateData, { new: true })
    .populate("userId", "name phone email")
    .populate("items.productId", "nameAr nameEn mainImage");

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: { order: updatedOrder },
  });
};

/**
 * Cancel order
 */
export const cancelOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await OrderModel.findByIdAndUpdate(
    id,
    { status: "CANCELLED" },
    { new: true }
  );

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: { order },
  });
};
