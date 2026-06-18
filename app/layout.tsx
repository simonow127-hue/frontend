import type { Metadata } from "next";
import { Tajawal, Noto_Kufi_Arabic, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutPopup from "@/components/checkout/CheckoutPopup";
import PixelManager from "@/components/tracking/PixelManager";
import SessionInit from "@/components/tracking/SessionInit";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/site";
import { STORE_IMAGES } from "@/lib/store-images";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-noto-kufi",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "رياض | riads — عناية مغربية للجميع",
    template: "%s | رياض",
  },
  description:
    "رياض — عناية مغربية موثوقة للرجل والمرأة. شعر، بشرة، وانتعاش يومي. الدفع عند الاستلام داخل المغرب.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "للجمال رياض",
    locale: "ar_MA",
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
    alternateName: "riads",
    url: siteUrl,
    logo: `${siteUrl}${STORE_IMAGES.heroTrio}`,
    description:
      "عناية مغربية موثوقة للرجل والمرأة. شعر، بشرة، وانتعاش يومي. الدفع عند الاستلام داخل المغرب.",
    areaServed: { "@type": "Country", name: "Morocco" },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "رياض",
    url: siteUrl,
    inLanguage: "ar-MA",
  };

  return (
    <html lang="ar-MA" dir="rtl" className={`${tajawal.variable} ${notoKufiArabic.variable} ${cormorant.variable}`}>
      <body className="font-body bg-brand-ivory text-brand-espresso min-h-screen">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SessionInit />
        <PixelManager />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutPopup />
        <WhatsAppButton />
      </body>
    </html>
  );
}
