const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://api.riads.shop");

const REQUEST_TIMEOUT_MS = 20_000;

const CONNECTION_ERROR_AR =
  "تعذر إتمام الطلب حالياً. المرجو المحاولة بعد قليل أو التواصل معنا عبر واتساب.";

const TIMEOUT_ERROR_AR =
  "الخادم ما جاوبش في الوقت المحدد. المرجو المحاولة مجدداً بعد قليل.";

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw { status: 0, detail: { message_ar: TIMEOUT_ERROR_AR } };
    }
    throw { status: 0, detail: { message_ar: CONNECTION_ERROR_AR } };
  } finally {
    clearTimeout(timeoutId);
  }
}

type OrderPayload = {
  customer: {
    full_name: string;
    phone: string;
    phone_e164: string;
  };
  items: {
    product_id: string;
    slug: string;
    name: string;
    offer_pieces: number;
    quantity: number;
    unit_bundle_price: number;
    total: number;
  }[];
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
    currency: string;
  };
  source?: Record<string, string | undefined>;
  tracking?: {
    event_id?: string;
    fbp?: string;
    fbc?: string;
    ttp?: string;
    scid?: string;
  };
};

type OrderResponse = {
  ok: boolean;
  order_id: string;
  order_code: string;
};

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  const res = await apiFetch("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, detail: err.detail || err };
  }
  return res.json();
}

export async function trackEvent(payload: {
  event_name: string;
  event_id: string;
  order_id?: string;
  payload?: Record<string, unknown>;
}): Promise<void> {
  try {
    await apiFetch("/analytics/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking
  }
}

type ReviewPayload = {
  product_id: string;
  product_name: string;
  review: {
    name: string;
    city: string;
    text: string;
    rating: number;
    date?: string;
    flag?: string;
    verified?: boolean;
  };
  event_id: string;
};

export async function submitReview(payload: ReviewPayload): Promise<void> {
  const res = await apiFetch("/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: "ReviewSubmitted",
      event_id: payload.event_id,
      payload: {
        product_id: payload.product_id,
        product_name: payload.product_name,
        ...payload.review,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, detail: err.detail || err };
  }
}
