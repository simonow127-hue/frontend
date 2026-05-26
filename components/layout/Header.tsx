"use client";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart";
import RiadsLogo from "@/components/brand/RiadsLogo";

const navLinks = [
  { href: "/collections", label: "المنتجات" },
  { href: "/products/jadr-hair-serum", label: "جدر" },
  { href: "/products/nour-skin-serum", label: "نور" },
  { href: "/products/naqaa-roll-on", label: "نقاء" },
  { href: "/about", label: "من نحن" },
];

export default function Header() {
  const { getTotalItems, openDrawer } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-content mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo + name — يمين في RTL */}
        <RiadsLogo variant="header" />

        {/* Nav + تواصل معنا — الوسط */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-brand-espresso/80 hover:text-brand-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-bold text-brand-primary hover:text-brand-espresso transition-colors border border-brand-primary/30 rounded-full px-4 py-1.5 hover:bg-brand-primary/5"
          >
            تواصل معنا
          </Link>
        </nav>

        {/* Cart + mobile menu — يسار في RTL */}
        <div className="flex items-center gap-2 ms-auto md:ms-0">
          <button
            onClick={openDrawer}
            aria-label="فتح سلة التسوق"
            className="relative p-2 rounded-full hover:bg-brand-cream transition-colors"
          >
            <ShoppingBag size={22} className="text-brand-espresso" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-brand-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-brand-cream transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-brand-ivory border-t border-brand-border animate-fade-in">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base font-medium text-brand-espresso py-2 border-b border-brand-border/50 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-base font-bold text-brand-primary py-2"
              onClick={() => setMenuOpen(false)}
            >
              تواصل معنا
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
