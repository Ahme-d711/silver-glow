import { Router } from "express";
import {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  toggleSectionStatus,
  getSectionBySlug,
  restoreSection,
} from "../controllers/section.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadSection } from "../utils/upload.js";

export const router = Router();

// Public/Authenticated routes
router.get("/", getAllSections);
router.get("/:id", getSectionById);
router.get("/slug/:slug", getSectionBySlug);

// Admin only routes
router.post(
  "/",
  authenticate,
  authorize("admin"),
  uploadSection.single("image"),
  createSection
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  uploadSection.single("image"),
  updateSection
);

router.delete("/:id", authenticate, authorize("admin"), deleteSection);

router.patch(
  "/:id/restore",
  authenticate,
  authorize("admin"),
  restoreSection
);

router.patch(
  "/:id/toggle-status",
  authenticate,
  authorize("admin"),
  toggleSectionStatus
);
