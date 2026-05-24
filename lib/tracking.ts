"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, data?: Record<string, unknown>) => void;
      identify: (data: Record<string, unknown>) => void;
    };
    snaptr?: (action: string, event?: string, data?: Record<string, unknown>) => void;
    _riadsEventQueue?: Array<() => void>;
  }
}

const DEBUG = process.env.NEXT_PUBLIC_ENABLE_DEBUG_EVENTS === "true";

function log(...args: unknown[]) {
  if (DEBUG) console.log("[riads:pixel]", ...args);
}

// --- Meta Pixel ---
export function fireMetaEvent(
  eventName: string,
  data: Record<string, unknown> = {},
  eventId?: string
) {
  if (!window.fbq) {
    log("Meta pixel not loaded, queuing", eventName);
    return;
  }
  if (eventId) {
    window.fbq("track", eventName, data, { eventID: eventId });
  } else {
    window.fbq("track", eventName, data);
  }
  log("Meta:", eventName, data, "event_id:", eventId);
}

// --- TikTok Pixel ---
export function fireTikTokEvent(
  eventName: string,
  data: Record<string, unknown> = {},
  eventId?: string
) {
  if (!window.ttq) {
    log("TikTok pixel not loaded, queuing", eventName);
    return;
  }
  const payload: Record<string, unknown> = { ...data };
  if (eventId) payload.event_id = eventId;
  window.ttq.track(eventName, payload);
  log("TikTok:", eventName, payload);
}

// --- Snap Pixel ---
export function fireSnapEvent(
  eventName: string,
  data: Record<string, unknown> = {},
  clientDedupId?: string
) {
  if (!window.snaptr) {
    log("Snap pixel not loaded, queuing", eventName);
    return;
  }
  const payload: Record<string, unknown> = { ...data };
  if (clientDedupId) payload.client_dedup_id = clientDedupId;
  window.snaptr("track", eventName, payload);
  log("Snap:", eventName, payload);
}

// --- High-level event helpers ---
export function trackPageView() {
  fireMetaEvent("PageView");
  fireTikTokEvent("PageView");
  fireSnapEvent("PAGE_VIEW");
}

export function trackViewContent(
  product: { id: string; name: string; price: number },
  eventId: string
) {
  const meta = { content_ids: [product.id], content_type: "product", value: product.price, currency: "MAD" };
  const tt = { content_id: product.id, content_name: product.name, value: product.price, currency: "MAD" };
  const snap = { item_ids: [product.id], price: product.price, currency: "MAD" };

  fireMetaEvent("ViewContent", meta, eventId);
  fireTikTokEvent("ViewContent", tt, eventId);
  fireSnapEvent("VIEW_CONTENT", snap, eventId);
}

export function trackAddToCart(
  product: { id: string; name: string; price: number },
  eventId: string
) {
  const meta = { content_ids: [product.id], content_type: "product", value: product.price, currency: "MAD" };
  const tt = { content_id: product.id, content_name: product.name, value: product.price, currency: "MAD" };
  const snap = { item_ids: [product.id], price: product.price, currency: "MAD" };

  fireMetaEvent("AddToCart", meta, eventId);
  fireTikTokEvent("AddToCart", tt, eventId);
  fireSnapEvent("ADD_CART", snap, eventId);
}

export function trackInitiateCheckout(total: number, eventId: string) {
  fireMetaEvent("InitiateCheckout", { value: total, currency: "MAD" }, eventId);
  fireTikTokEvent("InitiateCheckout", { value: total, currency: "MAD" }, eventId);
  fireSnapEvent("START_CHECKOUT", { price: total, currency: "MAD" }, eventId);
}

export function trackPurchase(
  orderCode: string,
  total: number,
  items: { id: string; name: string; quantity: number; price: number }[],
  eventId: string
) {
  const metaContents = items.map((i) => ({ id: i.id, quantity: i.quantity, item_price: i.price }));
  const ttContents = items.map((i) => ({ content_id: i.id, content_name: i.name, quantity: i.quantity, price: i.price }));

  fireMetaEvent("Purchase", {
    value: total,
    currency: "MAD",
    content_type: "product",
    contents: metaContents,
    order_id: orderCode,
  }, eventId);

  fireTikTokEvent("CompletePayment", {
    value: total,
    currency: "MAD",
    content_type: "product",
    contents: ttContents,
  }, eventId);

  fireSnapEvent("PURCHASE", {
    price: total,
    currency: "MAD",
    transaction_id: orderCode,
  }, eventId);
}
