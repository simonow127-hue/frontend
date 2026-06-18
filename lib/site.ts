/** Canonical site URL for SEO (sitemap, metadataBase, JSON-LD). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://riads.shop";
  return raw.replace(/\/$/, "");
}
