import express from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route to get settings (needed for cart calculations)
router.get("/", getSettings);

// Admin only route to update settings
router.put("/", authenticate, authorize("ADMIN"), updateSettings);

export default router;
