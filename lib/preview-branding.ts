/** Nano-banana preview assets — not live until you approve (say «حطّهم») */
const BASE = "/images/preview-nano-banana";

export const PREVIEW_HERO_IMAGES = {
  jadr: `${BASE}/jadr-hero.png`,
  nour: `${BASE}/nour-hero.png`,
  naqaa: `${BASE}/naqaa-hero.png`,
} as const;

export const PREVIEW_PRODUCT_SECTIONS = {
  jadr: {
    ingredients: `${BASE}/jadr-ingredients.png`,
    usage: `${BASE}/jadr-usage.png`,
  },
  naqaa: {
    ingredients: `${BASE}/naqaa-ingredients.png`,
    usage: `${BASE}/naqaa-usage.png`,
  },
  nour: {
    ingredients: `${BASE}/nour-hero.png`,
    usage: `${BASE}/nour-hero.png`,
  },
} as const;

export const PREVIEW_STORE_IMAGES = {
  heroTrio: `${BASE}/hero-trio.png`,
  sectionScience: `${BASE}/hero-trio.png`,
  sectionIngredients: `${BASE}/jadr-ingredients.png`,
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
