"use client";

import { useEffect } from "react";
import { trackPurchase } from "@/lib/tracking";

type PendingPurchase = {
  orderCode: string;
  total: number;
  eventId: string;
  items: { id: string; name: string; quantity: number; price: number }[];
};

const STORAGE_KEY = "riads_pending_purchase";

export function savePendingPurchase(payload: PendingPurchase) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export default function ThankYouPurchase({ orderCode }: { orderCode?: string }) {
  useEffect(() => {
    if (!orderCode) return;

    let pending: PendingPurchase | null = null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) pending = JSON.parse(raw) as PendingPurchase;
    } catch {
      pending = null;
    }

    if (!pending || pending.orderCode !== orderCode) return;

    // Re-fire Purchase on thank-you so Pixel Helper / Meta catch it after redirect
    trackPurchase(pending.orderCode, pending.total, pending.items, pending.eventId);

    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [orderCode]);

  return null;
}
