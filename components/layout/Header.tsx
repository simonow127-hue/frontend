"use client";
import Link from "next/link";
import { ShoppingBag, Menu, X, ChevronDown, Truck } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart";
import BrandMark from "@/components/brand/BrandMark";
import { CATEGORIES } from "@/lib/categories";

const navLinks = [
  { href: "/collections", label: "كل المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const { getTotalItems, openDrawer } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const itemCount = getTotalItems();

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-brand-primary text-brand-champagne text-center py-2 px-4 text-xs font-medium flex items-center justify-center gap-2">
        <Truck size={12} className="text-brand-gold shrink-0" />
        <span>
          توصيل سريع لكل مناطق المملكة •{" "}
          <span className="text-brand-gold font-bold">الدفع عند الاستلام متاح</span>
        </span>
      </div>

      {/* Main header */}
      <header className="bg-brand-ivory/97 backdrop-blur-md border-b border-brand-border shadow-sm">
        <div className="max-w-content mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <BrandMark size="md" />
            <div className="flex flex-col items-end leading-none">
              <span className="font-arabic font-black text-brand-gold text-base tracking-tight">رياض</span>
              <span className="font-latin text-brand-gold/60 text-[9px] ltr-text tracking-[0.25em]">STORE</span>
            </div>
          </Link>

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

          {/* Actions */}
          <div className="flex items-center gap-2 ms-auto md:ms-0">
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
