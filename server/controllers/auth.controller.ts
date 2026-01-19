import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import AppError from "../errors/AppError.js";
import bcrypt from "bcryptjs";
import { getAccessTokenCookieOptions } from "../utils/cookies.js";
import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  updateProfileSchema,
  verifyPhoneSchema,
  resendVerificationSchema,
  validateAuthData,
} from "../schemas/auth-schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { IUser } from "../types/user.type.js";
import { generateToken, extractTokenFromRequest, verifyToken } from "../utils/jwt.utils.js";

/**
 * Helper function to generate JWT token, set cookie, and send authentication response
 * @param user - User document from database (Mongoose document)
 * @param res - Express response object
 * @param statusCode - HTTP status code (default: 200)
 * @param message - Success message
 */
const sendAuthResponse = (
  user: IUser & { _id: any; toObject: () => any; password?: string },
  res: Response,
  statusCode: number = 200,
  message: string = "Authentication successful"
) => {
  // Generate JWT token
  const accessToken = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  // Set cookie
  res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());

  // Return user without password
  const { password: _, ...userResponse } = user.toObject();

  sendResponse(res, statusCode, {
    success: true,
    message,
    data: {
      user: userResponse,
      accessToken,
    },
  });
};

/**
 * Helper function to check if user is authenticated
 * @param req - Express request object
 * @throws AppError if user is not authenticated
 */
const requireAuth = (req: Request): void => {
  if (!req.user) {
    throw new AppError("You must be logged in to perform this action", 401);
  }
};

/**
 * Register new user
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  // Validate input data
  const validatedData = validateAuthData(registerSchema, req.body);

  // Check if user already exists
  const existingUser = await UserModel.findOne({
    email: validatedData.email,
  });

  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  // Check if phone already exists
  if (validatedData.phone) {
    const existingPhone = await UserModel.findOne({
      phone: validatedData.phone,
    });

    if (existingPhone) {
      throw new AppError("User with this phone number already exists", 409);
    }
  }

  // Create user (isActive: true, isVerified: false by default)
  const user = await UserModel.create({
    name: validatedData.name,
    email: validatedData.email,
    password: hashedPassword,
    phone: validatedData.phone,
    picture: validatedData.picture,
    role: validatedData.role,
    isActive: true,
    isVerified: false, // User needs to verify phone
  });

  // Send authentication response
  sendAuthResponse(user, res, 201, "Registration successful. Please verify your phone number.");
});

/**
 * Login user
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  // Validate input data
  const { phone, password } = validateAuthData(loginSchema, req.body);

  // Find user with password field included (only active users)
  const user = await UserModel.findOne({ 
    phone,
    isActive: true, // Only allow active users to login
  }).select("+password");

  if (!user || !user.password) {
      throw new AppError("Invalid login credentials", 401);
    }

  // Check if user is active
  if (user.isActive === false) {
    throw new AppError("Your account has been deactivated", 403);
  }

  // Check if phone is verified
  if (user.isVerified === false) {
    throw new AppError("Please verify your phone number before logging in", 403);
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError("Invalid login credentials", 401);
    }

  // Send authentication response
  sendAuthResponse(user, res, 200, "Login successful");
});

/**
 * Check authentication status
 */
export const checkAuth = asyncHandler(async (req: Request, res: Response) => {
  const accessToken = extractTokenFromRequest(req);

    if (!accessToken) {
      return sendResponse(res, 200, {
        success: true,
        message: "Not authenticated",
        data: { authenticated: false },
      });
    }

  const decoded = verifyToken(accessToken);

  if (!decoded) {
          return sendResponse(res, 200, {
            success: true,
            message: "Not authenticated",
            data: { authenticated: false },
          });
        }

  const user = await UserModel.findOne({ 
    _id: decoded.id,
    isActive: true, // Only return active users
  }).select("-password");

          if (!user) {
            return sendResponse(res, 200, {
              success: true,
              message: "Not authenticated",
              data: { authenticated: false },
            });
          }

          sendResponse(res, 200, {
            success: true,
            message: "Authenticated",
            data: {
              authenticated: true,
              user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
      accessToken,
            },
          });
});

/**
 * Get current user data (requires authentication)
 */
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  requireAuth(req);

  // Fetch user from database (only active users)
  const user = await UserModel.findOne({ 
    _id: req.user!._id,
    isActive: true,
  }).select("-password");

          if (!user) {
    throw new AppError("User not found or account is deactivated", 404);
          }

          sendResponse(res, 200, {
            success: true,
            message: "User data retrieved successfully",
    data: { user },
  });
});

