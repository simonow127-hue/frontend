"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";

import type { Offer, Product, Review } from "@/lib/products";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/currency";
import Button from "@/components/ui/Button";

type ProductPageClientProps = {
  product: Product;
};

export default function ProductPageClient({
  product,
}: ProductPageClientProps) {
  const { addItem, openDrawer, openCheckout } = useCartStore();

  const [selectedPieces, setSelectedPieces] = useState<1 | 2 | 3>(
    product.defaultOffer
  );

  const [activeImage, setActiveImage] = useState(product.imagePlaceholder);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedOffer = useMemo<Offer>(() => {
    return (
      product.offers.find((offer) => offer.pieces === selectedPieces) ??
      product.offers[0]
    );
  }, [product.offers, selectedPieces]);

  const handleSelectOffer = (offer: Offer) => {
    setSelectedPieces(offer.pieces);
  };

  const handleAddToCart = () => {
    if (!selectedOffer) return;

    addItem(product, selectedOffer);
    openDrawer();
  };

  const handleBuyNow = () => {
    if (!selectedOffer) return;

    addItem(product, selectedOffer);
    openCheckout();
  };

  const galleryImages = [
    product.imagePlaceholder,
    product.painImage,
    product.ingredientsImage,
    product.usageImage,
    product.scienceImage,
  ].filter(
    (image, index, array): image is string =>
      Boolean(image) && array.indexOf(image) === index
  );

  const reviews: Review[] = product.reviews ?? [];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-brand-ivory text-brand-espresso"
    >
      {/* =========================
          HERO / PRODUCT TOP
      ========================== */}
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          {/* =========================
              PRODUCT IMAGES
          ========================== */}
          <div className="order-1">
            <div className="overflow-hidden rounded-3xl border border-brand-border bg-white shadow-sm">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={activeImage}
                  alt={product.arabicName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {product.isNew && (
                  <div className="absolute right-4 top-4 rounded-full bg-[#2E822B] px-4 py-2 text-sm font-bold text-white shadow-lg">
                    جديد
                  </div>
                )}
              </div>
            </div>

            {galleryImages.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {galleryImages.map((image, index) => {
                  const isActive = activeImage === image;

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      aria-label={`عرض الصورة ${index + 1}`}
                      aria-pressed={isActive}
                      className={[
                        "relative aspect-square overflow-hidden rounded-xl border-2 bg-white transition-all",
                        isActive
                          ? "border-[#2E822B] ring-2 ring-[#2E822B]/20"
                          : "border-brand-border hover:border-[#2E822B]",
                      ].join(" ")}
                    >
                      <Image
                        src={image}
                        alt={`${product.arabicName} - صورة ${index + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {product.videoUrl && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-brand-border bg-black">
                <video
                  src={product.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-auto max-h-[500px] w-full"
                >
                  المتصفح ديالك ما كيدعمش تشغيل الفيديو.
                </video>
              </div>
            )}
          </div>

          {/* =========================
              PRODUCT INFO
          ========================== */}
          <div className="order-2 flex flex-col gap-5">
            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className="fill-[#F5B301] text-[#F5B301]"
                    />
                  ))}
                </div>

                <span className="text-sm font-bold text-brand-espresso">
                  {product.rating.toFixed(1)}
                </span>

                <span className="text-sm text-brand-espresso/60">
                  ({product.reviewCount} تقييم)
                </span>
              </div>
            )}

            {/* Heading */}
            <div>
              <h1 className="font-arabic text-2xl font-bold leading-tight text-brand-espresso sm:text-3xl lg:text-4xl">
                {product.arabicName}
              </h1>

              <p className="mt-3 text-base leading-7 text-brand-espresso/70 sm:text-lg">
                {product.subheading}
              </p>
            </div>

            {/* Emotional headline */}
            {product.emotionalHeadline && (
              <div className="rounded-2xl border border-[#2E822B]/20 bg-[#2E822B]/5 px-4 py-3">
                <p className="font-bold leading-7 text-[#2E822B]">
                  {product.emotionalHeadline}
                </p>
              </div>
            )}

            {/* Pain points */}
            {product.painBullets.length > 0 && (
              <div className="rounded-2xl bg-brand-cream p-5">
                <h2 className="mb-3 text-base font-bold text-brand-espresso">
                  علاش غادي يعجبك؟
                </h2>

                <div className="flex flex-col gap-3">
                  {product.painBullets.map((bullet, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2E822B] text-white">
                        <Check size={15} strokeWidth={3} />
                      </span>

                      <p className="text-sm leading-6 text-brand-espresso/80">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================
                OFFERS
            ========================== */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-brand-espresso">
                  اختار العرض ديالك
                </h2>

                <span className="text-xs font-bold text-[#2E822B]">
                  الدفع عند الاستلام
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {product.offers.map((offer) => {
                  const isSelected =
                    selectedPieces === offer.pieces;

                  return (
                    <button
                      key={offer.pieces}
                      type="button"
                      onClick={() => handleSelectOffer(offer)}
                      aria-pressed={isSelected}
                      className={[
                        "relative w-full rounded-2xl border-2 p-4 text-right transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-[#2E822B]/30",
                        isSelected
                          ? "border-[#2E822B] bg-[#2E822B]/5 shadow-md"
                          : "border-brand-border bg-white hover:border-[#2E822B]/50",
                      ].join(" ")}
                    >
                      {offer.badge && (
                        <span className="absolute -top-3 right-4 rounded-full bg-[#2E822B] px-3 py-1 text-xs font-bold text-white shadow-sm">
                          {offer.badge}
                        </span>
                      )}

                      <div className="flex items-center gap-3">
                        {/* Custom radio */}
                        <span
                          className={[
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                            isSelected
                              ? "border-[#2E822B] bg-[#2E822B]"
                              : "border-brand-border bg-white",
                          ].join(" ")}
                        >
                          {isSelected && (
                            <Check
                              size={14}
                              strokeWidth={3}
                              className="text-white"
                            />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p
                                className={[
                                  "font-bold",
                                  isSelected
                                    ? "text-[#2E822B]"
                                    : "text-brand-espresso",
                                ].join(" ")}
                              >
                                {offer.label}
                              </p>

                              <p className="mt-1 text-xs text-brand-espresso/60">
                                {offer.sublabel}
                              </p>
                            </div>

                            <div className="text-left">
                              <p
                                className={[
                                  "text-lg font-bold",
                                  isSelected
                                    ? "text-[#2E822B]"
                                    : "text-brand-espresso",
                                ].join(" ")}
                              >
                                {formatPrice(offer.price)}
                              </p>

                              {offer.compareAtPrice > offer.price && (
                                <p className="text-xs text-brand-espresso/40 line-through">
                                  {formatPrice(offer.compareAtPrice)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =========================
                SELECTED OFFER SUMMARY
            ========================== */}
            <div className="rounded-2xl border border-[#2E822B]/20 bg-[#2E822B]/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-brand-espresso/60">
                    العرض المختار
                  </p>

                  <p className="mt-1 font-bold text-brand-espresso">
                    {selectedOffer.label}
                  </p>
                </div>

                <p className="text-xl font-bold text-[#2E822B]">
                  {formatPrice(selectedOffer.price)}
                </p>
              </div>
            </div>

            {/* =========================
                BUY BUTTONS
            ========================== */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleBuyNow}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2E822B] px-6 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#20671E] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#2E822B]/40 focus:ring-offset-2"
              >
                <Zap size={20} />
                اشترِ الآن — {formatPrice(selectedOffer.price)}
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#2E822B] bg-white px-6 py-3 text-base font-bold text-[#2E822B] transition-all duration-200 hover:bg-[#2E822B]/5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#2E822B]/30"
              >
                <ShoppingCart size={19} />
                أضف للسلة
              </button>
            </div>

            {/* =========================
                TRUST
            ========================== */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center gap-2 rounded-xl bg-brand-cream px-2 py-3 text-center">
                <ShieldCheck
                  size={21}
                  className="text-[#2E822B]"
                />
                <span className="text-xs font-bold text-brand-espresso">
                  الدفع عند الاستلام
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-brand-cream px-2 py-3 text-center">
                <Truck
                  size={21}
                  className="text-[#2E822B]"
                />
                <span className="text-xs font-bold text-brand-espresso">
                  توصيل للباب
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-brand-cream px-2 py-3 text-center">
                <Check
                  size={21}
                  className="text-[#2E822B]"
                />
                <span className="text-xs font-bold text-brand-espresso">
                  تأكيد قبل الإرسال
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MECHANISM
      ========================== */}
      {product.mechanism && (
        <section className="border-y border-brand-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-bold text-[#2E822B]">
                كيفاش كيخدم؟
              </span>

              <h2 className="mt-2 text-2xl font-bold text-brand-espresso sm:text-3xl">
                حل بسيط وعملي للمشكل
              </h2>

              <p className="mt-5 text-base leading-8 text-brand-espresso/70">
                {product.mechanism}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =========================
          INGREDIENTS / FEATURES
      ========================== */}
      {product.ingredients.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            {product.ingredientsImage ? (
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-cream">
                <Image
                  src={product.ingredientsImage}
                  alt={`${product.arabicName} - المميزات`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-3xl bg-brand-cream p-8">
                <div className="flex min-h-[300px] items-center justify-center">
                  <ShieldCheck
                    size={80}
                    className="text-[#2E822B]"
                  />
                </div>
              </div>
            )}

            <div>
              <span className="text-sm font-bold text-[#2E822B]">
                المميزات
              </span>

              <h2 className="mt-2 text-2xl font-bold text-brand-espresso sm:text-3xl">
                علاش تختار هاد المنتج؟
              </h2>

              <div className="mt-6 flex flex-col gap-4">
                {product.ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2E822B]/10">
                      <Check
                        size={20}
                        className="text-[#2E822B]"
                        strokeWidth={3}
                      />
                    </span>

                    <div>
                      <h3 className="font-bold text-brand-espresso">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-brand-espresso/60">
                        {item.benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================
          USAGE
      ========================== */}
      {product.usageSteps.length > 0 && (
        <section className="bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-sm font-bold text-[#2E822B]">
                  طريقة الاستخدام
                </span>

                <h2 className="mt-2 text-2xl font-bold text-brand-espresso sm:text-3xl">
                  ساهل فالاستعمال
                </h2>

                <div className="mt-6 flex flex-col gap-4">
                  {product.usageSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2E822B] text-sm font-bold text-white">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-base leading-7 text-brand-espresso/80">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {product.usageImage ? (
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
                  <Image
                    src={product.usageImage}
                    alt={`${product.arabicName} - طريقة الاستخدام`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* =========================
          SCIENCE
      ========================== */}
      {product.scienceImage && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative aspect-[16/8] w-full">
              <Image
                src={product.scienceImage}
                alt={`${product.arabicName} - التفاصيل`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* =========================
          REVIEWS
      ========================== */}
      <section className="border-y border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold text-[#2E822B]">
              آراء العملاء
            </span>

            <h2 className="mt-2 text-2xl font-bold text-brand-espresso sm:text-3xl">
              شنو قالو الناس اللي جربوه؟
            </h2>

            {product.rating > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className="fill-[#F5B301] text-[#F5B301]"
                    />
                  ))}
                </div>

                <span className="font-bold">
                  {product.rating.toFixed(1)} / 5
                </span>
              </div>
            )}
          </div>

          {reviews.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <article
                  key={`${review.name}-${index}`}
                  className="rounded-2xl border border-brand-border bg-brand-ivory p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-brand-espresso">
                        {review.name}
                      </p>

                      {review.date && (
                        <p className="mt-1 text-xs text-brand-espresso/40">
                          {review.date}
                        </p>
                      )}
                    </div>

                    {review.verified && (
                      <span className="rounded-full bg-[#2E822B]/10 px-2 py-1 text-[10px] font-bold text-[#2E822B]">
                        تم التحقق
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={15}
                        className={
                          starIndex < review.rating
                            ? "fill-[#F5B301] text-[#F5B301]"
                            : "text-brand-border"
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-brand-espresso/70">
                    {review.text}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-brand-cream p-6 text-center">
              <p className="font-bold text-brand-espresso">
                كنّا أول تجربة ديالك؟ ❤️
              </p>

              <p className="mt-2 text-sm text-brand-espresso/60">
                جرّب المنتج وشاركنا رأيك من بعد.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          FAQ
      ========================== */}
      {product.faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold text-[#2E822B]">
              الأسئلة الشائعة
            </span>

            <h2 className="mt-2 text-2xl font-bold text-brand-espresso sm:text-3xl">
              عندك شي سؤال؟
            </h2>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {product.faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-brand-border bg-white"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  >
                    <span className="font-bold text-brand-espresso">
                      {faq.question}
                    </span>

                    {isOpen ? (
                      <ChevronUp
                        size={20}
                        className="shrink-0 text-[#2E822B]"
                      />
                    ) : (
                      <ChevronDown
                        size={20}
                        className="shrink-0 text-brand-espresso/50"
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-brand-border px-5 py-4">
                      <p className="text-sm leading-7 text-brand-espresso/70">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================
          FINAL CTA
      ========================== */}
      <section className="bg-[#2E822B]">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            جاهز تطلب؟
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            اختار العرض اللي مناسب ليك وكمّل الطلب بسهولة. الدفع عند الاستلام.
          </p>

          <button
            type="button"
            onClick={handleBuyNow}
            className="mx-auto mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#2E822B] shadow-lg transition-all hover:bg-[#F5F5F5] active:scale-[0.98]"
          >
            <ShoppingCart size={20} />
            اطلب الآن — {formatPrice(selectedOffer.price)}
          </button>
        </div>
      </section>

      {/* =========================
          MOBILE STICKY BUY BUTTON
      ========================== */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label="أضف للسلة"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#2E822B] bg-white text-[#2E822B]"
          >
            <ShoppingCart size={20} />
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#2E822B] px-4 py-3 font-bold text-white shadow-md hover:bg-[#20671E] active:scale-[0.98]"
          >
            <Zap size={18} />
            اشترِ الآن — {formatPrice(selectedOffer.price)}
          </button>
        </div>
      </div>
    </main>
  );
}
