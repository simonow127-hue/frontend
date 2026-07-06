"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ChevronDown, Search, Truck, Star, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/cart";
import BrandWordmark from "@/components/brand/BrandWordmark";
import { CATEGORIES } from "@/lib/categories";
import { useHeaderTheme } from "@/lib/useHeaderTheme";
import { clsx } from "clsx";

const SearchOverlay = dynamic(() => import("@/components/ui/SearchOverlay"), { ssr: false });

const navLinks = [
  { href: "/collections", label: "كل المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

const announcements = [
  {
    icon: Truck,
    text: "توصيل سريع لكل مناطق المملكة",
    highlight: "٣–٥ أيام توصيل",
  },
  {
    icon: Star,
    text: "تقييمات حقيقية من مستخدمين حول العالم",
    highlight: "موثّقة",
  },
  {
    icon: Globe,
    text: "الدفع عند الاستلام متاح",
    highlight: "بدون بطاقة",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { getTotalItems, openDrawer } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [annoIdx, setAnnoIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const overDark = useHeaderTheme(pathname);
  const itemCount = getTotalItems();

  const useLightChrome = overDark && !menuOpen;

  useEffect(() => {
    setMenuOpen(false);
    setCatOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAnnoIdx((i) => (i + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);

  const iconClass = clsx(
    "transition-colors duration-300",
    useLightChrome ? "text-brand-ivory" : "text-brand-espresso"
  );
  const navLinkClass = clsx(
    "transition-colors duration-300",
    useLightChrome
      ? "text-brand-champagne/90 hover:text-brand-gold"
      : "text-brand-espresso/80 hover:text-brand-primary"
  );
  const actionBtnClass = clsx(
    "transition-colors duration-300",
    useLightChrome ? "hover:bg-white/10" : "hover:bg-brand-cream/80"
  );

  const headerSurfaceClass = clsx(
    "border-b transition-all duration-300",
    scrolled
      ? useLightChrome
        ? "bg-[rgba(30,53,32,0.72)] backdrop-blur-lg border-[#C9A45C]/20 shadow-[0_4px_24px_rgba(10,22,11,0.25)]"
        : "bg-[rgba(250,250,248,0.88)] backdrop-blur-xl border-brand-border/40 shadow-[0_4px_24px_rgba(26,26,26,0.06)]"
      : useLightChrome
        ? "bg-transparent border-white/10"
        : "bg-transparent border-brand-border/30"
  );

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar — icon + full message per slide */}
      <div className="relative bg-brand-gold text-brand-primary py-2.5 px-3 sm:px-4 overflow-hidden min-h-[44px]">
        {announcements.map((a, i) => {
          const Icon = a.icon;
          const isActive = i === annoIdx;
          return (
            <div
              key={a.text}
              className={clsx(
                "absolute inset-0 flex items-center justify-center gap-2.5 transition-all duration-500 px-2 sm:px-4",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              )}
              aria-hidden={!isActive}
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-brand-primary/10 border border-brand-primary/15 flex items-center justify-center">
                <Icon size={14} className="text-brand-primary" strokeWidth={2.25} />
              </span>
              <span className="text-center leading-snug text-[11px] sm:text-xs font-medium font-arabic max-w-[min(100%,22rem)]">
                {a.text}{" "}
                <span className="font-black whitespace-nowrap">• {a.highlight}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Main header — glass background on scroll, transparent at top */}
      <header className={headerSurfaceClass}>
        <div className="max-w-content mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <BrandWordmark asLink size="md" />

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-7">
            {/* Categories dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCatOpen(!catOpen)}
                onBlur={() => setTimeout(() => setCatOpen(false), 150)}
                className={clsx(
                  "flex items-center gap-1 text-sm font-semibold transition-colors",
                  navLinkClass
                )}
              >
                التصنيفات
                <ChevronDown size={14} className={`transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full mt-3 right-0 w-52 bg-brand-ivory border border-brand-border rounded-2xl shadow-2xl py-2 z-50 animate-fade-in">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      href={`/collections?category=${c.slug}`}
                      className="flex items-center px-4 py-2.5 text-sm text-brand-espresso hover:bg-brand-cream hover:text-brand-gold transition-colors font-medium"
                      onClick={() => setCatOpen(false)}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "text-sm font-semibold transition-colors relative group",
                  navLinkClass
                )}
              >
                {l.label}
                <span className="absolute -bottom-0.5 right-0 left-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Search overlay */}
          {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

          {/* Actions */}
          <div className="flex items-center gap-2 ms-auto md:ms-0">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="بحث"
              className={clsx("p-2.5 rounded-full transition-colors", actionBtnClass)}
            >
              <Search size={20} className={iconClass} />
            </button>

            <button
              onClick={openDrawer}
              aria-label="فتح سلة التسوق"
              className={clsx("relative p-2.5 rounded-full transition-colors", actionBtnClass)}
            >
              <ShoppingBag size={21} className={iconClass} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 bg-brand-gold text-brand-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile burger */}
            <button
              className={clsx("md:hidden p-2 rounded-full transition-colors", actionBtnClass)}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              {menuOpen ? <X size={20} className={iconClass} /> : <Menu size={20} className={iconClass} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-brand-ivory border-t border-brand-border animate-fade-in">
            <nav className="px-4 py-4 flex flex-col gap-1">
              <p className="text-[10px] font-black text-brand-gold px-2 py-2 tracking-widest uppercase">التصنيفات</p>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/collections?category=${c.slug}`}
                  className="text-base text-brand-espresso font-medium py-2.5 px-3 rounded-xl hover:bg-brand-cream hover:text-brand-gold transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
              <div className="border-t border-brand-border my-2" />
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-base font-semibold text-brand-espresso py-2.5 px-3 rounded-xl hover:bg-brand-cream transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