/**
 * Update user profile
 */
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  requireAuth(req);

  // Validate input data
  const validatedData = validateAuthData(updateProfileSchema, req.body);

  // Note: Email update is not included in updateProfileSchema for security reasons
  // If email update is needed, it should be a separate endpoint with additional verification

  // Update user (only if active)
  const user = await UserModel.findOneAndUpdate(
    { _id: req.user!._id, isActive: true },
    validatedData,
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new AppError("User not found or account is deactivated", 404);
        }

  sendResponse(res, 200, {
    success: true,
    message: "Profile updated successfully",
    data: { user },
  });
});

/**
 * Change password
 */
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  requireAuth(req);

  // Validate input data
  const { currentPassword, newPassword } = validateAuthData(
    changePasswordSchema,
    req.body
  );

  // Get user with password (only if active)
  const user = await UserModel.findOne({ 
    _id: req.user!._id,
    isActive: true,
  }).select("+password");

  if (!user || !user.password) {
    throw new AppError("User not found or account is deactivated", 404);
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new AppError("Current password is incorrect", 401);
  }

  // Hash new password and update
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await UserModel.findByIdAndUpdate(req.user!._id, {
    password: hashedPassword,
  });

  sendResponse(res, 200, {
    success: true,
    message: "Password changed successfully",
  });
});

/**
 * Logout user
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  // Clear access token cookie
  res.clearCookie("accessToken", getAccessTokenCookieOptions());

  // Destroy session if exists
      if (req.session) {
    return new Promise<void>((resolve, reject) => {
      req.session!.destroy((err: any) => {
          if (err) {
          reject(new AppError("Error ending session", 500));
        } else {
          sendResponse(res, 200, {
            success: true,
            message: "Logout successful",
          });
          resolve();
        }
          });
        });
  }

        sendResponse(res, 200, {
          success: true,
          message: "Logout successful",
        });
});

/**
 * Verify phone number with verification code
 */
export const verifyPhone = asyncHandler(async (req: Request, res: Response) => {
  // Validate input data
  const { phone, code } = validateAuthData(verifyPhoneSchema, req.body);

  // Find user by phone
  const user = await UserModel.findOne({ phone, isActive: true });

  if (!user) {
    throw new AppError("Invalid phone number", 400);
  }

  if (user.isVerified) {
    throw new AppError("Phone number already verified", 400);
  }

  // TODO: In production, verify the code against stored verification code
  // For now, we'll accept any 4-6 digit code as valid
  // In real implementation, you would:
  // 1. Store verification code in database with expiration
  // 2. Compare provided code with stored code
  // 3. Check if code is expired
  // Example: const isValid = await verifySMSCode(phone, code);

  // Mark phone as verified
  user.isVerified = true;
  await user.save();

  sendResponse(res, 200, {
    success: true,
    message: "Phone number verified successfully",
    data: { user },
  });
});

/**
 * Resend verification code via SMS
 */
export const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  // Validate input data
  const { phone } = validateAuthData(resendVerificationSchema, req.body);

  const user = await UserModel.findOne({ phone, isActive: true });

  if (!user) {
    // Don't reveal if user exists for security
    return sendResponse(res, 200, {
      success: true,
      message: "If the phone number exists, a verification code has been sent",
    });
  }

  if (user.isVerified) {
    throw new AppError("Phone number is already verified", 400);
  }

  // TODO: In production, generate and send SMS verification code
  // Example: const code = generateVerificationCode();
  // await sendSMS(phone, `Your verification code is: ${code}`);
  // await storeVerificationCode(phone, code, expirationTime);

  sendResponse(res, 200, {
    success: true,
    message: "If the phone number exists, a verification code has been sent",
  });
});

/**
 * Delete user account (soft delete - sets isActive to false)
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  requireAuth(req);

  // Prevent users from deleting themselves (optional - you can remove this)
  // For now, allow users to deactivate their own account

  // Soft delete: set isActive to false
  const user = await UserModel.findByIdAndUpdate(
    req.user!._id,
    { isActive: false },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Clear access token cookie
  res.clearCookie("accessToken", getAccessTokenCookieOptions());

  // Destroy session if exists
  if (req.session) {
    req.session.destroy(() => {});
  }

  sendResponse(res, 200, {
    success: true,
    message: "Account deactivated successfully",
  });
});
