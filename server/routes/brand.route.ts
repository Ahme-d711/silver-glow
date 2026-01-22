import { Router } from "express";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  toggleBrandStatus,
  getBrandBySlug,
  restoreBrand,
} from "../controllers/brand.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadBrand } from "../utils/upload.js";

export const router = Router();

// Public/Authenticated routes
router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.get("/slug/:slug", getBrandBySlug);

// Admin only routes
router.post(
  "/",
  authenticate,
  authorize("admin"),
  uploadBrand.single("logo"),
  createBrand
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  uploadBrand.single("logo"),
  updateBrand
);

router.delete("/:id", authenticate, authorize("admin"), deleteBrand);

router.patch(
  "/:id/restore",
  authenticate,
  authorize("admin"),
  restoreBrand
);

router.patch(
  "/:id/toggle-status",
  authenticate,
  authorize("admin"),
  toggleBrandStatus
);
