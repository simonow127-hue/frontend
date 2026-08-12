"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});

const CheckoutPopup = dynamic(() => import("@/components/checkout/CheckoutPopup"), {
  ssr: false,
});

const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"), {
  ssr: false,
});

const PixelManager = dynamic(() => import("@/components/tracking/PixelManager"), {
  ssr: false,
});

const SessionInit = dynamic(() => import("@/components/tracking/SessionInit"), {
  ssr: false,
});

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
