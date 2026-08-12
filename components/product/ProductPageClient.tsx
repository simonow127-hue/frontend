"use client";

import { useEffect, useRef, useState } from "react";
import {
  Product,
  Review,
  getCrossSells,
  getOfferByPieces,
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
  trackAddToCart,
  trackViewContent,
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
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span>
          {open ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
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

  const { addItem, openDrawer, openCheckout } = useCartStore();

  const [isSticky, setIsSticky] = useState(false);
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const offerRef = useRef<HTMLDivElement>(null);

  const crossSells = getCrossSells(product);
  const productLabel = product.shortHeading.split(":")[0];

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
      (offer) => offer.pieces === 3
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

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleAddToCart = () => {
    const offer = getOfferByPieces(
      product,
      selectedPieces
    );

    addItem(product, offer);

    const eventId = generateFreshEventId("addToCart");

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

    const eventId = generateFreshEventId("addToCart");

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

      {/* HERO */}
      <section className="max-w-content mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Gallery */}
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

          {/* Product Info */}
          <div className="order-2 md:order-1 flex flex-col gap-5">

            <div>
              <h1 className="font
