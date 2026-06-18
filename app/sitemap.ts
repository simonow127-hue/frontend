import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: "/", changeFrequency: "weekly", priority: 1 },
  { url: "/collections", changeFrequency: "weekly", priority: 0.9 },
  { url: "/about", changeFrequency: "monthly", priority: 0.6 },
  { url: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { url: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { url: "/shipping", changeFrequency: "yearly", priority: 0.3 },
  { url: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
  { url: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${base}/products/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    ...STATIC_ROUTES.map((route) => ({
      ...route,
      url: `${base}${route.url}`,
    })),
    ...productRoutes,
  ];
}
