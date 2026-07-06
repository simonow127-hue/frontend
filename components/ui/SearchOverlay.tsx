"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { X, Search } from "lucide-react";
import type { Product } from "@/lib/products";
import PriceDisplay from "@/components/ui/PriceDisplay";
import Image from "next/image";

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    import("@/lib/products").then((mod) => {
      if (active) setProducts(mod.PRODUCTS);
    });
    return () => {
      active = false;
    };
  }, []);

  const results = useMemo(() => {
    if (query.trim().length === 0) return [];
    return products
      .filter(
        (p) =>
          p.arabicName.includes(query) ||
          p.shortHeading.includes(query) ||
          p.subheading.includes(query)
      )
      .slice(0, 6);
  }, [products, query]);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl bg-brand-ivory rounded-2xl shadow-2xl overflow-hidden border border-brand-border">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-border">
          <Search size={18} className="text-brand-espresso/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن منتج..."
            dir="rtl"
            className="flex-1 bg-transparent text-brand-espresso placeholder:text-brand-espresso/40 text-base outline-none font-arabic"
          />
          <button onClick={onClose} className="p-1 hover:bg-brand-cream rounded-lg transition-colors">
            <X size={18} className="text-brand-espresso/60" />
          </button>
        </div>

        {results.length > 0 && (
          <ul className="divide-y divide-brand-border max-h-96 overflow-y-auto">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/products/${p.slug}`}
                  prefetch={false}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-brand-cream transition-colors text-right"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-cream shrink-0">
                    <Image
                      src={p.imagePlaceholder}
                      alt={p.arabicName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-brand-espresso text-sm truncate">{p.shortHeading.split(":")[0]}</p>
                    <p className="text-xs text-brand-espresso/60 truncate">{p.subheading}</p>
                  </div>
                  <PriceDisplay
                    price={p.offers[0].price}
                    compareAtPrice={p.offers[0].compareAtPrice}
                    size="sm"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query.trim().length > 0 && results.length === 0 && products.length > 0 && (
          <div className="py-10 text-center">
            <p className="text-brand-espresso/50 text-sm">لا توجد نتائج لـ &quot;{query}&quot;</p>
          </div>
        )}

        {query.trim().length === 0 && products.length > 0 && (
          <div className="px-4 py-4">
            <p className="text-xs font-bold text-brand-espresso/40 mb-3 text-right">منتجات مقترحة</p>
            <div className="flex flex-wrap gap-2 justify-end">
              {products.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  prefetch={false}
                  onClick={onClose}
                  className="text-xs bg-brand-cream border border-brand-border rounded-full px-3 py-1.5 text-brand-espresso hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  {p.shortHeading.split(":")[0].trim()}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
