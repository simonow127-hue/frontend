"use client";

import { useCallback, useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import DateRangePicker from "@/components/admin/DateRangePicker";
import OrderDetailPanel from "@/components/admin/OrderDetailPanel";
import {
  fetchOrderDetail,
  fetchOrders,
  type AdminOrderDetail,
  type AdminOrderListItem,
} from "@/lib/admin-api";
import { getAdminToken } from "@/lib/admin-session";

function defaultRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 29);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

const STATUSES = ["", "new", "sent_to_sheet", "sheet_failed", "upsell_added", "sending_to_sheet"];

export default function AdminOrdersPage() {
  const [range, setRange] = useState(defaultRange);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<AdminOrderListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<AdminOrderDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setError("");
    try {
      const res = await fetchOrders(token, {
        from: range.from,
        to: range.to,
        status: status || undefined,
        search: search || undefined,
        page,
        page_size: 25,
      });
      setItems(res.items);
      setTotal(res.total);
    } catch (e: unknown) {
      const err = e as { message_ar?: string };
      setError(err.message_ar || "تعذر تحميل الطلبات.");
      setItems([]);
      setTotal(0);
    }
  }, [range.from, range.to, status, search, page]);

  useEffect(() => {
    load();
  }, [load]);

  async function openOrder(id: string) {
    setSelectedId(id);
    setDetailLoading(true);
    setDetail(null);
    const token = getAdminToken();
    if (!token) return;
    try {
      const data = await fetchOrderDetail(token, id);
      setDetail(data);
    } finally {
      setDetailLoading(false);
    }
  }

  function closeDetail() {
    setSelectedId(null);
    setDetail(null);
  }

  const totalPages = Math.max(1, Math.ceil(total / 25));

  return (
    <AdminGuard>
      <AdminShell>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500">{total} orders in range</p>
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-status-error">
            <p className="font-medium">{error}</p>
            <p className="mt-1 text-xs text-red-700/80">
              بدون PostgreSQL ما غادي يبان حتى طلب واحد. شغّل قاعدة البيانات و migration 0002.
            </p>
          </div>
        ) : null}

        <div className="mb-6 flex flex-col gap-4">
          <DateRangePicker
            from={range.from}
            to={range.to}
            onChange={(from, to) => {
              setRange({ from, to });
              setPage(1);
            }}
          />
          <div className="flex flex-wrap gap-3">
            <input
              type="search"
              placeholder="Search code, name, phone…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="min-w-[200px] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">All statuses</option>
              {STATUSES.filter(Boolean).map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 hidden md:table-cell">Source</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                items.map((o) => (
                  <tr
                    key={o.id}
                    className="cursor-pointer border-t border-slate-100 hover:bg-brand-cream/40"
                    onClick={() => openOrder(o.id)}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium text-brand-primary">
                      {o.order_code}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{o.customer_name}</p>
                      <p className="text-xs text-slate-500">{o.phone_e164}</p>
                    </td>
                    <td className="px-4 py-3 font-semibold">{o.total_mad} MAD</td>
                    <td className="px-4 py-3 hidden sm:table-cell capitalize text-xs">
                      {o.status.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-slate-500">
                      {o.has_ad_click ? "Paid" : o.utm_source || "Direct"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {new Date(o.created_at).toLocaleString("en-MA", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-slate-500">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-slate-200 px-3 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>

        {selectedId ? (
          <OrderDetailPanel order={detail} loading={detailLoading} onClose={closeDetail} />
        ) : null}
      </AdminShell>
    </AdminGuard>
  );
}
