"use server";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import serverAxios from "@/lib/axios/serverAxios";
import { User } from "../types";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  accessToken?: string;
}

interface AuthResponse {
  user: User;
  accessToken?: string;
}

interface CheckAuthResponse {
  authenticated: boolean;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken?: string;
}

interface AuthActionResponse {
  success: boolean;
  message: string;
  data?: AuthResponse;
  user?: User; // Legacy support
  accessToken?: string; // Legacy support
}

/**
 * Generic auth action handler
 */
async function authAction(
  payload: FormData | Record<string, string | number | boolean>,
  endPoint: string
): Promise<AuthActionResponse> {
  try {
    const headers: Record<string, string> = {};
    let data: FormData | string;

    if (payload instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
      data = payload;
    } else {
      headers["Content-Type"] = "application/json";
      data = JSON.stringify(payload);
    }

    const response = await serverAxios.post<ApiResponse<AuthResponse>>(endPoint, data, {
      headers,
    });

    const responseData = response.data;
    // Check for token in both data object and response root
    const accessToken = responseData?.data?.accessToken || responseData?.accessToken;

    // Set access token cookie
    if (accessToken) {
      (await cookies()).set("accessToken", accessToken, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return {
      success: responseData.success,
      message: responseData.message,
      data: responseData.data,
      user: responseData.data?.user,
      accessToken: accessToken,
    };
  } catch (error: unknown) {
    const err = error as AxiosError<ApiResponse>;
    console.log(err);
    const message = err.response?.data?.message || "Something went wrong";

    return {
      success: false,
      message,
    };
  }
}

/**
 * Register new user
 */
export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender?: string;
  picture?: string;
  role?: string;
}): Promise<AuthActionResponse> {
  return authAction(payload, "/auth/register");
}

/**
 * Login user with phone and password
 */
export async function loginUser(credentials: {
  phone: string;
  password: string;
}): Promise<AuthActionResponse> {
  try {
    const res = await authAction(credentials, "/auth/login");



    console.log(res);
    
    
    
    if (res.success && res.accessToken) {
      revalidatePath("/dashboard", "layout");
      return {
        success: true,
        message: res.message || "Login successful!",
        data: res.data,
        accessToken: res.accessToken,
      };
    }
    console.log('res', res)
    return {
      success: false,
      message: res.message || "Something went wrong during login",
    };
  } catch (err) {
    console.log('err', err);
    const error = err as AxiosError<ApiResponse>;
    const message = error.response?.data?.message || "Something went wrong during login";

    return {
      success: false,
      message,
    };
  }
}

/**
 * Check authentication status
 */
export async function checkAuth(): Promise<{
  authenticated: boolean;
  user?: User;
  accessToken?: string;
}> {
  try {
    const response = await serverAxios.get<ApiResponse<CheckAuthResponse>>("/auth/check-auth");
    const data = response.data.data;

    if (data?.authenticated && data.user) {
      return {
        authenticated: true,
        user: data.user as User,
        accessToken: data.accessToken,
      };
    }

    return { authenticated: false };
  } catch {
    return { authenticated: false };
  }
}

/**
 * Get current user profile
 */
export async function getProfile(): Promise<{
  user: User | null;
  token: string | null;
}> {
  const tokenCookie = (await cookies()).get("accessToken");

  if (!tokenCookie) {
    return {
      user: null,
      token: null,
    };
  }

  try {
    const response = await serverAxios.get<ApiResponse<{ user: User }>>("/auth/user-data");
    const token = tokenCookie.value || null;

    return {
      user: response.data?.data?.user || null,
      token,
    };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      // Expected for unauthenticated users, keep it silent
      return {
        user: null,
        token: null,
      };
    }
    console.error("Failed to fetch profile", error);
    return {
      user: null,
      token: null,
    };
  }
}

/**
 * Update user profile
 */
