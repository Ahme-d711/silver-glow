import { Router } from "express";
import { 
  getAllProducts, 
  getProductById, 
  getProductBySlug, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  toggleProductStatus, 
  restoreProduct 
} from "../controllers/product.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadProduct } from "../utils/upload.js";

export const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/slug/:slug", getProductBySlug);

// Protected routes (Admin only)
router.use(authenticate);
router.use(authorize("admin", "superadmin"));

router.post(
  "/", 
  uploadProduct.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 10 }
  ]), 
  createProduct
);

router.put(
  "/:id", 
  uploadProduct.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 10 }
  ]), 
  updateProduct
);

router.delete("/:id", deleteProduct);
router.patch("/:id/toggle-status", toggleProductStatus);
router.patch("/:id/restore", restoreProduct);
