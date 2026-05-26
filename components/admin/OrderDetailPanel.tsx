"use client";

import type { AdminOrderDetail } from "@/lib/admin-api";

type Props = {
  order: AdminOrderDetail | null;
  loading: boolean;
  onClose: () => void;
};

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-2 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="max-w-[60%] text-right font-medium text-slate-800 break-all">{value}</span>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  sent_to_sheet: "bg-emerald-100 text-emerald-800",
  sending_to_sheet: "bg-amber-100 text-amber-800",
  sheet_failed: "bg-red-100 text-red-800",
  upsell_added: "bg-violet-100 text-violet-800",
};

export default function OrderDetailPanel({ order, loading, onClose }: Props) {
  if (!order && !loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" dir="ltr">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <aside className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xs text-slate-500">Order</p>
            <h2 className="text-lg font-semibold text-slate-900">
              {loading ? "Loading…" : order?.order_code}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <p className="text-sm text-slate-500">Fetching order…</p>
          ) : order ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    STATUS_COLORS[order.status] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {order.status.replace(/_/g, " ")}
                </span>
                {order.upsell_added ? (
                  <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-medium text-brand-espresso">
                    Upsell
                  </span>
                ) : null}
              </div>

              <section className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <h3 className="text-sm font-semibold text-slate-800">Customer</h3>
                <p className="mt-2 text-lg font-medium">{order.customer_name}</p>
                <p className="text-brand-primary font-mono text-sm">{order.phone_e164}</p>
                <p className="text-xs text-slate-500 mt-1">{order.phone_raw}</p>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">Items</h3>
                <ul className="space-y-3">
                  {order.items.map((item, i) => (
                    <li
                      key={`${item.product_id}-${i}`}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex justify-between gap-2">
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="font-semibold text-brand-primary">{item.total} MAD</p>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Qty {item.quantity} · {item.offer_pieces} pc bundle · {item.unit_bundle_price}{" "}
                        MAD/unit
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl bg-brand-espresso p-4 text-white">
                <div className="flex justify-between text-sm opacity-80">
                  <span>Subtotal</span>
                  <span>{order.subtotal_mad} MAD</span>
                </div>
                <div className="flex justify-between text-sm opacity-80 mt-1">
                  <span>Shipping</span>
                  <span>{order.shipping_mad} MAD</span>
                </div>
                <div className="mt-3 flex justify-between border-t border-white/20 pt-3 text-lg font-semibold">
                  <span>Total (COD)</span>
                  <span>{order.total_mad} MAD</span>
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold text-slate-800">Attribution</h3>
                <Row label="UTM Source" value={order.source.utm_source} />
                <Row label="UTM Campaign" value={order.source.utm_campaign} />
                <Row label="Meta click" value={order.source.fbclid} />
                <Row label="TikTok click" value={order.source.ttclid} />
                <Row label="Snap click" value={order.source.sc_click_id} />
                <Row label="Landing" value={order.source.landing_url} />
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold text-slate-800">Technical</h3>
                <Row label="IP" value={order.client_ip} />
                <Row label="Event ID" value={order.event_id} />
                <Row
                  label="Created"
                  value={new Date(order.created_at).toLocaleString("en-MA")}
                />
                <Row
                  label="Sheet sent"
                  value={
                    order.sheet_sent_at
                      ? new Date(order.sheet_sent_at).toLocaleString("en-MA")
                      : "—"
                  }
                />
              </section>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
