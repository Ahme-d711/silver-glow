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
  /** Prefix price with "From" when variants differ */
  showFrom: boolean;
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

/** Shop card: lowest sale price; badge if any size has a discount. */
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
      showFrom: false,
    };
  }

  const variantPricings = sizes.map((s) => ({
    ...getSizePriceDisplay(s),
    size: s.size,
  }));

  const lowest = variantPricings.reduce((min, current) =>
    current.currentPrice < min.currentPrice ? current : min
  );

  const discounted = variantPricings.filter((p) => p.hasDiscount);
  const hasAnyDiscount = discounted.length > 0;
  const maxDiscountPercent = discounted.reduce(
    (max, p) => Math.max(max, p.discountPercent),
    0
  );

  const uniquePrices = new Set(variantPricings.map((p) => p.currentPrice));

  return {
    currentPrice: lowest.currentPrice,
    originalPrice: lowest.originalPrice,
    hasDiscount: lowest.hasDiscount,
    discountPercent: lowest.discountPercent,
    hasAnyDiscount,
    maxDiscountPercent,
    showFrom: uniquePrices.size > 1,
  };
}
