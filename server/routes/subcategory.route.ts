import { Router } from "express";
import {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  toggleSubcategoryStatus,
  getSubcategoryBySlug,
} from "../controllers/subcategory.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadSubcategory } from "../utils/upload.js";

export const router = Router();

// Public/Authenticated routes
router.get("/", getAllSubcategories);
router.get("/:id", getSubcategoryById);
router.get("/slug/:slug", getSubcategoryBySlug);

// Admin only routes
router.post(
  "/",
  authenticate,
  authorize("admin"),
  uploadSubcategory.single("image"),
  createSubcategory
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  uploadSubcategory.single("image"),
  updateSubcategory
);

router.delete("/:id", authenticate, authorize("admin"), deleteSubcategory);

router.patch(
  "/:id/toggle-status",
  authenticate,
  authorize("admin"),
  toggleSubcategoryStatus
);
