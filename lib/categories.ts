export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "car",
    slug: "car",
    name: "السيارة",
    description: "حلول ذكية ترتّب سيارتك وتخلي قيادتك أريح",
    image: "/images/products/car-phone-holder.jpg",
  },
  {
    id: "home",
    slug: "home",
    name: "المنزل والمطبخ",
    description: "أدوات عملية بجودة عالية لبيت مرتب ومطبخ سهل",
    image: "/images/products/desk-lamp.jpg",
  },
  {
    id: "electronics",
    slug: "electronics",
    name: "الإلكترونيات",
    description: "تقنية يومية تخدمك في الحر والبيت والعبادة",
    image: "/images/products/neck-fan.jpg",
  },
  {
    id: "style",
    slug: "style",
    name: "العناية والأناقة",
    description: "لمسة فخامة في عطرك وإطلالتك اليومية",
    image: "/images/products/perfume-intense.jpg",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
