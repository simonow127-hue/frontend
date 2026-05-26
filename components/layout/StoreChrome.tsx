"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutPopup from "@/components/checkout/CheckoutPopup";
import PixelManager from "@/components/tracking/PixelManager";
import SessionInit from "@/components/tracking/SessionInit";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function StoreChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SessionInit />
      <PixelManager />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <CheckoutPopup />
      <WhatsAppButton />
    </>
  );
}
