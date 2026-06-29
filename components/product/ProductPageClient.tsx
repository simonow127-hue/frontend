"use client";
import { useState, useEffect, useRef } from "react";
import { Product, getOfferByPieces, getCrossSells, getProductSectionImage } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { useCartStore } from "@/lib/cart";
import { generateFreshEventId, getOrCreateEventId } from "@/lib/events";
import { trackViewContent, trackAddToCart } from "@/lib/tracking";
import { trackEvent } from "@/lib/api";
import OfferSelector from "./OfferSelector";
import Button from "@/components/ui/Button";
import ProductCard from "./ProductCard";
import TrustBadges from "@/components/ui/TrustBadges";
import ProductImage from "@/components/ui/ProductImage";
import { ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, MessageSquare, Globe, Zap } from "lucide-react";
import Stars from "@/components/ui/Stars";

interface FAQItemProps {
  q: string;
  a: string;
}

function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-right font-bold text-brand-espresso hover:text-brand-primary transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
        <span>{q}</span>
      </button>
      {open && <p className="pb-4 text-brand-espresso/70 text-sm leading-relaxed text-right">{a}</p>}
    </div>
  );
}

function useCountdown(minutes: number) {
  const getInitialSeconds = () => {
    if (typeof window === "undefined") return minutes * 60;
    const key = `countdown_${minutes}`;
    const saved = sessionStorage.getItem(key);
    if (saved) return parseInt(saved, 10);
    const initial = minutes * 60;
    sessionStorage.setItem(key, String(initial));
    return initial;
  };
  const [seconds, setSeconds] = useState(getInitialSeconds);
  useEffect(() => {
    const key = `countdown_${minutes}`;
    const t = setInterval(() => {
      setSeconds((s) => {
        const next = s > 0 ? s - 1 : minutes * 60;
        sessionStorage.setItem(key, String(next));
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [minutes]);
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedPieces, setSelectedPieces] = useState<1 | 2 | 3>(product.defaultOffer);
  const { addItem, openDrawer, openCheckout } = useCartStore();
  const [isSticky, setIsSticky] = useState(false);
  const offerRef = useRef<HTMLDivElement>(null);
  const crossSells = getCrossSells(product);
  const countdown = useCountdown(17);
  const stock = 9;

  useEffect(() => {
    const eventId = getOrCreateEventId("viewContent");
    const offer3 = product.offers.find((o) => o.pieces === 3)!;
    trackViewContent({ id: product.id, name: product.arabicName, price: offer3.price }, eventId);
    trackEvent({ event_name: "ViewContent", event_id: eventId, payload: { product_id: product.id } });
  }, [product]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (offerRef.current) observer.observe(offerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    const offer = getOfferByPieces(product, selectedPieces);
    addItem(product, offer);
    const eventId = generateFreshEventId("addToCart");
    trackAddToCart({ id: product.id, name: product.arabicName, price: offer.price }, eventId);
    trackEvent({ event_name: "AddToCart", event_id: eventId, payload: { product_id: product.id, pieces: selectedPieces } });
    openDrawer();
  };

  const handleBuyNow = () => {
    const offer = getOfferByPieces(product, selectedPieces);
    addItem(product, offer);
    const eventId = generateFreshEventId("addToCart");
    trackAddToCart({ id: product.id, name: product.arabicName, price: offer.price }, eventId);
    trackEvent({ event_name: "AddToCart", event_id: eventId, payload: { product_id: product.id, pieces: selectedPieces } });
    openCheckout();
  };

  const selectedOffer = getOfferByPieces(product, selectedPieces);

  return (
    <div className="min-h-screen">
      {/* Hero / Above the fold */}
      <section className="max-w-content mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Product image (left in RTL on desktop) */}
          <div className="order-1 md:order-2">
            <ProductImage
              src={product.imagePlaceholder}
              alt={product.arabicName}
              aspect="square"
              className="shadow-lg ring-1 ring-brand-border/60"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product info (right in RTL on desktop) */}
          <div className="order-2 md:order-1 flex flex-col gap-5">
            <div>
              <h1 className="font-arabic font-bold text-brand-espresso text-2xl md:text-3xl leading-snug">
                {product.emotionalHeadline}
              </h1>
              <p className="text-brand-espresso/70 mt-2 text-base">{product.subheading}</p>
            </div>

            {/* Pain bullets */}
            <ul className="flex flex-col gap-2">
              {product.painBullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-espresso/80">{b}</span>
                </li>
              ))}
            </ul>

            {/* Offer selector */}
            <div ref={offerRef}>
              <h2 className="font-bold text-brand-espresso mb-3">اختر العرض</h2>
              <OfferSelector
                offers={product.offers}
                selected={selectedPieces}
                onChange={setSelectedPieces}
              />
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleBuyNow}
                className="w-full py-4 px-6 rounded-2xl bg-brand-primary text-white font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Zap size={20} fill="currentColor" />
                اشتري الحين — {formatPrice(selectedOffer.price)}
              </button>
              <Button onClick={handleAddToCart} fullWidth size="lg" variant="secondary" className="text-base">
                أضف للسلة
              </Button>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-2 justify-center">
              <ShieldCheck size={16} className="text-status-success" />
              <span className="text-sm text-brand-espresso/70">الدفع عند الاستلام · توصيل لكل المملكة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-brand-cream border-y border-brand-border py-8">
        <div className="max-w-content mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Pain mirror - Image Left, Text Right */}
      <section className="max-w-content mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <ProductImage
              src={product.imagePlaceholder}
              alt={`${product.shortHeading.split(":")[0]} — المنتج`}
              aspect="square"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2 text-right">
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">
              تعاني من نفس المشكلة؟
            </h2>
            <ul className="flex flex-col gap-4 mb-6">
              {product.painBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-status-error font-bold mt-1 text-lg">✕</span>
                  <span className="text-brand-espresso/80 text-lg leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="text-brand-primary font-bold text-xl leading-relaxed">
              {product.shortHeading} هو الحل اللي صممناه خصيصاً لهالمشاكل.
            </p>
          </div>
        </div>
      </section>

      {/* Mechanism & Science - Text Left, Image Right */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-content mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-right">
            <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              تفاصيل المنتج
            </span>
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">
              كيف يشتغل {product.shortHeading.split(":")[0]}؟
            </h2>
            <p className="text-brand-espresso/80 text-lg leading-loose mb-6">
              {product.mechanism}
            </p>
            <div className="flex items-center gap-3 bg-brand-ivory p-4 rounded-xl border border-brand-border">
              <ShieldCheck className="text-status-success shrink-0" size={24} />
              <p className="text-sm text-brand-espresso/80 font-bold">
                تم تطويره بعناية لضمان فعالية حقيقية دون ادعاءات مبالغ فيها.
              </p>
            </div>
          </div>
          <ProductImage
            src={getProductSectionImage(product, "science")}
            alt={`${product.shortHeading.split(":")[0]} — المنتج`}
            aspect="square"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Ingredients - Image Left, Cards Right */}
      <section className="max-w-content mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <ProductImage
              src={getProductSectionImage(product, "ingredients")}
              alt="المكونات الطبيعية"
              aspect="square"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2 text-right">
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">
              المميزات اللي تفرق
            </h2>
            <p className="text-brand-espresso/70 mb-8 text-lg">
              اخترنا لك أفضل المواصفات عشان تجربة استخدام مريحة ونتيجة تليق فيك.
            </p>
            <div className="flex flex-col gap-4">
              {product.ingredients.map((ing) => (
                <div key={ing.name} className="bg-brand-cream rounded-2xl p-5 flex items-start gap-4 border border-brand-border">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-brand-primary font-bold text-xl">✦</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-espresso text-lg mb-1">{ing.name}</h3>
                    <p className="text-base text-brand-espresso/70 leading-relaxed">{ing.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage - Text Left, Image Right */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-content mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-right">
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">
              طريقة الاستعمال (روتين سهل)
            </h2>
            <div className="flex flex-col gap-6">
              {product.usageSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-brand-ivory flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                    {i + 1}
                  </div>
                  <p className="text-brand-espresso/80 text-lg pt-1.5 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <ProductImage
            src={getProductSectionImage(product, "usage")}
            alt="طريقة الاستعمال"
            aspect="square"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Reviews section */}
      <section className="max-w-content mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="font-arabic font-bold text-2xl text-brand-espresso mb-2">
            آراء الزبائن
          </h2>
          {product.reviews.length > 0 && (
            <p className="text-brand-espresso/55 text-sm flex items-center justify-center gap-1.5">
              <Globe size={14} className="shrink-0" />
              تقييمات ومراجعات حقيقية مُجمَّعة من مستخدمين حول العالم لنفس المنتج.
            </p>
          )}
        </div>

        {product.reviews.length > 0 ? (
          <>
            {/* Review cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.reviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-brand-ivory rounded-2xl p-5 flex flex-col gap-3 border border-brand-border text-right shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <Stars rating={review.rating} size="sm" />
                    <div className="flex items-center gap-1.5">
                      {review.flag && <span className="text-base leading-none">{review.flag}</span>}
                      <span className="font-bold text-brand-espresso text-sm">{review.name}</span>
                    </div>
                  </div>
                  <p className="text-brand-espresso/80 text-sm leading-relaxed flex-1">{review.text}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-brand-border/60">
                    {review.date && (
                      <span className="text-xs text-brand-espresso/40">{review.date}</span>
                    )}
                    {review.verified && (
                      <div className="flex items-center gap-1">
                        <ShieldCheck size={11} className="text-status-success" />
                        <span className="text-xs text-status-success font-medium">مشتري موثّق</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto bg-brand-cream rounded-2xl p-8 text-center flex flex-col items-center gap-3">
            <MessageSquare size={32} className="text-brand-primary/30" />
            <p className="font-bold text-brand-espresso">شارك معنا تجربتك مع {product.shortHeading.split(":")[0]}</p>
            <p className="text-brand-espresso/60 text-sm">
              اطلب المنتج، جربه، وشارك رأيك الحقيقي عبر الإيميل.
            </p>
            <a
              href="mailto:riads.shop@gmail.com"
              className="inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-brand-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              راسلنا
            </a>
          </div>
        )}
      </section>

      {/* Offer stack CTA */}
      <section className="bg-brand-cream py-12">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-arabic font-bold text-2xl text-brand-espresso text-center mb-6">
            اختر عرضك الحين
          </h2>
          <div className="max-w-md mx-auto flex flex-col gap-4">
            <OfferSelector
              offers={product.offers}
              selected={selectedPieces}
              onChange={setSelectedPieces}
            />
            <button
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-2xl bg-brand-primary text-white font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Zap size={20} fill="currentColor" />
              اشتري الحين — {formatPrice(selectedOffer.price)}
            </button>
            <Button onClick={handleAddToCart} fullWidth size="lg" variant="secondary">
              أضف للسلة فقط
            </Button>
            <p className="text-center text-xs text-brand-espresso/50">
              الدفع عند الاستلام · تأكيد بالجوال · توصيل لكل المملكة
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sells */}
      {crossSells.length > 0 && (
        <section className="max-w-content mx-auto px-4 py-12">
          <h2 className="font-arabic font-bold text-2xl text-brand-espresso text-center mb-2">
            قد يعجبك كمان
          </h2>
          <p className="text-center text-brand-espresso/60 mb-8">
            منتجات مختارة تكمل طلبك — من رياض
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {crossSells.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-brand-cream py-12">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-arabic font-bold text-2xl text-brand-espresso text-center mb-8">
            الأسئلة الشائعة
          </h2>
          <div className="max-w-2xl mx-auto bg-brand-ivory rounded-2xl px-6 divide-y divide-brand-border">
            {product.faqs.map((faq) => (
              <FAQItem key={faq.question} q={faq.question} a={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      {isSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-brand-ivory border-t border-brand-border px-4 py-3 shadow-xl animate-fade-in">
          <div className="max-w-content mx-auto flex items-center gap-3">
            <div className="text-right flex-1 min-w-0">
              <p className="font-bold text-brand-espresso text-sm truncate">{product.shortHeading.split(":")[0]}</p>
              <p className="text-xs text-brand-espresso/60">{formatPrice(selectedOffer.price)}</p>
            </div>
            <button
              onClick={handleBuyNow}
              className="shrink-0 py-2.5 px-5 rounded-xl bg-brand-primary text-white font-bold text-sm flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              <Zap size={15} fill="currentColor" />
              اشتري الحين
            </button>
            <Button onClick={handleAddToCart} size="sm" variant="secondary" className="shrink-0 border">
              السلة
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
