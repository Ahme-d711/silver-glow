import { Router } from "express";
import {
  getAllAds,
  getAdById,
  createAd,
  updateAd,
  deleteAd,
} from "../controllers/ad.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadAd } from "../utils/upload.js";

export const router = Router();

// Public routes
router.get("/", getAllAds);
router.get("/:id", getAdById);

// Admin only routes
router.post(
  "/",
  authenticate,
  authorize("admin"),
  uploadAd.single("photo"),
  createAd
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  uploadAd.single("photo"),
  updateAd
);

router.delete("/:id", authenticate, authorize("admin"), deleteAd);
