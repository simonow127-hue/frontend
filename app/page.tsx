import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Shield, Truck, CreditCard,
  Zap, Package, CheckCircle2, ChevronLeft,
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import { Star, Users, MapPin, BadgeCheck } from "lucide-react";
import { getLatestProducts, PRODUCTS } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { getCompareAtPrice } from "@/lib/pricing";
import PaymentLogos from "@/components/ui/PaymentLogos";
import BrandMarquee from "@/components/home/BrandMarquee";
import SaudiDeliveryMap from "@/components/ui/SaudiDeliveryMap";

export const metadata: Metadata = {
  title: "رياض | Riads — تسوق بثقة وتوصيل سريع",
  description:
    "رياض — منتجات مختارة للسوق السعودي. دفع عند الاستلام، توصيل سريع، تقييمات حقيقية.",
};

const whyUs = [
  {
    icon: CreditCard,
    title: "دفع عند الاستلام",
    text: "ادفع لما يوصلك الطلب — بدون بطاقة ولا تحويل مسبق.",
    color: "from-amber-500/10 to-yellow-500/5",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Truck,
    title: "توصيل لكل المملكة",
    text: "٣–٥ أيام توصيل حسب المدينة.",
    color: "from-blue-500/10 to-sky-500/5",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Shield,
    title: "منتجات مختارة بعناية",
    text: "نختار كل منتج بعناية — جودة حقيقية وأسعار عادلة.",
    color: "from-green-500/10 to-emerald-500/5",
    iconBg: "bg-green-500/10 text-green-600",
  },
  {
    icon: Package,
    title: "تغليف محترم",
    text: "كل طلب يوصلك بتغليف آمن ومرتب — مناسب كهدية أو استخدام شخصي.",
    color: "from-purple-500/10 to-violet-500/5",
    iconBg: "bg-purple-500/10 text-purple-600",
  },
];

const heroPerks = [
  { icon: CreditCard, label: "دفع عند الاستلام" },
  { icon: Truck, label: "توصيل سريع" },
  { icon: Shield, label: "منتجات مختارة" },
];

const faqs = [
  {
    q: "كيف أطلب؟",
    a: "اختار المنتج، حدد الكمية، عبّي اسمك ورقم جوالك، ونوصلك مع الدفع عند الاستلام. ما تحتاج حساب ولا بطاقة.",
  },
  {
    q: "كم وقت التوصيل؟",
    a: "٣–٥ أيام توصيل حسب المدينة.",
  },
  {
    q: "هل الدفع عند الاستلام متاح؟",
    a: "نعم — ادفع للمندوب لما يوصلك الطلب بالباب، بدون أي تحويل مسبق.",
  },
  {
    q: "هل المنتجات أصلية؟",
    a: "نختار موردين موثوقين ونوضح مواصفات كل منتج. إذا وصلك شيء مختلف عن الوصف، تواصل معنا.",
  },
];

const heroProducts = [
  { id: "neck-fan", src: "/images/products/neck-fan.jpg", label: "مروحة الرقبة" },
  { id: "perfume-intense", src: "/images/products/perfume-intense.jpg", label: "عطر قصة" },
  { id: "desk-lamp", src: "/images/products/desk-lamp.jpg", label: "مصباح ذكي" },
  { id: "car-phone-holder", src: "/images/products/car-phone-holder.jpg", label: "حامل الجوال" },
];

const minPrice = Math.min(...PRODUCTS.map((p) => p.offers[0].price));
const spotlightProduct = PRODUCTS.find((p) => p.id === "perfume-intense")!;

const deliveryCities = ["الرياض", "جدة", "الدمام", "مكة", "المدينة", "أبها"];

