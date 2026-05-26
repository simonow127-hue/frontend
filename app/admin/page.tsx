"use client";

import { useCallback, useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import DateRangePicker from "@/components/admin/DateRangePicker";
import KpiCard from "@/components/admin/KpiCard";
import { fetchMetrics, type AdminMetrics } from "@/lib/admin-api";
import { getAdminToken } from "@/lib/admin-session";

function defaultRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 6);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

export default function AdminDashboardPage() {
  const [range, setRange] = useState(defaultRange);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setError("");
    try {
      const data = await fetchMetrics(token, range.from, range.to);
      setMetrics(data);
    } catch (e: unknown) {
      const err = e as { message_ar?: string };
      setError(err.message_ar || "تعذر تحميل المؤشرات.");
    }
  }, [range.from, range.to]);

  useEffect(() => {
    load();
  }, [load]);

  const maxDaily = Math.max(
    ...(metrics?.daily.map((d) => Math.max(d.orders, d.sessions, d.clicks)) || [1]),
    1
  );

  return (
    <AdminGuard>
      <AdminShell>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">
              Metrics count valid Morocco traffic only (no VPN/proxy). Orders already geo-verified at checkout.
            </p>
          </div>
          <DateRangePicker
            from={range.from}
            to={range.to}
            onChange={(from, to) => setRange({ from, to })}
          />
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-status-error">
            <p className="font-medium">{error}</p>
            <p className="mt-1 text-xs text-red-700/80">
              شغّل PostgreSQL: <code className="rounded bg-white px-1">docker compose up -d</code> ثم{" "}
              <code className="rounded bg-white px-1">alembic upgrade head</code>
            </p>
          </div>
        ) : null}

        {metrics ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard label="Ad clicks" value={String(metrics.clicks)} hint="Valid MA IPs" accent />
              <KpiCard label="Sessions" value={String(metrics.sessions)} />
              <KpiCard label="Orders" value={String(metrics.orders)} />
              <KpiCard
                label="Revenue"
                value={`${metrics.revenue_mad.toLocaleString()} MAD`}
                accent
              />
              <KpiCard
                label="Conversion"
                value={`${metrics.conversion_rate}%`}
                hint="Orders ÷ clicks (or sessions)"
              />
              <KpiCard label="AOV" value={`${metrics.average_order_value_mad} MAD`} />
              <KpiCard label="Upsell rate" value={`${metrics.upsell_rate}%`} />
              <KpiCard
                label="Blocked events"
                value={String(metrics.blocked_events)}
                hint="VPN / non-MA / bot"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <KpiCard label="Product views" value={String(metrics.product_views)} />
              <KpiCard label="Add to cart" value={String(metrics.add_to_carts)} />
              <KpiCard label="Checkouts started" value={String(metrics.checkouts)} />
            </div>

            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">Daily trend</h2>
              <div className="mt-6 flex items-end gap-2 overflow-x-auto pb-2">
                {metrics.daily.map((d) => (
                  <div key={d.date} className="flex min-w-[48px] flex-col items-center gap-1">
                    <div className="flex h-32 w-10 items-end justify-center gap-0.5">
                      <div
                        className="w-3 rounded-t bg-brand-rose"
                        style={{ height: `${(d.clicks / maxDaily) * 100}%`, minHeight: d.clicks ? 4 : 0 }}
                        title={`Clicks: ${d.clicks}`}
                      />
                      <div
                        className="w-3 rounded-t bg-brand-olive/60"
                        style={{
                          height: `${(d.sessions / maxDaily) * 100}%`,
                          minHeight: d.sessions ? 4 : 0,
                        }}
                        title={`Sessions: ${d.sessions}`}
                      />
                      <div
                        className="w-3 rounded-t bg-brand-primary"
                        style={{ height: `${(d.orders / maxDaily) * 100}%`, minHeight: d.orders ? 4 : 0 }}
                        title={`Orders: ${d.orders}`}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {d.date.slice(5)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded bg-brand-rose" /> Clicks
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded bg-brand-olive/60" /> Sessions
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded bg-brand-primary" /> Orders
                </span>
              </div>
            </section>

            <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-800">By channel</h2>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Channel</th>
                    <th className="px-6 py-3">Clicks</th>
                    <th className="px-6 py-3">Orders</th>
                    <th className="px-6 py-3">Revenue</th>
                    <th className="px-6 py-3">Conv.</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.by_channel.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No channel data in this range
                      </td>
                    </tr>
                  ) : (
                    metrics.by_channel.map((row) => (
                      <tr key={row.channel} className="border-t border-slate-100">
                        <td className="px-6 py-3 font-medium capitalize">{row.channel}</td>
                        <td className="px-6 py-3">{row.clicks}</td>
                        <td className="px-6 py-3">{row.orders}</td>
                        <td className="px-6 py-3">{row.revenue_mad.toLocaleString()} MAD</td>
                        <td className="px-6 py-3">{row.conversion_rate}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>
          </>
        ) : (
          <p className="text-sm text-slate-500">Loading metrics…</p>
        )}
      </AdminShell>
    </AdminGuard>
  );
}
