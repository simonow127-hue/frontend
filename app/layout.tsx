import type { Metadata } from "next";
import { Tajawal, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientShell from "@/components/layout/ClientShell";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/site";
import { STORE_IMAGES } from "@/lib/store-images";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-tajawal",
  display: "swap",
  preload: true,
});

// Headings only — don't preload so body text paints faster on mobile
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["700"],
  variable: "--font-noto-kufi",
  display: "swap",
  preload: false,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "رياض | Riads — تسوق بالسعودية",
    template: "%s | رياض",
  },
  description:
    "رياض — منتجات مختارة. توصيل للمملكة، دفع عند الاستلام، تقييمات حقيقية.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "رياض",
    locale: "ar_SA",
    type: "website",
    url: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "رياض",
    alternateName: "Riads",
    url: siteUrl,
    logo: `${siteUrl}${STORE_IMAGES.heroTrio}`,
    description:
      "متجر سعودي يجمع منتجات مختارة. توصيل للمملكة والدفع عند الاستلام.",
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "رياض",
    url: siteUrl,
    inLanguage: "ar-SA",
  };

  return (
    <html lang="ar-SA" dir="rtl" className={`${tajawal.variable} ${notoKufiArabic.variable}`}>
      <body className="font-body bg-brand-ivory text-brand-espresso min-h-screen">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <ClientShell />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
