import { Router } from "express";
import {
  getMyTransactions,
  topupBalance,
} from "../controllers/transaction.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", getMyTransactions);
router.post("/topup", topupBalance); // In production, this should be admin-only or via payment gateway

export default router;
