import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  updateUserBlockStatus,
  updateUserBalance,
  activateUser,
} from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadUser } from "../utils/upload.js";

export const router = Router();

// All user routes require authentication
router.use(authenticate);

// Get current user profile
router.get("/me", getCurrentUser);

// Admin only routes
router.get("/", authorize("admin"), getAllUsers);
router.get("/:id", authorize("admin"), getUserById);
router.post("/", authorize("admin"), uploadUser.single("picture"), createUser);
router.patch("/:id/block", authorize("admin"), updateUserBlockStatus);
router.patch("/:id/balance", authorize("admin"), updateUserBalance);
router.patch("/:id/activate", authorize("admin"), activateUser);
router.put("/:id", authorize("admin"), uploadUser.single("picture"), updateUser);
router.delete("/:id", authorize("admin"), deleteUser);

