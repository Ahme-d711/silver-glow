import type { Request, Response } from "express";
import { CategoryModel } from "../models/category.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import AppError from "../errors/AppError.js";
import { deleteFile } from "../utils/upload.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategoriesQuerySchema,
} from "../schemas/category.schema.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import { validateUserData } from "../schemas/user.schema.js"; // Reuse validation helper

/**
 * Get all categories with filtering, searching, and pagination
 */
export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const validatedQuery = validateUserData(getCategoriesQuerySchema, req.query);
  const query = CategoryModel.find().sort({ createdAt: -1 });

  const apiFeatures = new ApiFeatures(query, validatedQuery as any)
    .filter()
    .search(["nameAr", "nameEn"])
    .paginate();

  const { results: categories, pagination } = await apiFeatures.execute();

  sendResponse(res, 200, {
    success: true,
    message: "Categories retrieved successfully",
    data: {
      categories,
      pagination,
    },
  });
});

/**
 * Get single category by ID
 */
export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  sendResponse(res, 200, {
    success: true,
    message: "Category retrieved successfully",
    data: { category },
  });
});

/**
 * Create new category
 */
export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = validateUserData(createCategorySchema, req.body);
  const file = req.file;

  const imagePath = file ? `/uploads/categories/${file.filename}` : undefined;

  try {
    const category = await CategoryModel.create({
      ...validatedData,
      image: imagePath,
    });

    sendResponse(res, 201, {
      success: true,
      message: "Category created successfully",
      data: { category },
    });
  } catch (error) {
    if (file) {
      await deleteFile(`/uploads/categories/${file.filename}`).catch(console.error);
    }
    throw error;
  }
});

/**
 * Update category
 */
export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = validateUserData(updateCategorySchema, req.body);
  const file = req.file;

  const category = await CategoryModel.findById(id);
  if (!category) {
    if (file) await deleteFile(`/uploads/categories/${file.filename}`).catch(console.error);
    throw new AppError("Category not found", 404);
  }

  let imagePath = category.image;
  if (file) {
    if (category.image) {
      await deleteFile(category.image).catch(console.error);
    }
    imagePath = `/uploads/categories/${file.filename}`;
  }

  Object.assign(category, {
    ...validatedData,
    image: imagePath,
  });

  await category.save();

  sendResponse(res, 200, {
    success: true,
    message: "Category updated successfully",
    data: { category },
  });
});

/**
 * Delete category
 */
export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (category.image) {
    await deleteFile(category.image).catch(console.error);
  }

  await category.deleteOne();

  sendResponse(res, 200, {
    success: true,
    message: "Category deleted successfully",
  });
});
