import { Ad } from "@/features/dashboard/ads/types";

export function getAdProductSlug(ad: Ad): string | null {
  const { productId } = ad;
  if (!productId) return null;

  if (typeof productId === "string") return productId;

  return productId.slug ?? productId._id ?? productId.id ?? null;
}

export function hasAdCtaTarget(ad: Ad): boolean {
  return Boolean(ad.link || getAdProductSlug(ad));
}
