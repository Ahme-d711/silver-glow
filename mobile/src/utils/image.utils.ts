import { BASE_URL } from "../services/api/axios";

export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  if (path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }

  // Ensure path starts with a single /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // If the path already has /uploads, use it as is, otherwise prefix it
  const finalPath = cleanPath.includes("/uploads") ? cleanPath : `/uploads${cleanPath}`;
  
  // Remove possible trailing slash from BASE_URL before joining
  const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  
  return `${baseUrl}${finalPath}`;
}


export function getImageUrls(
  paths: (string | null | undefined)[]
): string[] {
  return paths
    .map(getImageUrl)
    .filter((url): url is string => url !== null);
}

