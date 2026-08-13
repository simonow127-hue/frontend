"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});

const CheckoutPopup = dynamic(() => import("@/components/checkout/CheckoutPopup"), {
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
    setDeferHeavy(true);
  }, []);

  return (
    <>
      <PixelManager />
      <CartDrawer />
      <CheckoutPopup />
      {deferHeavy && <SessionInit />}
    </>
  );
}
