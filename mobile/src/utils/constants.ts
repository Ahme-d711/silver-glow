// Server-side (Next.js Server Actions in Docker) uses NEXT_PUBLIC_SERVER_API_URL
// Client-side (browser) uses NEXT_PUBLIC_API_URL or falls back to localhost
const isServer = typeof window === 'undefined';

export const BASE_URL = "http://192.168.1.173:5000";

// Use server URL if on server and available, otherwise use client URL or fallback
export const API_URL =
    (isServer && process.env.NEXT_PUBLIC_SERVER_API_URL) ||
    process.env.NEXT_PUBLIC_API_URL ||
    `${BASE_URL}/api`;