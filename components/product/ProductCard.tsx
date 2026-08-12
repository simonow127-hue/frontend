"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { ShieldCheck, Zap } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { generateFreshEventId } from "@/lib/events";
import { trackAddToCart } from "@/lib/tracking";
import { trackEvent } from "@/lib/api";
import PriceDisplay from "@/components/ui/PriceDisplay";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCheckout } = useCartStore();
  const offer1 = product.offers.find((o) => o.pieces === 1)!;

  const handleBuyNow = () => {
    addItem(product, offer1);
    openCheckout();
    try {
      const eventId = generateFreshEventId("addToCart");
      trackAddToCart({ id: product.id, name: product.arabicName, price: offer1.price }, eventId);
      trackEvent({ event_name: "AddToCart", event_id: eventId, payload: { product_id: product.id } });
    } catch {
      // Tracking must never block checkout UX
    }
  };

  return (
    <div className="bg-brand-ivory rounded-2xl border border-brand-border overflow-hidden flex flex-col hover:shadow-xl hover:border-brand-gold/40 transition-all duration-300 group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} prefetch={false} className="block relative overflow-hidden">
        <div className="relative aspect-square bg-white border-b border-brand-border">
          <Image
            src={product.imagePlaceholder}
            alt={product.arabicName}
            fill
            className="object-contain p-3 group-hover:scale-[1.04] transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={65}
            loading="lazy"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <span className="bg-status-error text-white text-[10px] font-black px-2.5 py-1 rounded-full leading-none">
            عرض مؤقت
          </span>
          {product.isNew && (
            <span className="bg-brand-gold text-brand-primary text-[10px] font-black px-2.5 py-1 rounded-full leading-none">
              جديد
            </span>
          )}
        </div>
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-status-success text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <ShieldCheck size={10} />
            COD
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title & subtitle */}
        <div>
          <Link href={`/products/${product.slug}`} prefetch={false}>
            <h3 className="font-arabic font-bold text-brand-espresso text-sm md:text-base leading-snug hover:text-brand-gold transition-colors line-clamp-2">
              {product.shortHeading}
            </h3>
          </Link>
          <p className="text-xs text-brand-espresso/60 mt-1 line-clamp-2 leading-relaxed">
            {product.subheading}
          </p>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-brand-border/60">
          <span className="text-[11px] text-brand-espresso/50 font-medium">دفع عند الاستلام</span>
          <PriceDisplay
            price={offer1.price}
            compareAtPrice={offer1.compareAtPrice}
            size="md"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleBuyNow}
          className="w-full py-2.5 px-4 rounded-xl bg-brand-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <Zap size={15} fill="currentColor" />
          اشتري الحين
        </button>
      </div>
    </div>
  );
}
