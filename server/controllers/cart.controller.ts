import { Request, Response } from "express";
import { CartModel } from "../models/cart.model.js";
import { addToCartSchema, updateCartItemSchema } from "../schemas/cart.schema.js";
import AppError from "../errors/AppError.js";
import { ProductModel } from "../models/product.model.js";

/**
 * Get user cart
 */
export const getCart = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  let cart = await CartModel.findOne({ userId }).populate({
    path: "items.productId",
    select: "nameAr nameEn price mainImage slug stock",
  });

  if (!cart) {
    cart = await CartModel.create({ userId, items: [] });
  }

  res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: { cart },
  });
};

/**
 * Add item to cart
 */
export const addItemToCart = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { productId, quantity } = addToCartSchema.parse(req.body);

  // Check if product exists
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock < quantity) {
    throw new AppError("Not enough stock available", 400);
  }

  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    cart = new CartModel({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

  if (itemIndex > -1) {
    // Increment quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({ productId: productId as any, quantity });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item added to cart successfully",
    data: { cart },
  });
};

/**
 * Update cart item quantity
 */
export const updateCartItemQuantity = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { productId, quantity } = updateCartItemSchema.parse(req.body);

  const cart = await CartModel.findOne({ userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

  if (itemIndex === -1) {
    throw new AppError("Item not found in cart", 404);
  }

  // Check stock
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock < quantity) {
    throw new AppError("Not enough stock available", 400);
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    data: { cart },
  });
};

/**
 * Remove item from cart
 */
export const removeItemFromCart = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { productId } = req.params;

  const cart = await CartModel.findOne({ userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item removed from cart successfully",
    data: { cart },
  });
};

/**
 * Clear cart
 */
export const clearCart = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const cart = await CartModel.findOne({ userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
    data: { cart },
  });
};
