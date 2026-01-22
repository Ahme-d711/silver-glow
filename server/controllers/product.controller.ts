import { Request, Response } from "express";
import {  QueryFilter } from "mongoose";
import { ProductModel } from "../models/product.model.js";
import { IProduct } from "../types/product.type.js";
import { createProductSchema, updateProductSchema, queryProductSchema } from "../schemas/product.schema.js";
import AppError from "../errors/AppError.js";
import fs from "fs";
import path from "path";

/**
 * Get all products
 */
export const getAllProducts = async (req: Request, res: Response) => {
  const validatedQuery = queryProductSchema.parse(req.query);
  const { search, categoryId, subCategoryId, brandId, sectionId, isDeleted, isShow, page, limit } = validatedQuery;

  const query: QueryFilter<IProduct> = { isDeleted: isDeleted || false };

  if (search) {
    query.$or = [
      { nameAr: { $regex: search, $options: "i" } },
      { nameEn: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }

  if (categoryId) query.categoryId = categoryId;
  if (subCategoryId) query.subCategoryId = subCategoryId;
  if (brandId) query.brandId = brandId;
  if (sectionId) query.sectionId = sectionId;
  if (isShow !== undefined) query.isShow = isShow;

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    ProductModel.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("categoryId", "nameAr nameEn")
      .populate("brandId", "nameAr nameEn")
      .populate("sectionId", "nameAr nameEn"),
    ProductModel.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: {
      products,
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
 * Get product by ID
 */
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id)
    .populate("categoryId")
    .populate("subCategoryId")
    .populate("brandId")
    .populate("sectionId");

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: { product },
  });
};

/**
 * Get product by slug
 */
export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await ProductModel.findOne({ slug, isDeleted: false })
    .populate("categoryId")
    .populate("subCategoryId")
    .populate("brandId")
    .populate("sectionId");

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: { product },
  });
};

/**
 * Create new product
 */
export const createProduct = async (req: Request, res: Response) => {
  const validatedBody = createProductSchema.parse(req.body);
  
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  
  if (!files || !files.mainImage || files.mainImage.length === 0) {
    throw new AppError("Main image is required", 400);
  }

  const mainImage = `/uploads/products/${files.mainImage[0].filename}`;
  const images = files.images?.map(file => `/uploads/products/${file.filename}`) || [];

  const product = await ProductModel.create({
    ...validatedBody,
    mainImage,
    images,
  } as unknown as IProduct);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: { product },
  });
};

/**
 * Update product
 */
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedBody = updateProductSchema.parse(req.body);
  
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const updateData: Partial<IProduct> = { ...validatedBody } as unknown as Partial<IProduct>;

  if (files) {
    if (files.mainImage && files.mainImage.length > 0) {
      // Delete old main image
      if (product.mainImage) {
        const oldImagePath = path.join(process.cwd(), product.mainImage);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      updateData.mainImage = `/uploads/products/${files.mainImage[0].filename}`;
    }

    if (files.images && files.images.length > 0) {
      // Options: Append or Replace? Usually Replace for simplicity in dashboard
      // If append logic is needed, it should be handled differently
      const newImages = files.images.map(file => `/uploads/products/${file.filename}`);
      updateData.images = [...(product.images || []), ...newImages];
    }
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: { product: updatedProduct },
  });
};

/**
 * Delete product (soft delete)
 */
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
};

/**
 * Toggle product status
 */
export const toggleProductStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  product.isShow = !product.isShow;
  await product.save();

  res.status(200).json({
    success: true,
    message: "Product status toggled successfully",
    data: { product },
  });
};

/**
 * Restore deleted product
 */
export const restoreProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product restored successfully",
    data: { product },
  });
};
