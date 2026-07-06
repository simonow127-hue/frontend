/** Compare-at price for temporary promo display (~25% off). */
export function getCompareAtPrice(salePrice: number): number {
  const raw = salePrice / 0.75;
  return Math.ceil(raw / 5) * 5 - 1;
}

export function getDiscountPercent(salePrice: number, compareAtPrice: number): number {
  if (compareAtPrice <= salePrice) return 0;
  return Math.round((1 - salePrice / compareAtPrice) * 100);
}
