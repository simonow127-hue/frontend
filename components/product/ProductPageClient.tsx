"use client";

import { useState, useEffect, useRef } from "react";
import {
  Product,
  Review,
  getOfferByPieces,
  getCrossSells,
  getProductSectionImage,
} from "@/lib/products";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { formatPrice } from "@/lib/currency";
import { useCartStore } from "@/lib/cart";
import {
  generateFreshEventId,
  getOrCreateEventId,
} from "@/lib/events";
import {
  trackViewContent,
  trackAddToCart,
} from "@/lib/tracking";
import { trackEvent } from "@/lib/api";
import OfferSelector from "./OfferSelector";
import Button from "@/components/ui/Button";
import ProductCard from "./ProductCard";
import TrustBadges from "@/components/ui/TrustBadges";
import ProductImage from "@/components/ui/ProductImage";
import PaymentLogos from "@/components/ui/PaymentLogos";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductVideo from "@/components/ui/ProductVideo";
import AddReviewForm from "./AddReviewForm";
import {
  loadUserReviews,
  saveUserReview,
} from "@/lib/user-reviews";
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Zap,
  Star,
} from "lucide-react";
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
        type="button"
        className="w-full flex items-center justify-between py-4 text-right font-bold text-brand-espresso hover:text-brand-primary transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>

        <span>{q}</span>
      </button>

      {open && (
        <p className="pb-4 text-brand-espresso/70 text-sm leading-relaxed text-right">
          {a}
        </p>
      )}
    </div>
  );
}

export default function ProductPageClient({
  product,
}: {
  product: Product;
}) {
  const [selectedPieces, setSelectedPieces] = useState<1 | 2 | 3>(
    product.defaultOffer
  );

  const {
    addItem,
    openDrawer,
    openCheckout,
  } = useCartStore();

  const [isSticky, setIsSticky] = useState(false);
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const offerRef = useRef<HTMLDivElement>(null);

  const crossSells = getCrossSells(product);

  const productLabel = product.shortHeading
    .split(":")[0];

  const displayedReviews = [
    ...userReviews,
    ...product.reviews,
  ];

  useEffect(() => {
    setUserReviews(loadUserReviews(product.id));
  }, [product.id]);

  useEffect(() => {
    const eventId = getOrCreateEventId("viewContent");

    const offer3 = product.offers.find(
      (o) => o.pieces === 3
    );

    if (!offer3) return;

    trackViewContent(
      {
        id: product.id,
        name: product.arabicName,
        price: offer3.price,
      },
      eventId
    );

    trackEvent({
      event_name: "ViewContent",
      event_id: eventId,
      payload: {
        product_id: product.id,
      },
    });
  }, [product]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (offerRef.current) {
      observer.observe(offerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    const offer = getOfferByPieces(
      product,
      selectedPieces
    );

    addItem(product, offer);

    const eventId =
      generateFreshEventId("addToCart");

    trackAddToCart(
      {
        id: product.id,
        name: product.arabicName,
        price: offer.price,
      },
      eventId
    );

    trackEvent({
      event_name: "AddToCart",
      event_id: eventId,
      payload: {
        product_id: product.id,
        pieces: selectedPieces,
      },
    });

    openDrawer();
  };

  const handleBuyNow = () => {
    const offer = getOfferByPieces(
      product,
      selectedPieces
    );

    addItem(product, offer);

    const eventId =
      generateFreshEventId("addToCart");

    trackAddToCart(
      {
        id: product.id,
        name: product.arabicName,
        price: offer.price,
      },
      eventId
    );

    trackEvent({
      event_name: "AddToCart",
      event_id: eventId,
      payload: {
        product_id: product.id,
        pieces: selectedPieces,
      },
    });

    openCheckout();
  };

  const selectedOffer = getOfferByPieces(
    product,
    selectedPieces
  );

  return (
    <div className="min-h-screen">

      {/* Hero / Above the fold */}
      <section className="max-w-content mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Product gallery */}
          <div className="order-1 md:order-2 flex flex-col gap-4">

            {product.videoUrl && (
              <ProductVideo
                src={product.videoUrl}
                poster={product.imagePlaceholder}
                title={product.arabicName}
              />
            )}

            <ProductGallery
              images={[
                product.imagePlaceholder,
                ...(product.painImage
                  ? [product.painImage]
                  : []),
                ...(product.scienceImage
                  ? [product.scienceImage]
                  : []),
                ...(product.usageImage
                  ? [product.usageImage]
                  : []),
                ...(product.ingredientsImage
                  ? [product.ingredientsImage]
                  : []),
              ]}
              alt={product.arabicName}
              priority
            />
          </div>

          {/* Product info */}
          <div className="order-2 md:order-1 flex flex-col gap-5">

            <div>
              <h1 className="font-arabic font-bold text-brand-espresso text-2xl md:text-3xl leading-snug">
                {product.emotionalHeadline}
              </h1>

              <p className="text-brand-espresso/70 mt-2 text-base">
                {product.subheading}
              </p>

              <div className="mt-4">
                <PriceDisplay
                  price={selectedOffer.price}
                  compareAtPrice={
                    selectedOffer.compareAtPrice
                  }
                  size="lg"
                  showBadge
                />
              </div>
            </div>

            {/* Pain bullets */}
            <ul className="flex flex-col gap-2">
              {product.painBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2
                    size={18}
                    className="text-brand-primary shrink-0 mt-0.5"
                  />

                  <span className="text-sm text-brand-espresso/80">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {/* Offer selector */}
            <div ref={offerRef}>
              <h2 className="font-bold text-brand-espresso mb-3">
                اختر العرض
              </h2>

              <OfferSelector
                offers={product.offers}
                selected={selectedPieces}
                onChange={setSelectedPieces}
              />
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">

              {/* BUY NOW */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-4 px-6 rounded-2xl bg-[#2E822B] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:bg-[#20671E] active:scale-[0.98] transition-all"
              >
                <Zap
                  size={20}
                  fill="currentColor"
                />

                اشتري الحين —{" "}
                {formatPrice(selectedOffer.price)}
              </button>

              {/* ADD TO CART */}
              <Button
                type="button"
                onClick={handleAddToCart}
                fullWidth
                size="lg"
                variant="secondary"
                className="text-base"
              >
                أضف للسلة
              </Button>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-2 justify-center">
              <ShieldCheck
                size={16}
                className="text-status-success"
              />

              <span className="text-sm text-brand-espresso/70">
                الدفع عند الاستلام · توصيل لكل المملكة
              </span>
            </div>

            {/* Payment logos */}
            <div className="flex justify-center pt-1">
              <PaymentLogos
                size="sm"
                className="opacity-70"
              />
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

      {/* Pain mirror */}
      <section className="max-w-content mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div className="order-2 md:order-1">
            <ProductImage
              src={
                product.painImage ||
                product.imagePlaceholder
              }
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
              {product.painBullets.map(
                (bullet, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="text-status-error font-bold mt-1 text-lg">
