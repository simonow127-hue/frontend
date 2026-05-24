const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
  upsell?: {
    recommended_product_id: string;
    offer_pieces: number;
    price_mad: number;
  };
};

type UpsellPayload = {
  item: {
    product_id: string;
    slug: string;
    name: string;
    offer_pieces: number;
    price_mad: number;
  };
};

type UpsellResponse = {
  ok: boolean;
  order_id: string;
  order_code: string;
  new_total_mad: number;
};

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  const res = await fetch(`${API_URL}/orders`, {
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

export async function applyUpsell(
  orderId: string,
  payload: UpsellPayload
): Promise<UpsellResponse> {
  const res = await fetch(`${API_URL}/orders/${orderId}/upsell`, {
    method: "PATCH",
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
    await fetch(`${API_URL}/analytics/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking
  }
}
