"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, data?: Record<string, unknown>) => void;
      identify: (data: Record<string, unknown>) => void;
    };
    snaptr?: (action: string, event?: string, data?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    _riadsEventQueue?: Array<() => void>;
  }
}

const GOOGLE_ADS_PURCHASE_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO;

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

// --- Google Ads / GA4 ---
export function fireGoogleEvent(
  eventName: string,
  data: Record<string, unknown> = {}
) {
  if (!window.gtag) {
    log("Google tag not loaded, skipping", eventName);
    return;
  }
  window.gtag("event", eventName, data);
  log("Google:", eventName, data);
}

function fireGooglePurchaseConversion(
  orderCode: string,
  total: number
) {
  if (!window.gtag || !GOOGLE_ADS_PURCHASE_SEND_TO) return;
  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_PURCHASE_SEND_TO,
    value: total,
    currency: "SAR",
    transaction_id: orderCode,
  });
  log("Google conversion:", orderCode, total);
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
  const meta = { content_ids: [product.id], content_type: "product", value: product.price, currency: "SAR" };
  const tt = { content_id: product.id, content_name: product.name, value: product.price, currency: "SAR" };
  const snap = { item_ids: [product.id], price: product.price, currency: "SAR" };

  fireMetaEvent("ViewContent", meta, eventId);
  fireTikTokEvent("ViewContent", tt, eventId);
  fireSnapEvent("VIEW_CONTENT", snap, eventId);
  fireGoogleEvent("view_item", {
    currency: "SAR",
    value: product.price,
    items: [{ item_id: product.id, item_name: product.name, price: product.price }],
  });
}

export function trackAddToCart(
  product: { id: string; name: string; price: number },
  eventId: string
) {
  const meta = { content_ids: [product.id], content_type: "product", value: product.price, currency: "SAR" };
  const tt = { content_id: product.id, content_name: product.name, value: product.price, currency: "SAR" };
  const snap = { item_ids: [product.id], price: product.price, currency: "SAR" };

  fireMetaEvent("AddToCart", meta, eventId);
  fireTikTokEvent("AddToCart", tt, eventId);
  fireSnapEvent("ADD_CART", snap, eventId);
  fireGoogleEvent("add_to_cart", {
    currency: "SAR",
    value: product.price,
    items: [{ item_id: product.id, item_name: product.name, price: product.price }],
  });
}

export function trackInitiateCheckout(total: number, eventId: string) {
  fireMetaEvent("InitiateCheckout", { value: total, currency: "SAR" }, eventId);
  fireTikTokEvent("InitiateCheckout", { value: total, currency: "SAR" }, eventId);
  fireSnapEvent("START_CHECKOUT", { price: total, currency: "SAR" }, eventId);
  fireGoogleEvent("begin_checkout", { currency: "SAR", value: total });
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
    currency: "SAR",
    content_type: "product",
    contents: metaContents,
    order_id: orderCode,
  }, eventId);

  fireTikTokEvent("CompletePayment", {
    value: total,
    currency: "SAR",
    content_type: "product",
    contents: ttContents,
  }, eventId);

  fireSnapEvent("PURCHASE", {
    price: total,
    currency: "SAR",
    transaction_id: orderCode,
  }, eventId);

  fireGoogleEvent("purchase", {
    transaction_id: orderCode,
    value: total,
    currency: "SAR",
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      quantity: i.quantity,
      price: i.price,
    })),
  });
  fireGooglePurchaseConversion(orderCode, total);
}
