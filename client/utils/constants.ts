// Server-side (Next.js Server Actions in Docker) uses NEXT_PUBLIC_SERVER_API_URL
// Client-side (browser) uses NEXT_PUBLIC_API_URL or falls back to localhost
const isServer = typeof window === 'undefined';
const isDevelopment = process.env.NODE_ENV === "development";

export const BASE_URL = "https://silver-glow-api-e51h.vercel.app";

const LOCAL_API_URL = "http://localhost:3131/api";

// Use server URL if on server and available, otherwise use client URL or fallback
export const API_URL =
    (isServer && process.env.NEXT_PUBLIC_SERVER_API_URL) ||
    process.env.NEXT_PUBLIC_API_URL ||
    (isDevelopment ? LOCAL_API_URL : `${BASE_URL}/api`);


export const TOKEN_KEY = "silverglow-token";