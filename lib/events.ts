"use client";

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const SESSION_KEY = "riads_event_ids";

type EventStore = {
  viewContent?: string;
  addToCart?: string;
  checkout?: string;
  purchase?: string;
};

function getStore(): EventStore {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveStore(store: EventStore): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(store));
}

export function getOrCreateEventId(key: keyof EventStore): string {
  const store = getStore();
  if (store[key]) return store[key]!;
  const id = generateUUID();
  saveStore({ ...store, [key]: id });
  return id;
}

export function generateFreshEventId(key: keyof EventStore): string {
  const id = generateUUID();
  const store = getStore();
  saveStore({ ...store, [key]: id });
  return id;
}

export function getClickIds() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("riads_click_ids") || "{}");
    } catch {
      return {};
    }
  })();

  const fbclid = params.get("fbclid") || stored.fbclid || "";
  const ttclid = params.get("ttclid") || stored.ttclid || "";
  const sc_click_id = params.get("sc_click_id") || stored.sc_click_id || "";

  if (fbclid || ttclid || sc_click_id) {
    localStorage.setItem("riads_click_ids", JSON.stringify({ fbclid, ttclid, sc_click_id }));
  }

  return { fbclid, ttclid, sc_click_id };
}

export function getUTMs() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("riads_utm") || "{}");
    } catch {
      return {};
    }
  })();

  const utms: Record<string, string> = {};
  for (const key of keys) {
    utms[key] = params.get(key) || stored[key] || "";
  }

  const hasNew = keys.some((k) => params.get(k));
  if (hasNew) localStorage.setItem("riads_utm", JSON.stringify(utms));

  return utms;
}

export function getCookies(): { fbp?: string; fbc?: string; ttp?: string } {
  if (typeof window === "undefined") return {};
  const get = (name: string) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : undefined;
  };
  return {
    fbp: get("_fbp"),
    fbc: get("_fbc"),
    ttp: get("_ttp"),
  };
}

export function getLandingUrl(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("riads_first_landing_url") || window.location.href;
  } catch {
    return window.location.href;
  }
}

export function getReferrer(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("riads_first_referrer") || document.referrer;
  } catch {
    return document.referrer;
  }
}

export function initSession(): void {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem("riads_first_landing_url")) {
    localStorage.setItem("riads_first_landing_url", window.location.href);
    localStorage.setItem("riads_first_referrer", document.referrer || "");
  }
  getUTMs();
  getClickIds();
}
