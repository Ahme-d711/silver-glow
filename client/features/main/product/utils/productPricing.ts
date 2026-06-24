export interface ProductPriceDisplay {
  currentPrice: number;
  originalPrice: number | null;
  hasDiscount: boolean;
  discountPercent: number;
}

export type ProductSizePricing = {
  size: string;
  stock: number;
  price: number;
  oldPrice?: number;
};

export interface ProductCardPriceDisplay extends ProductPriceDisplay {
  /** At least one size/variant has a valid discount */
  hasAnyDiscount: boolean;
  /** Highest discount % among variants that have a sale */
  maxDiscountPercent: number;
  /** Strikethrough original to show on listing cards */
  displayOriginalPrice: number | null;
  showStrikethrough: boolean;
  /** Smallest size label when product has variants */
  displaySize: string | null;
}

/**
 * Discount shows only when `oldPrice` (original) is strictly greater than `price` (sale).
 */
export function getProductPriceDisplay(
  price: number,
  oldPrice?: number | null
): ProductPriceDisplay {
  const salePrice = price;
  const hasValidDiscount =
    oldPrice != null && oldPrice > 0 && oldPrice > salePrice;

  if (!hasValidDiscount) {
    return {
      currentPrice: salePrice,
      originalPrice: null,
      hasDiscount: false,
      discountPercent: 0,
    };
  }

  return {
    currentPrice: salePrice,
    originalPrice: oldPrice,
    hasDiscount: true,
    discountPercent: Math.round(((oldPrice - salePrice) / oldPrice) * 100),
  };
}

/** Pricing for a selected size — does not fall back to product-level oldPrice. */
export function getSizePriceDisplay(size: {
  price: number;
  oldPrice?: number;
}): ProductPriceDisplay {
  return getProductPriceDisplay(size.price, size.oldPrice);
}

/** Product detail: size-specific when sizes exist, otherwise product-level. */
export function getProductDetailPricing(
  product: { price: number; oldPrice?: number },
  sizes: ProductSizePricing[],
  selectedSize: string | null
): ProductPriceDisplay {
  if (sizes.length > 0) {
    const selected = sizes.find((s) => s.size === selectedSize);
    if (selected) {
      return getSizePriceDisplay(selected);
    }
  }

  return getProductPriceDisplay(product.price, product.oldPrice);
}

function compareSizeLabel(a: string, b: string): number {
  const numA = Number(a);
  const numB = Number(b);
  if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
    return numA - numB;
  }
  return a.localeCompare(b, undefined, { numeric: true });
}

export function getSmallestSizeVariant(
  sizes: ProductSizePricing[]
): ProductSizePricing {
  return [...sizes].sort((a, b) => compareSizeLabel(a.size, b.size))[0];
}

/** Shop card: smallest size price; badge if any size has a discount. */
export function getProductCardPricing(
  product: { price: number; oldPrice?: number },
  sizes?: ProductSizePricing[]
): ProductCardPriceDisplay {
  if (!sizes?.length) {
    const base = getProductPriceDisplay(product.price, product.oldPrice);
    return {
      ...base,
      hasAnyDiscount: base.hasDiscount,
      maxDiscountPercent: base.discountPercent,
      displayOriginalPrice: base.originalPrice,
      showStrikethrough: base.hasDiscount,
      displaySize: null,
    };
  }

  const smallest = getSmallestSizeVariant(sizes);
  const smallestPricing = getSizePriceDisplay(smallest);

  const variantPricings = sizes.map((s) => getSizePriceDisplay(s));
  const discounted = variantPricings.filter((p) => p.hasDiscount);
  const hasAnyDiscount = discounted.length > 0;
  const maxDiscountPercent = discounted.reduce(
    (max, p) => Math.max(max, p.discountPercent),
    0
  );

  return {
    currentPrice: smallestPricing.currentPrice,
    originalPrice: smallestPricing.originalPrice,
    hasDiscount: smallestPricing.hasDiscount,
    discountPercent: smallestPricing.discountPercent,
    hasAnyDiscount,
    maxDiscountPercent,
    displayOriginalPrice: smallestPricing.originalPrice,
    showStrikethrough: smallestPricing.hasDiscount,
    displaySize: smallest.size,
  };
}
