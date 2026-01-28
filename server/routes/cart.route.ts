import { Router } from "express";
import {
  getCart,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// All cart routes require authentication
router.use(authenticate);

router.get("/", getCart);
router.post("/add", addItemToCart);
router.patch("/update", updateCartItemQuantity);
router.delete("/remove/:productId", removeItemFromCart);
router.delete("/clear", clearCart);

export default router;
