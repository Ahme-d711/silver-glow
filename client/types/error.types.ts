import { AxiosErrorResponse } from "./api.types";

/**
 * Standard API error type for error handlers
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

/**
 * Extract error message from Axios error response
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  
  const axiosError = error as AxiosErrorResponse;
  
  if (axiosError?.response?.data) {
    const data = axiosError.response.data;
    if ('message' in data && typeof data.message === 'string') {
      return data.message;
    }
  }
  
  if (axiosError?.message) {
    return axiosError.message;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Convert unknown error to ApiError
 */
export function toApiError(error: unknown): ApiError {
  const axiosError = error as AxiosErrorResponse;
  
  return {
    message: getErrorMessage(error),
    status: axiosError?.response?.status,
    code: typeof axiosError?.response?.data === 'object' && axiosError?.response?.data && 'error' in axiosError.response.data 
      ? String((axiosError.response.data.error as { code?: string })?.code)
      : undefined,
    details: axiosError?.response?.data,
  };
}
