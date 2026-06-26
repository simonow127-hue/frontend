"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import Button from "@/components/ui/Button";
import { Star, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { generateFreshEventId } from "@/lib/events";
import { trackAddToCart } from "@/lib/tracking";
import { trackEvent } from "@/lib/api";
import { formatPrice } from "@/lib/currency";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCartStore();
  const offer1 = product.offers.find((o) => o.pieces === 1)!;

  const handleAddToCart = () => {
    addItem(product, offer1);
    const eventId = generateFreshEventId("addToCart");
    trackAddToCart({ id: product.id, name: product.arabicName, price: offer1.price }, eventId);
    trackEvent({ event_name: "AddToCart", event_id: eventId, payload: { product_id: product.id } });
    openDrawer();
  };

  const rating = product.rating ?? 4.8;
  const reviewCount = product.reviewCount ?? 0;

  return (
    <div className="bg-brand-ivory rounded-2xl border border-brand-border overflow-hidden flex flex-col hover:shadow-xl hover:border-brand-gold/40 transition-all duration-300 group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden">
        <div className="relative aspect-square bg-brand-cream border-b border-brand-border">
          <Image
            src={product.imagePlaceholder}
            alt={product.arabicName}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
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
        {/* Rating */}
        {reviewCount > 0 && (
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-[11px] text-brand-espresso/50">({reviewCount})</span>
            <span className="text-[11px] font-bold text-brand-espresso">{rating}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={i < Math.round(rating) ? "text-brand-gold fill-brand-gold" : "text-brand-border"}
                />
              ))}
            </div>
          </div>
        )}

        {/* Title & subtitle */}
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-arabic font-bold text-brand-espresso text-sm md:text-base leading-snug hover:text-brand-gold transition-colors line-clamp-2">
              {product.shortHeading}
            </h3>
          </Link>
          <p className="text-xs text-brand-espresso/60 mt-1 line-clamp-2 leading-relaxed">
            {product.subheading}
          </p>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-border/60">
          <span className="text-[11px] text-brand-espresso/50 font-medium">دفع عند الاستلام</span>
          <span className="font-black text-brand-primary text-lg">{formatPrice(offer1.price)}</span>
        </div>

        {/* CTA */}
        <Button onClick={handleAddToCart} fullWidth size="md" variant="primary"
          className="bg-brand-primary hover:bg-brand-gold hover:text-brand-primary transition-colors font-bold">
          أضف للسلة
        </Button>
      </div>
    </div>
  );
}
