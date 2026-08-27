"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useCartStore } from "@/lib/cart";

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

/**
 * Defer cart/checkout/pixels until idle (or first open) so LCP/FCP stay free.
 * Opening the cart or checkout forces mount immediately.
 */
export default function ClientShell() {
  const [mountShell, setMountShell] = useState(false);
  const [mountPixels, setMountPixels] = useState(false);

  useEffect(() => {
    const forceMount = () => setMountShell(true);
    const unsub = useCartStore.subscribe((s) => {
      if (s.isDrawerOpen || s.isCheckoutOpen) forceMount();
    });

    const idleMount = () => {
      setMountShell(true);
      setMountPixels(true);
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let pixelTimeout: ReturnType<typeof setTimeout> | undefined;

    // Pixels slightly after first paint — Meta still gets PageView early enough for ads
    pixelTimeout = setTimeout(() => setMountPixels(true), 1200);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(idleMount, { timeout: 2800 });
    } else {
      timeoutId = setTimeout(idleMount, 900);
    }

    return () => {
      unsub();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
      if (pixelTimeout) clearTimeout(pixelTimeout);
    };
  }, []);

  return (
    <>
      {mountPixels && <PixelManager />}
      {mountShell && (
        <>
          <CartDrawer />
          <CheckoutPopup />
          <SessionInit />
        </>
      )}
    </>
  );
}
