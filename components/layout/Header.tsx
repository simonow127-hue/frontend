"use client";
import Link from "next/link";
import { ShoppingBag, Menu, X, ChevronDown, Truck, Search, Star, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/cart";
import BrandWordmark from "@/components/brand/BrandWordmark";
import { CATEGORIES } from "@/lib/categories";
import SearchOverlay from "@/components/ui/SearchOverlay";

const navLinks = [
  { href: "/collections", label: "كل المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

const announcements = [
  { icon: Truck, text: "توصيل سريع لكل مناطق المملكة", highlight: "٢–٤ أيام عمل" },
  { icon: Star, text: "تقييمات حقيقية من مستخدمين حول العالم", highlight: "موثّقة" },
  { icon: Globe, text: "الدفع عند الاستلام متاح", highlight: "بدون بطاقة" },
];

export default function Header() {
  const { getTotalItems, openDrawer } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [annoIdx, setAnnoIdx] = useState(0);
  const itemCount = getTotalItems();

  useEffect(() => {
    const t = setInterval(() => setAnnoIdx((i) => (i + 1) % announcements.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar — rotating */}
      <div className="bg-brand-gold text-brand-primary text-center py-2 px-4 text-xs font-medium overflow-hidden h-8 flex items-center justify-center">
        {announcements.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="absolute flex items-center gap-2 transition-all duration-500"
              style={{
                opacity: i === annoIdx ? 1 : 0,
                transform: i === annoIdx ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <Icon size={12} className="text-brand-primary/60 shrink-0" />
              <span>
                {a.text} •{" "}
                <span className="font-black">{a.highlight}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Main header */}
      <header className="bg-brand-ivory border-b border-brand-border shadow-sm">
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
                className="flex items-center gap-1 text-sm font-semibold text-brand-espresso/80 hover:text-brand-primary transition-colors"
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
                className="text-sm font-semibold text-brand-espresso/80 hover:text-brand-primary transition-colors relative group"
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
              className="p-2.5 rounded-full hover:bg-brand-cream transition-colors"
            >
              <Search size={20} className="text-brand-espresso" />
            </button>

            <button
              onClick={openDrawer}
              aria-label="فتح سلة التسوق"
              className="relative p-2.5 rounded-full hover:bg-brand-cream transition-colors"
            >
              <ShoppingBag size={21} className="text-brand-espresso" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 bg-brand-gold text-brand-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile burger */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-brand-cream transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              {menuOpen ? <X size={20} className="text-brand-espresso" /> : <Menu size={20} className="text-brand-espresso" />}
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
