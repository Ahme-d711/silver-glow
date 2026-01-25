import { Router } from "express";
import { 
  getAllOrders, 
  getOrderById, 
  createOrder, 
  updateOrder,
  cancelOrder
} from "../controllers/order.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// Protect all routes
router.use(authenticate);

router.route("/")
  .get(asyncHandler(getAllOrders))
  .post(asyncHandler(createOrder));

router.route("/:id")
  .get(asyncHandler(getOrderById))
  .patch(asyncHandler(updateOrder));

router.patch("/:id/cancel", asyncHandler(cancelOrder));

export { router as orderRouter };
