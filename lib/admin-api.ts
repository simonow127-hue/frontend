const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type AdminMetrics = {
  from_date: string;
  to_date: string;
  clicks: number;
  sessions: number;
  product_views: number;
  add_to_carts: number;
  checkouts: number;
  orders: number;
  revenue_mad: number;
  average_order_value_mad: number;
  conversion_rate: number;
  upsell_rate: number;
  blocked_events: number;
  daily: {
    date: string;
    clicks: number;
    sessions: number;
    orders: number;
    revenue_mad: number;
  }[];
  by_channel: {
    channel: string;
    clicks: number;
    orders: number;
    revenue_mad: number;
    conversion_rate: number;
  }[];
};

export type AdminOrderListItem = {
  id: string;
  order_code: string;
  status: string;
  customer_name: string;
  phone_e164: string;
  total_mad: number;
  upsell_added: boolean;
  utm_source?: string;
  has_ad_click: boolean;
  created_at: string;
};

export type AdminOrderDetail = {
  id: string;
  order_code: string;
  status: string;
  customer_name: string;
  phone_raw: string;
  phone_e164: string;
  phone_country: string;
  items: {
    product_id: string;
    slug: string;
    name: string;
    offer_pieces: number;
    quantity: number;
    unit_bundle_price: number;
    total: number;
  }[];
  subtotal_mad: number;
  shipping_mad: number;
  total_mad: number;
  currency: string;
  upsell_added: boolean;
  payment_method: string;
  source: Record<string, string | undefined>;
  tracking: Record<string, string | undefined>;
  client_ip?: string;
  user_agent?: string;
  event_id?: string;
  sheet_sent_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function apiErrorMessage(res: Response, detail: unknown): string {
  if (typeof detail === "object" && detail !== null && "message_ar" in detail) {
    return String((detail as { message_ar: string }).message_ar);
  }
  if (res.status === 503) return "قاعدة البيانات غير متصلة. شغّل PostgreSQL.";
  return "تعذر تحميل البيانات من الخادم.";
}

async function adminFetch<T>(
  path: string,
  token: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...authHeaders(token), ...init?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const detail = err.detail || err;
    throw {
      status: res.status,
      detail,
      message_ar: apiErrorMessage(res, detail),
    };
  }
  return res.json();
}

export async function adminLogin(
  username: string,
  password: string
): Promise<{ token: string; expires_in_hours: number }> {
  const res = await fetch(`${API_URL}/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, detail: err.detail || err };
  }
  return res.json();
}

export function fetchMetrics(
  token: string,
  from: string,
  to: string
): Promise<AdminMetrics> {
  const q = new URLSearchParams({ from, to });
  return adminFetch(`/admin/metrics?${q}`, token);
}

export function fetchOrders(
  token: string,
  params: {
    from?: string;
    to?: string;
    status?: string;
    search?: string;
    page?: number;
    page_size?: number;
  }
): Promise<{ items: AdminOrderListItem[]; total: number; page: number; page_size: number }> {
  const q = new URLSearchParams();
  if (params.from) q.set("from", params.from);
  if (params.to) q.set("to", params.to);
  if (params.status) q.set("status", params.status);
  if (params.search) q.set("search", params.search);
  if (params.page) q.set("page", String(params.page));
  if (params.page_size) q.set("page_size", String(params.page_size));
  return adminFetch(`/admin/orders?${q}`, token);
}

export function fetchOrderDetail(
  token: string,
  orderId: string
): Promise<AdminOrderDetail> {
  return adminFetch(`/admin/orders/${orderId}`, token);
}
