export const STORE_IMAGES = {
  heroTrio: "/images/products/hero-trio.png",
  sectionScience: "/images/products/section-science.png",
  sectionIngredients: "/images/products/section-ingredients.png",
} as const;

export const PRODUCT_HERO_IMAGES = {
  jadr: "/images/products/jadr-hero.png",
  nour: "/images/products/nour-hero.png",
  naqaa: "/images/products/naqaa-hero.png",
} as const;

export type ProductImageId = keyof typeof PRODUCT_HERO_IMAGES;

export function getProductHeroImage(productId: string): string {
  if (productId in PRODUCT_HERO_IMAGES) {
    return PRODUCT_HERO_IMAGES[productId as ProductImageId];
  }
  return PRODUCT_HERO_IMAGES.jadr;
}
