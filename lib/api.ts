const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const REQUEST_TIMEOUT_MS = 20_000;

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
      throw {
        status: 0,
        detail: {
          message_ar:
            "الخادم ما جاوبش في الوقت المحدد. تأكد أن الـ API خدام (منفذ 8000) وقاعدة البيانات PostgreSQL مشغّلة.",
        },
      };
    }
    throw {
      status: 0,
      detail: {
        message_ar:
          "تعذر الاتصال بالخادم. شغّل الـ backend: cd backend ثم fastapi run app/main.py --port 8000",
      },
    };
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
