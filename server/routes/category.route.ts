import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../controllers/category.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadCategory } from "../utils/upload.js";

export const router = Router();

// Public/Authenticated routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin only routes
router.post(
  "/",
  authenticate,
  authorize("admin"),
  uploadCategory.single("image"),
  createCategory
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  uploadCategory.single("image"),
  updateCategory
);

router.delete("/:id", authenticate, authorize("admin"), deleteCategory);

router.patch(
  "/:id/toggle-status",
  authenticate,
  authorize("admin"),
  toggleCategoryStatus
);
