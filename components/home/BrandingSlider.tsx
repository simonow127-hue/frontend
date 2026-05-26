"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import BrandMark from "@/components/brand/BrandMark";

type Slide = {
  id: string;
  eyebrow: string;
  headline: string;
  subline: string;
  accent: "primary" | "gold" | "olive";
  cta?: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    id: "brand",
    eyebrow: "للجمال رياض",
    headline: "عناية مغربية مختارة بعناية",
    subline: "رياض كيجمع عناية مركزة، اختيار موثوق، وتجربة طلب مريحة حتى لباب الدار.",
    accent: "primary",
    cta: { label: "اكتشف/ي الروتين", href: "/collections" },
  },
  {
    id: "promise",
    eyebrow: "وعد رياض",
    headline: "ماشي منتج عشوائي — روتين حقيقي",
    subline: "منتجات مختارة للروتين المغربي: ثقة، استمرارية، ومظهر مرتاح كل نهار.",
    accent: "gold",
  },
  {
    id: "routine",
    eyebrow: "الروتين المتكامل",
    headline: "جدر · نور · نقاء",
    subline: "شعر، بشرة، وانتعاش يومي — ثلاثة منتجات كيكملو بعضياتهم فروتين واحد.",
    accent: "olive",
    cta: { label: "شاهد/ي المنتجات", href: "/collections" },
  },
  {
    id: "trust",
    eyebrow: "ثقة قبل كل شي",
    headline: "علامة كتفهمك",
    subline: "إرشادات استعمال واضحة، مكونات معروفة، وطلب بسيط — اسم ورقم هاتف فقط.",
    accent: "primary",
    cta: { label: "من نحن", href: "/about" },
  },
];

const ACCENT_BG: Record<Slide["accent"], string> = {
  primary: "from-brand-primary/90 via-brand-primary/75 to-brand-espresso",
  gold: "from-brand-gold/80 via-brand-primary/70 to-brand-espresso",
  olive: "from-brand-olive/85 via-brand-primary/65 to-brand-espresso",
};

const INTERVAL_MS = 5500;

export default function BrandingSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative overflow-hidden border-b border-brand-primary/20"
      aria-roledescription="carousel"
      aria-label="سلايدر العلامة رياض"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={clsx(
          "relative min-h-[140px] md:min-h-[168px] transition-[background] duration-700 bg-gradient-to-l",
          ACCENT_BG[slide.accent]
        )}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #FFF9F2 1px, transparent 1px), radial-gradient(circle at 80% 50%, #FFF9F2 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />

        <div className="relative max-w-content mx-auto px-4 py-8 md:py-10">
          <div className="flex items-center justify-between gap-6">
            {/* Logo mark */}
            <div className="hidden sm:flex shrink-0 flex-col items-center gap-1">
              <BrandMark size="lg" />
              <span className="font-latin text-brand-cream/80 text-xs ltr-text tracking-widest">riads</span>
            </div>

            {/* Slide content */}
            <div className="flex-1 text-right min-w-0 relative min-h-[108px] md:min-h-[120px]">
              {SLIDES.map((s, i) => (
                <div
                  key={s.id}
                  className={clsx(
                    "transition-all duration-500 text-right",
                    i === active
                      ? "opacity-100 translate-y-0 relative z-10"
                      : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none z-0"
                  )}
                  aria-hidden={i !== active}
                >
                  <p className="text-brand-gold text-xs md:text-sm font-bold mb-1 tracking-wide">
                    {s.eyebrow}
                  </p>
                  <h2 className="font-arabic font-bold text-brand-ivory text-xl md:text-2xl lg:text-3xl leading-snug mb-2">
                    {s.headline}
                  </h2>
                  <p className="text-brand-cream/85 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">
                    {s.subline}
                  </p>
                  {s.cta && (
                    <Link
                      href={s.cta.href}
                      className={clsx(
                        "inline-block mt-4 text-sm font-bold text-brand-ivory bg-white/15 hover:bg-white/25 border border-brand-cream/30 rounded-full px-5 py-2 transition-colors",
                        i !== active && "invisible"
                      )}
                      tabIndex={i === active ? 0 : -1}
                    >
                      {s.cta.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop nav arrows */}
            <div className="hidden md:flex shrink-0 flex-col gap-2">
              <button
                type="button"
                onClick={prev}
                className="w-9 h-9 rounded-full bg-brand-ivory/15 hover:bg-brand-ivory/25 text-brand-ivory flex items-center justify-center transition-colors"
                aria-label="الشريحة السابقة"
              >
                ›
              </button>
              <button
                type="button"
                onClick={next}
                className="w-9 h-9 rounded-full bg-brand-ivory/15 hover:bg-brand-ivory/25 text-brand-ivory flex items-center justify-center transition-colors"
                aria-label="الشريحة التالية"
              >
                ‹
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="شرائح العلامة">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${s.headline} — شريحة ${i + 1}`}
                onClick={() => goTo(i)}
                className={clsx(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-8 bg-brand-gold" : "w-2 bg-brand-cream/40 hover:bg-brand-cream/60"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
