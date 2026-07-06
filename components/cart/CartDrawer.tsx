"use client";
import Image from "next/image";
import { useCartStore, CartItem } from "@/lib/cart";
import { PRODUCTS, getProductById, Product } from "@/lib/products";
import { X, Trash2, ShieldCheck, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import { generateFreshEventId } from "@/lib/events";
import { trackInitiateCheckout } from "@/lib/tracking";
import { trackEvent } from "@/lib/api";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { formatPrice } from "@/lib/currency";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, addItem, openCheckout, getTotalPrice } =
    useCartStore();

  const total = getTotalPrice();

  const cartProductIds = new Set(items.map((i) => i.productId));
  const crossSells = PRODUCTS.filter((p) => !cartProductIds.has(p.id)).slice(0, 2);

  const handleCheckout = () => {
    const eventId = generateFreshEventId("checkout");
    trackInitiateCheckout(total, eventId);
    trackEvent({ event_name: "InitiateCheckout", event_id: eventId, payload: { total } });
    openCheckout();
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-brand-espresso/50 drawer-overlay animate-fade-in"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-brand-ivory shadow-2xl flex flex-col animate-slide-in-left"
        role="dialog"
        aria-label="سلة التسوق"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-brand-border">
          <button onClick={closeDrawer} aria-label="إغلاق" className="p-2 hover:bg-brand-cream rounded-full">
            <X size={20} />
          </button>
          <h2 className="font-arabic font-bold text-brand-espresso text-lg">سلة التسوق</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <span className="text-4xl">🛒</span>
              <p className="text-brand-espresso/60">السلة فاضية</p>
              <Button variant="secondary" onClick={closeDrawer} size="sm">
                اكتشف المنتجات
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <CartItemRow key={item.productId} item={item} onRemove={removeItem} />
                ))}
              </div>

              <div className="flex items-center gap-2 bg-brand-cream rounded-xl px-3 py-2">
                <ShieldCheck size={16} className="text-status-success shrink-0" />
                <p className="text-xs text-brand-espresso/70">
                  الدفع عند الاستلام — ادفع بس لما توصلك الطلبية
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={14} className="text-status-warning shrink-0" />
                <p className="text-xs text-brand-espresso/60">
                  عرض ٣ قطع يوفرك أكثر — اختَر اللي يناسبك.
                </p>
              </div>

              {crossSells.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-sm text-brand-espresso">قد يعجبك كمان</h3>
                  {crossSells.map((p) => (
                    <CrossSellCard
                      key={p.id}
                      product={p as Product}
                      onAdd={() => {
                        addItem(p as Product, (p as Product).offers.find((o) => o.pieces === 1)!);
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-4 py-4 border-t border-brand-border bg-brand-ivory">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-brand-espresso">المجموع</span>
              <span className="font-bold text-brand-primary text-xl">{formatPrice(total)}</span>
            </div>
            <Button onClick={handleCheckout} fullWidth size="lg">
              أكمل الطلب الحين
            </Button>
            <p className="text-center text-xs text-brand-espresso/50 mt-2">
              الدفع عند الاستلام · تأكيد بالجوال
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function CartItemRow({ item, onRemove }: { item: CartItem; onRemove: (id: string) => void }) {
  const product = getProductById(item.productId);

  return (
    <div className="flex items-center gap-3 bg-brand-cream rounded-xl p-3">
      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-brand-ivory shrink-0 ring-1 ring-brand-border/50">
        {product?.imagePlaceholder ? (
          <Image
            src={product.imagePlaceholder}
            alt={product.arabicName}
            fill
            className="object-contain p-1"
            sizes="56px"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-brand-primary/50 text-2xl font-arabic font-bold">
            ر
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0 text-right">
        <p className="font-bold text-sm text-brand-espresso line-clamp-1">{product?.shortHeading ?? item.name}</p>
        <p className="text-xs text-brand-espresso/60">{item.offerPieces} قطع</p>
        <p className="font-bold text-brand-primary">{formatPrice(item.total)}</p>
      </div>
      <button
        onClick={() => onRemove(item.productId)}
        aria-label="حذف من السلة"
        className="p-1.5 hover:bg-brand-border/50 rounded-lg transition-colors"
      >
        <Trash2 size={16} className="text-brand-espresso/40 hover:text-status-error" />
      </button>
    </div>
  );
}

function CrossSellCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
}) {
  const fromOffer = product.offers.find((o) => o.pieces === 1)!;

  return (
    <div className="flex items-center gap-3 bg-brand-cream rounded-xl p-3 border border-brand-border">
      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-ivory shrink-0 ring-1 ring-brand-border/50">
        <Image
          src={product.imagePlaceholder}
          alt={product.arabicName}
          fill
          className="object-contain p-0.5"
          sizes="48px"
        />
      </div>
      <div className="flex-1 text-right">
        <p className="font-bold text-sm text-brand-espresso">{product.shortHeading}</p>
        <PriceDisplay
          price={fromOffer.price}
          compareAtPrice={fromOffer.compareAtPrice}
          size="sm"
          className="mt-0.5"
        />
      </div>
      <button
        onClick={onAdd}
        className="shrink-0 bg-brand-primary text-brand-ivory text-xs font-bold px-3 py-1.5 rounded-full hover:bg-opacity-90 transition-colors"
      >
        أضف
      </button>
    </div>
  );
}
