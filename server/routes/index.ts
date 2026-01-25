import { Router } from "express";
import { router as authRouter } from "./auth.route.js";
import { router as userRouter } from "./user.route.js";
import { router as categoryRouter } from "./category.route.js";
import { router as subcategoryRouter } from "./subcategory.route.js";
import { router as brandRouter } from "./brand.route.js";
import { router as sectionRouter } from "./section.route.js";
import { router as productRouter } from "./product.route.js";
import { orderRouter } from "./order.route.js";
import { router as adRouter } from "./ad.route.js";
import dashboardRouter from "./dashboard.route.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/subcategories", subcategoryRouter);
router.use("/brands", brandRouter);
router.use("/sections", sectionRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/ads", adRouter);
router.use("/dashboard", dashboardRouter);
