import { Router } from "express";
import { getDashboardStats, getRevenueAnalytics } from "../controllers/dashboard.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// All dashboard routes are protected and restricted to admin
router.use(authenticate);
router.use(authorize("admin"));

router.get("/stats", getDashboardStats);
router.get("/revenue-analytics", getRevenueAnalytics);

export default router;
