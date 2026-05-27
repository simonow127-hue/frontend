/** @deprecated Preview page — images are now live in the store via lib/store-images.ts */
export const PREVIEW_HERO_IMAGES = {
  jadr: "/images/products/jadr-hero.png",
  nour: "/images/products/nour-hero.png",
  naqaa: "/images/products/naqaa-hero.png",
} as const;

export const PREVIEW_STORE_IMAGES = {
  heroTrio: "/images/products/hero-trio.png",
  sectionScience: "/images/products/section-science.png",
  sectionIngredients: "/images/products/section-ingredients.png",
} as const;

export const PREVIEW_IMAGE_SIZES = {
  homeHeroMain: "1200x900 (4:3)",
  homeHeroCards: "1000x1000 (1:1)",
  collectionsBanner: "2100x900 (21:9)",
  productHero: "1000x1000 (1:1)",
  sectionBlocks: "1200x1200 (1:1)",
} as const;

export const PREVIEW_PRODUCTS = [
  {
    id: "jadr" as const,
    name: "جدر",
    subtitle: "زيت تطويل الشعر",
    src: PREVIEW_HERO_IMAGES.jadr,
  },
  {
    id: "nour" as const,
    name: "نور",
    subtitle: "كريم الرتينول",
    src: PREVIEW_HERO_IMAGES.nour,
  },
  {
    id: "naqaa" as const,
    name: "نقاء",
    subtitle: "كريم مزيل العرق الطبيعي",
    src: PREVIEW_HERO_IMAGES.naqaa,
  },
];
