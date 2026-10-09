const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://api.riads.shop");

const REQUEST_TIMEOUT_MS = 20_000;

const CONNECTION_ERROR_AR =
  "تعذر إتمام الطلب حالياً. المرجو المحاولة بعد قليل أو التواصل معنا عبر الإيميل.";

const TIMEOUT_ERROR_AR =
  "الخادم ما جاوبش في الوقت المحدد. المرجو المحاولة مجدداً بعد قليل.";

type ApiError = {
  status: number;
  detail: unknown;
};

type Country = "SA" | "AE";
type Currency = "SAR" | "AED";

async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    return await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });
  } catch (err) {
    const error: ApiError =
      err instanceof Error && err.name === "AbortError"
        ? {
            status: 0,
            detail: { message_ar: TIMEOUT_ERROR_AR },
          }
        : {
            status: 0,
            detail: { message_ar: CONNECTION_ERROR_AR },
          };

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function parseApiError(res: Response): Promise<ApiError> {
  const err = await res.json().catch(() => ({}));

  return {
    status: res.status,
    detail: err?.detail ?? err,
  };
}

type OrderPayload = {
  customer: {
    full_name: string;
    phone: string;
    phone_e164: string;
    country: Country;
  };

  items: {
    product_id: string;
    slug: string;
    sku: string;
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
    currency: Currency;
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
  upsell?: {
    available: boolean;
    [key: string]: unknown;
  };
};

export async function createOrder(
  payload: OrderPayload
): Promise<OrderResponse> {
  // Make sure the selected country and currency match.
  const expectedCurrency: Currency =
    payload.customer.country === "SA" ? "SAR" : "AED";

  if (payload.totals.currency !== expectedCurrency) {
    throw {
      status: 400,
      detail: {
        message_ar:
          "العملة لا تتطابق مع الدولة المختارة. المرجو تحديث الصفحة والمحاولة مجدداً.",
      },
    } satisfies ApiError;
  }

  if (!payload.items.length) {
    throw {
      status: 400,
      detail: {
        message_ar: "السلة فارغة. المرجو إضافة منتج قبل إتمام الطلب.",
      },
    } satisfies ApiError;
  }

  const res = await apiFetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw await parseApiError(res);
  }

  return (await res.json()) as OrderResponse;
}

export async function trackEvent(payload: {
  event_name: string;
  event_id: string;
  order_id?: string;
  payload?: Record<string, unknown>;
}): Promise<void> {
  try {
    const res = await apiFetch("/analytics/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(
        "Tracking event failed:",
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch {
    // Tracking must never block checkout or other main user actions.
  }
}

type ReviewPayload = {
  product_id: string;
  product_name: string;

  review: {
    name: string;
    text: string;
    rating: number;
    date?: string;
    verified?: boolean;
  };

  event_id: string;
};

export async function submitReview(
  payload: ReviewPayload
): Promise<void> {
  const res = await apiFetch("/analytics/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
    throw await parseApiError(res);
  }
}