export default function HomePage() {
  const latest = getLatestProducts(8);

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section data-header-theme="dark" className="relative -mt-24 pt-24 bg-brand-primary text-brand-ivory overflow-hidden min-h-[min(85vh,900px)] flex flex-col">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,#C9A45C18_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,#ffffff08_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

        <div className="relative flex-1 flex items-center w-full">
        <div className="max-w-content mx-auto px-4 py-12 md:py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="flex flex-col gap-7 text-right order-2 md:order-1">
            <span className="inline-flex items-center gap-2 self-end bg-brand-gold/15 border border-brand-gold/25 text-brand-champagne text-xs font-bold px-4 py-2 rounded-full">
              <Zap size={11} className="text-brand-gold" />
              منتجات مختارة لحياة أفضل
            </span>

            <div className="flex flex-col gap-3">
              <h1 className="font-arabic font-bold text-4xl md:text-6xl leading-[1.25] tracking-tight">
                تسوّق بثقة
                <br />
                <span className="text-brand-gold">جودة تليق فيك</span>
              </h1>
              <p className="text-brand-champagne/80 text-lg md:text-xl leading-relaxed max-w-xl">
                <span className="text-brand-gold font-bold">رياض</span> يجمع لك منتجات مختارة بعناية — من السيارة للبيت والأناقة.
                توصيل سريع لكل المملكة والدفع عند الاستلام.
              </p>
            </div>

            {/* Mini trust row */}
            <div className="flex flex-wrap gap-4 justify-end text-sm text-brand-champagne/70">
              {["دفع عند الاستلام", "توصيل سريع", "منتجات مختارة"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-brand-gold" />
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <Link href="/collections">
                <Button size="lg" className="bg-brand-gold text-brand-primary hover:bg-brand-champagne font-bold px-8">
                  تسوق الحين
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg" className="border-brand-champagne/30 bg-transparent text-brand-ivory hover:bg-white/10">
                  تعرف علينا
                </Button>
              </Link>
            </div>

            <PriceDisplay
              price={minPrice}
              compareAtPrice={getCompareAtPrice(minPrice)}
              size="sm"
              inverted
              className="opacity-60"
            />
          </div>

          {/* Product mosaic */}
          <div className="order-1 md:order-2 grid grid-cols-2 gap-3">
            {heroProducts.map((p, i) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className={`group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-all duration-300 ${i === 0 ? "row-span-1" : ""}`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={p.src}
                    alt={p.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={i < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 right-2 text-xs text-white font-bold bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {p.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        </div>

        {/* Hero perks — fills empty space on mobile */}
        <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-content mx-auto px-4 py-4 grid grid-cols-3 gap-2.5">
            {heroPerks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.label}
                  className="flex items-center gap-2.5 justify-end rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
                >
                  <span className="text-[11px] sm:text-xs font-bold text-brand-champagne/90 leading-snug text-right">
                    {perk.label}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand-gold/15 border border-brand-gold/25 flex items-center justify-center">
                    <Icon size={15} className="text-brand-gold" strokeWidth={2.25} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <BrandMarquee />

      {/* ── LATEST PRODUCTS ── */}
      <section data-header-theme="light" className="max-w-content mx-auto px-4 py-16 md:py-20 w-full">
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/collections"
            className="text-sm text-brand-gold hover:text-brand-primary flex items-center gap-1 transition-colors font-medium"
          >
            عرض الكل
            <ChevronLeft size={16} />
          </Link>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className="w-8 h-0.5 bg-brand-gold rounded-full" />
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">New Arrivals</span>
            </div>
            <h2 className="font-arabic font-bold text-2xl md:text-3xl text-brand-espresso">
              أحدث المنتجات
            </h2>
            <p className="text-brand-espresso/60 text-sm mt-1">وصل حديثاً — اكتشف الجديد</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {latest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── SPOTLIGHT / FEATURED PRODUCT ── */}
      <section data-header-theme="dark" className="bg-brand-primary text-brand-ivory overflow-hidden">
        <div className="max-w-content mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 md:order-1">
            <div className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={spotlightProduct.imagePlaceholder}
                alt={spotlightProduct.arabicName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <span className="absolute top-4 right-4 bg-brand-gold text-brand-primary text-xs font-black px-3 py-1.5 rounded-full">
              منتج مميز
            </span>
          </div>
          <div className="text-right flex flex-col gap-5 order-1 md:order-2">
            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase">منتج مميز</span>
            <h2 className="font-arabic font-bold text-3xl md:text-4xl leading-snug">
              {spotlightProduct.shortHeading}
            </h2>
            <p className="text-brand-champagne/80 text-base leading-relaxed">
              {spotlightProduct.subheading}
            </p>
            <ul className="flex flex-col gap-2">
              {spotlightProduct.painBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 justify-end text-sm text-brand-champagne/70">
                  <span>{b}</span>
                  <CheckCircle2 size={15} className="text-brand-gold mt-0.5 shrink-0" />
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 justify-end pt-2">
              <PriceDisplay
                price={spotlightProduct.offers[0].price}
                compareAtPrice={spotlightProduct.offers[0].compareAtPrice}
                size="lg"
                inverted
                showBadge
              />
              <Link href={`/products/${spotlightProduct.slug}`}>
                <Button size="lg" className="bg-brand-gold text-brand-primary hover:bg-brand-champagne font-bold">
                  اطلب الحين
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ── */}
      <section data-header-theme="light" className="bg-brand-cream py-16 md:py-20">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center gap-2 justify-center mb-1">
              <span className="w-8 h-0.5 bg-brand-gold rounded-full" />
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Collections</span>
              <span className="w-8 h-0.5 bg-brand-gold rounded-full" />
            </div>
            <h2 className="font-arabic font-bold text-2xl md:text-3xl text-brand-espresso mt-1">
              تسوق حسب التصنيف
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/collections?category=${cat.slug}`}
                className="group relative bg-brand-ivory rounded-2xl border border-brand-border overflow-hidden hover:shadow-xl hover:border-brand-gold/50 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-arabic font-bold text-brand-espresso text-base">{cat.name}</h3>
                  <p className="text-xs text-brand-espresso/60 mt-1 line-clamp-2">{cat.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section data-header-theme="light" className="max-w-content mx-auto px-4 py-16 md:py-20 w-full">
        <div className="text-center mb-12">
          <div className="flex items-center gap-2 justify-center mb-1">
            <span className="w-8 h-0.5 bg-brand-gold rounded-full" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Our Promise</span>
            <span className="w-8 h-0.5 bg-brand-gold rounded-full" />
          </div>
          <h2 className="font-arabic font-bold text-2xl md:text-3xl text-brand-espresso mt-1">
            ليش تختار رياض؟
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyUs.map((item) => (
            <div
              key={item.title}
              className={`bg-gradient-to-br ${item.color} rounded-2xl border border-brand-border p-6 text-right flex flex-col gap-4 hover:shadow-md transition-shadow`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.iconBg}`}>
                <item.icon size={22} />
              </div>
              <div>
                <h3 className="font-arabic font-bold text-brand-espresso text-base mb-1">{item.title}</h3>
                <p className="text-sm text-brand-espresso/70 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY RIADS ── */}
      <section data-header-theme="dark" className="bg-brand-espresso py-16 overflow-hidden">
        <div className="max-w-content mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-gold/15 text-brand-gold text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase">
              ليش Riads؟
            </span>
            <h2 className="font-arabic font-bold text-2xl md:text-3xl text-brand-ivory">
              تسوق بثقة — كل يوم
            </h2>
            <p className="text-brand-ivory/50 text-sm mt-2">نهتم بكل تفصيلة من لحظة طلبك حتى يوصلك</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10 max-w-sm mx-auto w-full">
            {[
              { icon: <CreditCard size={28} className="text-brand-gold" />, number: "١٠٠٪", label: "دفع عند الاستلام", sub: "ما تدفع قرش قبل ما يوصلك" },
              { icon: <Truck size={28} className="text-brand-gold" />, number: "٣–٥", label: "أيام توصيل حسب المدينة", sub: "" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-brand-gold/15 rounded-2xl p-5 text-center flex flex-col items-center gap-2 hover:bg-white/10 transition-colors">
                <div className="mb-1">{item.icon}</div>
                <div className="font-arabic font-black text-2xl text-brand-gold leading-none">{item.number}</div>
                <div className="font-arabic font-bold text-brand-ivory text-sm">{item.label}</div>
                <div className="text-brand-ivory/40 text-xs leading-snug">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden border border-brand-gold/30 max-w-2xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
            <div className="bg-gradient-to-l from-[#1E3520] via-brand-primary to-[#1E3520] px-4 sm:px-5 py-4 border-b border-brand-gold/25">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MapPin size={16} className="text-brand-gold shrink-0" />
                <p className="text-brand-champagne/90 text-sm text-center">
                  توصيل لـ <span className="text-brand-gold font-bold">جميع مناطق المملكة</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {deliveryCities.map((city) => (
                  <span
                    key={city}
                    className="text-[11px] sm:text-xs font-bold font-arabic px-3 py-1 rounded-full bg-brand-gold/15 text-brand-champagne border border-brand-gold/30"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-brand-cream/95 px-3 py-4 sm:px-4">
              <SaudiDeliveryMap />
            </div>
          </div>
        </div>
      </section>


      {/* ── FAQ ── */}
      <section data-header-theme="light" className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center gap-2 justify-center mb-1">
              <span className="w-8 h-0.5 bg-brand-gold rounded-full" />
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">FAQ</span>
              <span className="w-8 h-0.5 bg-brand-gold rounded-full" />
            </div>
            <h2 className="font-arabic font-bold text-2xl md:text-3xl text-brand-espresso mt-1">
              الأسئلة الشائعة
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="bg-brand-ivory rounded-2xl border border-brand-border group overflow-hidden"
                open={i === 0}
              >
                <summary className="font-bold text-brand-espresso cursor-pointer list-none flex justify-between items-center p-5 gap-4">
                  <span className="text-brand-gold text-xl leading-none group-open:rotate-45 transition-transform duration-200 shrink-0">+</span>
                  <span className="text-right text-sm md:text-base">{f.q}</span>
                </summary>
                <div className="px-5 pb-5 text-right">
                  <p className="text-brand-espresso/70 text-sm leading-relaxed border-t border-brand-border pt-4">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section data-header-theme="dark" className="bg-brand-primary text-brand-ivory relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#C9A45C20_0%,transparent_60%)]" />
        <div className="relative max-w-content mx-auto px-4 text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">ابدأ التسوق</span>
            <span className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
          </div>
          <h2 className="font-arabic font-black text-3xl md:text-4xl">
            جاهز تطلب؟
          </h2>
          <p className="text-brand-champagne/75 max-w-md text-lg leading-relaxed">
            اختار منتجك، عبّي اسمك ورقمك، ونوصلك لباب بيتك —
            <br />
            <strong className="text-brand-champagne">الدفع عند الاستلام.</strong>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/collections">
              <Button size="lg" className="bg-brand-gold text-brand-primary hover:bg-brand-champagne font-bold px-10 text-base">
                تسوق الحين
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="border-brand-champagne/30 bg-transparent text-brand-ivory hover:bg-white/10">
                تواصل معنا
              </Button>
            </Link>
          </div>
          {/* Payment logos */}
          <div className="mt-4 opacity-70">
            <PaymentLogos size="sm" />
          </div>
        </div>
      </section>
    </div>
  );
}
