import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import ProductPageClient from "@/components/product/ProductPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/site";
import { getProductHeroImage } from "@/lib/store-images";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const path = `/products/${slug}`;
  return {
    title: `${product.arabicName} | الدفع عند الاستلام`,
    description: `${product.subheading} اطلب الحين بالدفع عند الاستلام. من ${product.offers[0].price} ريال.`,
    alternates: { canonical: path },
    openGraph: {
      title: product.arabicName,
      description: product.subheading,
      url: path,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const defaultOffer = product.offers.find((o) => o.pieces === product.defaultOffer) ?? product.offers[0];

  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.arabicName,
    description: product.subheading,
    sku: product.sku,
    url: productUrl,
    image: `${siteUrl}${getProductHeroImage(product.id)}`,
    brand: { "@type": "Brand", name: "رياض" },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "SAR",
      price: defaultOffer.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "رياض" },
    },
  };

  if (product.reviewCount > 0 && product.rating > 0) {
    productJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  }

  return (
    <>
      <JsonLd data={productJsonLd} />
      <ProductPageClient product={product} />
    </>
  );
}
