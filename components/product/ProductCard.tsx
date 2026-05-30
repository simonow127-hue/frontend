"use client";
import Link from "next/link";
import { Product } from "@/lib/products";
import Button from "@/components/ui/Button";
import { ShieldCheck, Zap } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";
import { useCartStore } from "@/lib/cart";
import { generateFreshEventId } from "@/lib/events";
import { trackAddToCart } from "@/lib/tracking";
import { trackEvent } from "@/lib/api";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCartStore();
  const offer1 = product.offers.find((o) => o.pieces === 1)!;
  const offer3 = product.offers.find((o) => o.pieces === 3)!;

  const handleAddToCart = () => {
    addItem(product, offer3);
    const eventId = generateFreshEventId("addToCart");
    trackAddToCart({ id: product.id, name: product.arabicName, price: offer3.price }, eventId);
    trackEvent({ event_name: "AddToCart", event_id: eventId, payload: { product_id: product.id } });
    openDrawer();
  };

  return (
    <div className="bg-brand-ivory rounded-2xl border border-brand-border overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      {/* Image area */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <ProductImage
          src={product.imagePlaceholder}
          alt={product.arabicName}
          aspect="square"
          className="!rounded-none border-0 border-b-2 border-brand-border"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute bottom-3 right-3 z-10">
          <span className="bg-brand-primary text-brand-ivory text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Zap size={10} />
            عرض محدود
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-arabic font-bold text-brand-espresso text-base leading-snug hover:text-brand-primary transition-colors">
              {product.shortHeading}
            </h3>
          </Link>
          <p className="text-sm text-brand-espresso/70 mt-1">{product.subheading}</p>
        </div>

        {/* Price teaser */}
        <div className="flex items-center justify-between bg-brand-cream rounded-xl px-3 py-2">
          <span className="text-xs text-brand-espresso/60">أفضل قيمة 3 قطع</span>
          <div className="text-right">
            <span className="font-bold text-brand-primary">{offer3.price} درهم</span>
            <span className="text-xs text-brand-espresso/50 block">من {offer1.price} درهم</span>
          </div>
        </div>

        {/* Trust chip */}
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-status-success shrink-0" />
          <span className="text-xs text-brand-espresso/70">الدفع عند الاستلام</span>
          <span className="text-xs text-brand-espresso/40 mx-1">•</span>
          <span className="text-xs text-brand-espresso/50">عرض الكمية محدود</span>
        </div>

        {/* CTA */}
        <Button onClick={handleAddToCart} fullWidth size="md" className="mt-auto">
          اختر/ي العرض
        </Button>
      </div>
    </div>
  );
}
