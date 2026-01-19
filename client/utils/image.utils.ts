export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // return `${BASE_URL}${cleanPath}`;
  return cleanPath;
}


export function getImageUrls(
  paths: (string | null | undefined)[]
): string[] {
  return paths
    .map(getImageUrl)
    .filter((url): url is string => url !== null);
}

