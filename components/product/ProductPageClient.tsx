"use client";
import { useState, useEffect, useRef } from "react";
import { Product, getOfferByPieces, getCrossSells } from "@/lib/products";
import { useCartStore } from "@/lib/cart";
import { generateFreshEventId, getOrCreateEventId } from "@/lib/events";
import { trackViewContent, trackAddToCart } from "@/lib/tracking";
import { trackEvent } from "@/lib/api";
import OfferSelector from "./OfferSelector";
import Button from "@/components/ui/Button";
import ProductCard from "./ProductCard";
import TrustBadges from "@/components/ui/TrustBadges";
import ProductImage from "@/components/ui/ProductImage";
import { STORE_IMAGES } from "@/lib/store-images";
import { ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

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

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedPieces, setSelectedPieces] = useState<1 | 2 | 3>(product.defaultOffer);
  const { addItem, openDrawer } = useCartStore();
  const [isSticky, setIsSticky] = useState(false);
  const offerRef = useRef<HTMLDivElement>(null);
  const crossSells = getCrossSells(product);

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
    const offer = getOfferByPieces(selectedPieces);
    addItem(product, offer);
    const eventId = generateFreshEventId("addToCart");
    trackAddToCart({ id: product.id, name: product.arabicName, price: offer.price }, eventId);
    trackEvent({ event_name: "AddToCart", event_id: eventId, payload: { product_id: product.id, pieces: selectedPieces } });
    openDrawer();
  };

  const selectedOffer = getOfferByPieces(selectedPieces);

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
              <h2 className="font-bold text-brand-espresso mb-3">اختر/ي العرض</h2>
              <OfferSelector
                offers={product.offers}
                selected={selectedPieces}
                onChange={setSelectedPieces}
              />
            </div>

            {/* CTA */}
            <Button onClick={handleAddToCart} fullWidth size="lg" className="text-lg">
              أضف/ي للسلة — {selectedOffer.price} درهم
            </Button>

            {/* Trust */}
            <div className="flex items-center gap-2 justify-center">
              <ShieldCheck size={16} className="text-status-success" />
              <span className="text-sm text-brand-espresso/70">الدفع عند الاستلام · توصيل داخل المغرب</span>
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
              alt={`${product.shortHeading.split(":")[0]} — صورة المنتج`}
              aspect="square"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2 text-right">
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">
              واش هاد الشي مألوف عندك؟
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
              {product.shortHeading} هو الحل اللي صممناه خصيصاً لهاد المشاكل.
            </p>
          </div>
        </div>
      </section>

      {/* Mechanism & Science - Text Left, Image Right */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-content mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-right">
            <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              مثبت علمياً
            </span>
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">
              كيف يخدم {product.shortHeading.split(":")[0]}؟ (السر العلمي)
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
            src={STORE_IMAGES.sectionScience}
            alt="كيف يعمل المنتج"
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
              src={STORE_IMAGES.sectionIngredients}
              alt="المكونات الطبيعية"
              aspect="square"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2 text-right">
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">
              مكونات طبيعية بقوة علمية
            </h2>
            <p className="text-brand-espresso/70 mb-8 text-lg">
              لا نساوم على الجودة. اخترنا أفضل المكونات لضمان الفعالية والأمان.
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
            src={STORE_IMAGES.sectionUsage}
            alt="طريقة الاستعمال"
            aspect="square"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Reviews — honest, no fake reviews */}
      <section className="max-w-content mx-auto px-4 py-12">
        <h2 className="font-arabic font-bold text-2xl text-brand-espresso text-center mb-2">
          آراء الزبائن
        </h2>
        <p className="text-center text-brand-espresso/50 text-xs mb-8">
          لا نعرض تقييمات مختلقة — كل رأي حقيقي من زبون حقيقي
        </p>
        <div className="max-w-md mx-auto bg-brand-cream rounded-2xl p-8 text-center flex flex-col items-center gap-3">
          <MessageSquare size={32} className="text-brand-primary/30" />
          <p className="font-bold text-brand-espresso">شارك معنا تجربتك مع {product.shortHeading.split(":")[0]}</p>
          <p className="text-brand-espresso/60 text-sm">
            اطلب المنتج، جربه، وشارك رأيك الحقيقي عبر واتساب.
          </p>
          <a
            href={`https://wa.me/212600000000?text=${encodeURIComponent(`السلام عليكم، بغيت نشارك رأيي في ${product.shortHeading.split(":")[0]} 🌿`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.126a.75.75 0 0 0 .921.916l5.355-1.453A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.722-.5-5.285-1.376l-.378-.214-3.927 1.066 1.088-3.824-.234-.393A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            شارك رأيك
          </a>
        </div>
      </section>

      {/* Offer stack CTA */}
      <section className="bg-brand-cream py-12">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-arabic font-bold text-2xl text-brand-espresso text-center mb-6">
            اختر/ي عرضك الآن
          </h2>
          <div className="max-w-md mx-auto flex flex-col gap-4">
            <OfferSelector
              offers={product.offers}
              selected={selectedPieces}
              onChange={setSelectedPieces}
            />
            <Button onClick={handleAddToCart} fullWidth size="lg">
              أضف/ي للسلة — {selectedOffer.price} درهم
            </Button>
            <p className="text-center text-xs text-brand-espresso/50">
              الدفع عند الاستلام · تأكيد الطلب بالهاتف · توصيل داخل المغرب
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sells */}
      {crossSells.length > 0 && (
        <section className="max-w-content mx-auto px-4 py-12">
          <h2 className="font-arabic font-bold text-2xl text-brand-espresso text-center mb-2">
            كمل/ي الروتين ديالك
          </h2>
          <p className="text-center text-brand-espresso/60 mb-8">
            شعر، بشرة، وانتعاش يومي — كل شي من رياض
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
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-brand-ivory border-t border-brand-border p-4 shadow-lg animate-fade-in">
          <div className="max-w-content mx-auto flex items-center justify-between gap-4">
            <div className="text-right">
              <p className="font-bold text-brand-espresso text-sm">{product.shortHeading.split(":")[0]}</p>
              <p className="text-xs text-brand-espresso/60">{selectedOffer.price} درهم · {selectedPieces} {selectedPieces === 1 ? "قطعة" : "قطع"}</p>
            </div>
            <Button onClick={handleAddToCart} size="md">
              أضف/ي للسلة — {selectedOffer.price} درهم
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
