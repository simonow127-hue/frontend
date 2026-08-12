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
import { generateFreshEventId, getOrCreateEventId } from "@/lib/events";
import { trackViewContent, trackAddToCart } from "@/lib/tracking";
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
import { loadUserReviews, saveUserReview } from "@/lib/user-reviews";
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

  const { addItem, openDrawer, openCheckout } = useCartStore();

  const [isSticky, setIsSticky] = useState(false);
  const [userReviews, setUserReviews] = useState<Review[]>([]);

 
