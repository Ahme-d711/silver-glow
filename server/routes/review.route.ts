import { Router } from "express";
import {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/product/:productId", getProductReviews);

// Protected routes
router.use(authenticate);
router.post("/", addReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
