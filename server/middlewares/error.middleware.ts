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
    const message = err.issues.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
    return res.status(400).json({
      success: false,
      message: `Validation Error: ${message}`,
    });
  }

  // Handle Multer specific errors
  if (err.name === 'MulterError' || (err as any).name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `Upload Error: ${err.message}`,
    });
  }

  // Fallback for errors with status/statusCode but not AppError instances
  const statusCode = (err as any).statusCode || (err as any).status || 500;
  const message = statusCode === 500 && process.env.NODE_ENV !== "development" 
    ? "Internal Server Error" 
    : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
};
