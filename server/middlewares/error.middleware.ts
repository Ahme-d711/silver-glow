import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError.js";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error Handler Caught:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    const message = err.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
    return res.status(400).json({
      success: false,
      message: `Validation Error: ${message}`,
    });
  }

  // Handle Multer errors
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `Upload Error: ${err.message}`,
    });
  }

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
  });
};
