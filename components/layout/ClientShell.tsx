"use client";

import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutPopup from "@/components/checkout/CheckoutPopup";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(
  () => import("@/components/ui/WhatsAppButton"),
  {
    ssr: false,
  }
);

const PixelManager = dynamic(
  () => import("@/components/tracking/PixelManager"),
  {
    ssr: false,
  }
);

const SessionInit = dynamic(
  () => import("@/components/tracking/SessionInit"),
  {
    ssr: false,
  }
);

export default function ClientShell() {
  return (
    <>
      <SessionInit />

      <PixelManager />

      <CartDrawer />

      <CheckoutPopup />

      <WhatsAppButton />
    </>
  );
}
