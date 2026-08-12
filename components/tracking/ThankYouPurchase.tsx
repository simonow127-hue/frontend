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

function firePurchase(args: {
  orderCode: string;
  total: number;
  eventId: string;
  items?: PendingPurchase["items"];
}) {
  const fbq = (window as Window & { fbq?: (...a: unknown[]) => void }).fbq;
  if (!fbq) return false;

  const payload: Record<string, unknown> = {
    value: args.total,
    currency: "SAR",
    content_type: "product",
    order_id: args.orderCode,
  };

  if (args.items?.length) {
    payload.contents = args.items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
      item_price: i.price,
    }));
  }

  fbq("track", "Purchase", payload, { eventID: args.eventId });
  return true;
}

type Props = {
  orderCode?: string;
  total?: number;
  eventId?: string;
};

/** Fires Meta Purchase on thank-you using URL props + local storage backup. */
export default function ThankYouPurchase({
  orderCode,
  total: totalProp,
  eventId: eventIdProp,
}: Props) {
  useEffect(() => {
    if (!orderCode) return;

    const pending = readPending();
    const matched =
      pending && pending.orderCode === orderCode ? pending : null;

    const total = matched?.total || totalProp || 0;
    const eventId = matched?.eventId || eventIdProp || `ty-${orderCode}`;
    const items = matched?.items;

    let tries = 0;
    const maxTries = 40;

    const tick = () => {
      tries += 1;
      if (
        firePurchase({
          orderCode,
          total,
          eventId,
          items,
        })
      ) {
        clearPending();
        return;
      }
      if (tries < maxTries) window.setTimeout(tick, 200);
    };

    tick();
  }, [orderCode, totalProp, eventIdProp]);

  return null;
}
