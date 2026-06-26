export const STORE_IMAGES = {
  heroBanner: "/images/products/desk-lamp.jpg",
  heroTrio: "/images/products/perfume-intense.jpg",
  heroNeckFan: "/images/products/neck-fan.jpg",
  heroSheila: "/images/products/black-sheila.jpg",
  heroCarHolder: "/images/products/car-phone-holder.jpg",
} as const;

export const PRODUCT_HERO_IMAGES = Object.fromEntries(
  [] as [string, string][]
) as Record<string, string>;

export function getProductHeroImage(productId: string): string {
  return `/images/products/${productId}.jpg`;
}
