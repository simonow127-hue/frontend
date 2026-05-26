"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminToken } from "@/lib/admin-session";

const NAV = [
  { href: "/admin", label: "Dashboard", short: "Stats" },
  { href: "/admin/orders", label: "Orders", short: "Orders" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    clearAdminToken();
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 sm:pb-0" dir="ltr">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link
              href="/admin"
              className="font-latin text-xl font-semibold tracking-tight text-brand-primary"
            >
              riads <span className="text-sm font-normal text-slate-500">Admin</span>
            </Link>
            <nav className="hidden gap-1 sm:flex">
              {NAV.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-brand-cream text-brand-primary"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>

      {/* Mobile bottom nav — Orders was hidden before on small screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white sm:hidden">
        <div className="grid grid-cols-2">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-3 text-xs font-semibold ${
                  active ? "text-brand-primary" : "text-slate-500"
                }`}
              >
                <span className="text-base">{item.short === "Stats" ? "📊" : "📦"}</span>
                {item.short}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
