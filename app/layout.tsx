import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientShell from "@/components/layout/ClientShell";
import MetaPixel from "@/components/analytics/MetaPixel";
import JsonLd from "@/components/seo/JsonLd";

const siteUrl = "https://riads.shop";

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
    logo: `${siteUrl}/logo.png`,
    description:
      "متجر سعودي يجمع منتجات مختارة. توصيل للمملكة والدفع عند الاستلام.",
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
  };

  return (
    <html lang="ar-SA" dir="rtl">
      <body>
        <MetaPixel />

        <JsonLd data={organizationJsonLd} />

        <Header />

        <ClientShell>
          {children}
        </ClientShell>

        <Footer />
      </body>
    </html>
  );
}
