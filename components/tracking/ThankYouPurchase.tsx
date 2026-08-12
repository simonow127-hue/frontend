"use client";

import { useEffect } from "react";

type PendingPurchase = {
  orderCode: string;
  total: number;
  eventId: string;
  items: { id: string; name: string; quantity: number; price: number }[];
};

const STORAGE_KEY = "riads_pending_purchase";

export function savePendingPurchase(payload: PendingPurchase) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

function readPending(): PendingPurchase | null {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ||
      sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingPurchase;
  } catch {
    return null;
  }
}

function clearPending() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function firePurchase(pending: PendingPurchase) {
  const fbq = window.fbq;
  if (!fbq) return false;

  const contents = pending.items.map((i) => ({
    id: i.id,
    quantity: i.quantity,
    item_price: i.price,
  }));

  fbq(
    "track",
    "Purchase",
    {
      value: pending.total,
      currency: "SAR",
      content_type: "product",
      contents,
      order_id: pending.orderCode,
    },
    { eventID: pending.eventId }
  );

  return true;
}

export default function ThankYouPurchase({ orderCode }: { orderCode?: string }) {
  useEffect(() => {
    if (!orderCode) return;

    const pending = readPending();
    if (!pending || pending.orderCode !== orderCode) return;

    let tries = 0;
    const maxTries = 20;

    const tick = () => {
      tries += 1;
      if (firePurchase(pending)) {
        clearPending();
        return;
      }
      if (tries < maxTries) {
        window.setTimeout(tick, 250);
      }
    };

    tick();
  }, [orderCode]);

  return null;
}