export async function updateProfile(payload: FormData | {
  name?: string;
  phone?: string;
  picture?: string;
}): Promise<AuthActionResponse> {
  try {
    const headers: Record<string, string> = {};
    let data: FormData | string;

    if (payload instanceof FormData) {
      // Axios will set boundary automatically with FormData
      data = payload;
    } else {
      headers["Content-Type"] = "application/json";
      data = JSON.stringify(payload);
    }

    const response = await serverAxios.put<ApiResponse<{ user: User }>>(
      "/auth/profile",
      data,
      { headers }
    );

    const user = response.data.data?.user;
    const accessToken = (await cookies()).get("accessToken")?.value || "";

    if (!user) {
      return {
        success: false,
        message: "Failed to update profile",
      };
    }

    revalidatePath("/profile");

    return {
      success: response.data.success,
      message: response.data.message,
      data: {
        user,
        accessToken,
      },
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;
    const message = err.response?.data?.message || "Failed to update profile";

    return {
      success: false,
      message,
    };
  }
}

/**
 * Change password
 */
export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<AuthActionResponse> {
  try {
    const response = await serverAxios.post<ApiResponse>("/auth/change-password", payload);

    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;
    const message = err.response?.data?.message || "Failed to change password";

    return {
      success: false,
      message,
    };
  }
}

/**
 * Verify phone number with verification code
 */
export async function verifyPhone(payload: {
  phone: string;
  code: string;
}): Promise<AuthActionResponse> {
  try {
    const response = await serverAxios.post<ApiResponse<{ user: User }>>(
      "/auth/verify-phone",
      payload
    );

    const user = response.data.data?.user;
    const accessToken = (await cookies()).get("accessToken")?.value || "";

    if (!user) {
      return {
        success: false,
        message: "Failed to verify phone number",
      };
    }

    return {
      success: response.data.success,
      message: response.data.message,
      data: {
        user,
        accessToken,
      },
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;
    const message = err.response?.data?.message || "Failed to verify phone number";

    return {
      success: false,
      message,
    };
  }
}

/**
 * Resend verification code
 */
export async function resendVerification(payload: {
  phone: string;
}): Promise<AuthActionResponse> {
  try {
    const response = await serverAxios.post<ApiResponse>("/auth/resend-verification", payload);

    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;
    const message = err.response?.data?.message || "Failed to resend verification code";

    return {
      success: false,
      message,
    };
  }
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<{ success: boolean; message: string }> {
  try {
    await serverAxios.get("/auth/logout");

    // Clear cookies
    (await cookies()).delete("accessToken");
    (await cookies()).delete("token");

    revalidatePath("/dashboard", "layout");

    return {
      success: true,
      message: "Logout successful!",
    };
  } catch (error) {
    // Even if server call fails, clear local cookies
    (await cookies()).delete("accessToken");
    (await cookies()).delete("token");
    revalidatePath("/dashboard", "layout");

    const err = error as AxiosError<ApiResponse>;
    const message = err.response?.data?.message || "Logout completed locally";

    return {
      success: true,
      message,
    };
  }
}

/**
 * Delete user account (soft delete)
 */
export async function deleteUser(): Promise<AuthActionResponse> {
  try {
    const response = await serverAxios.delete<ApiResponse>("/auth/delete-account");

    // Clear cookies after account deletion
    (await cookies()).delete("accessToken");
    (await cookies()).delete("token");
    revalidatePath("/dashboard", "layout");

    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;
    const message = err.response?.data?.message || "Failed to delete account";

    return {
      success: false,
      message,
    };
  }
}

/**
 * Request password reset
 */
export async function forgotPassword(payload: {
  phone: string;
}): Promise<AuthActionResponse> {
  try {
    const response = await serverAxios.post<ApiResponse>("/auth/forgot-password", payload);

    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;
    const message = err.response?.data?.message || "Failed to request password reset";

    return {
      success: false,
      message,
    };
  }
}

/**
 * Reset password
 */
export async function resetPassword(payload: {
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthActionResponse> {
  try {
    const response = await serverAxios.post<ApiResponse>("/auth/reset-password", payload);

    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;
    const message = err.response?.data?.message || "Failed to reset password";

    return {
      success: false,
      message,
    };
  }
}
