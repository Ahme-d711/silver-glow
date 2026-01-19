import { Router } from "express";
import { router as authRouter } from "./auth.route.js";
import { router as userRouter } from "./user.route.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
