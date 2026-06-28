import Link from "next/link";
import BrandWordmark from "@/components/brand/BrandWordmark";
import { CATEGORIES } from "@/lib/categories";
import { PRODUCTS } from "@/lib/products";
import { MapPin, Phone, ShieldCheck } from "lucide-react";

const paymentMethods = [
  { label: "الدفع نقداً", abbr: "COD" },
  { label: "فيزا", abbr: "VISA" },
  { label: "مدى", abbr: "mada" },
  { label: "STC Pay", abbr: "STC" },
  { label: "Apple Pay", abbr: "⎆" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-cream">
      {/* Trust bar */}
      <div className="border-b border-brand-cream/10">
        <div className="max-w-content mx-auto px-4 py-6 flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { icon: ShieldCheck, text: "دفع آمن عند الاستلام" },
            { icon: Phone, text: "دعم عبر الواتساب" },
            { icon: MapPin, text: "توصيل لكل المملكة" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-brand-cream/70">
              <item.icon size={16} className="text-brand-gold" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-content mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <BrandWordmark asLink size="sm" />
            <p className="text-sm text-brand-cream/65 leading-relaxed">
              متجر سعودي يجمع منتجات مختارة بجودة عالية.
              توصيل سريع، دفع عند الاستلام، وخدمة عملاء تهمّك.
            </p>
            {/* Payment badges */}
            <div className="flex flex-wrap gap-2 mt-1">
              {paymentMethods.map((m) => (
                <span
                  key={m.abbr}
                  className="text-[10px] font-bold border border-brand-cream/15 rounded-lg px-2.5 py-1.5 text-brand-cream/60 hover:border-brand-gold/40 hover:text-brand-gold transition-colors"
                >
                  {m.abbr}
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4 text-sm tracking-wide">التصنيفات</h4>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections?category=${c.slug}`}
                    className="text-sm text-brand-cream/65 hover:text-brand-gold transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured products */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4 text-sm tracking-wide">منتجات مميزة</h4>
            <ul className="flex flex-col gap-2.5">
              {PRODUCTS.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm text-brand-cream/65 hover:text-brand-gold transition-colors line-clamp-1"
                  >
                    {p.shortHeading.split(":")[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4 text-sm tracking-wide">المساعدة</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/shipping", label: "سياسة التوصيل" },
                { href: "/refund-policy", label: "الاسترجاع والاستبدال" },
                { href: "/privacy", label: "سياسة الخصوصية" },
                { href: "/terms", label: "الشروط والأحكام" },
                { href: "/contact", label: "تواصل معنا" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brand-cream/65 hover:text-brand-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-cream/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-cream/35">
          <p>المملكة العربية السعودية · الدفع عند الاستلام متاح في كل المناطق</p>
          <p>© {new Date().getFullYear()} رياض. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
