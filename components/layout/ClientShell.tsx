"use client";

import { useEffect, useState } from "react";
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
  const [deferHeavy, setDeferHeavy] = useState(false);

  useEffect(() => {
    const enable = () => setDeferHeavy(true);

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const t = window.setTimeout(enable, 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <CartDrawer />
      <CheckoutPopup />
      {deferHeavy && (
        <>
          <SessionInit />
          <PixelManager />
          <WhatsAppButton />
        </>
      )}
    </>
  );
}
