import { Router } from "express";
import {
  register,
  login,
  logout,
  checkAuth,
  getCurrentUser,
  updateProfile,
  changePassword,
  verifyPhone,
  resendVerification,
  deleteUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

// Public routes (no authentication required)
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", checkAuth);

// Phone verification routes (no authentication required)
router.post("/verify-phone", verifyPhone);
router.post("/resend-verification", resendVerification);

// Protected routes (authentication required)
router.get("/user-data", authenticate, getCurrentUser);
router.put("/profile", authenticate, updateProfile);
router.post("/change-password", authenticate, changePassword);
router.get("/logout", authenticate, logout);
router.delete("/delete-account", authenticate, deleteUser);
