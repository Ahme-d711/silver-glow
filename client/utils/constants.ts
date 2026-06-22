// Server-side (Next.js Server Actions in Docker) uses NEXT_PUBLIC_SERVER_API_URL
// Client-side (browser) uses NEXT_PUBLIC_API_URL or falls back to localhost
const isServer = typeof window === 'undefined';
const isDevelopment = process.env.NODE_ENV === "development";

const PRODUCTION_SERVER_ORIGIN = "https://silver-glow-api-e51h.vercel.app";
const LOCAL_SERVER_ORIGIN = "http://localhost:3131";
const LOCAL_API_URL = `${LOCAL_SERVER_ORIGIN}/api`;

function originFromApiUrl(apiUrl: string): string {
  return apiUrl.replace(/\/api\/?$/, "");
}

// Use server URL if on server and available, otherwise use client URL or fallback
export const API_URL =
  (isServer && process.env.NEXT_PUBLIC_SERVER_API_URL) ||
  process.env.NEXT_PUBLIC_API_URL ||
  (isDevelopment ? LOCAL_API_URL : `${PRODUCTION_SERVER_ORIGIN}/api`);

/** Origin for uploaded static assets — must match the API server, not always production */
export const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_ORIGIN ||
  originFromApiUrl(API_URL) ||
  (isDevelopment ? LOCAL_SERVER_ORIGIN : PRODUCTION_SERVER_ORIGIN);

export const TOKEN_KEY = "silverglow-token";