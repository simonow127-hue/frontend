"use client";
import { useCartStore, CartItem } from "@/lib/cart";
import { PRODUCTS, getProductById, Product } from "@/lib/products";
import { X, Trash2, ShieldCheck, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { generateFreshEventId } from "@/lib/events";
import { trackInitiateCheckout } from "@/lib/tracking";
import { trackEvent } from "@/lib/api";

const GRADIENTS: Record<string, string> = {
  jadr: "from-[#9A4E36]/30 to-[#C9A45C]/30",
  nour: "from-[#C9A45C]/30 to-[#E8C8B6]/40",
  naqaa: "from-[#7A8061]/30 to-[#9A4E36]/30",
};

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
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-brand-espresso/50 drawer-overlay animate-fade-in"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-brand-ivory shadow-2xl flex flex-col animate-slide-in-left"
        role="dialog"
        aria-label="سلة التسوق"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-brand-border">
          <button onClick={closeDrawer} aria-label="إغلاق" className="p-2 hover:bg-brand-cream rounded-full">
            <X size={20} />
          </button>
          <h2 className="font-arabic font-bold text-brand-espresso text-lg">سلة التسوق</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <span className="text-4xl">🛒</span>
              <p className="text-brand-espresso/60">السلة فارغة</p>
              <Button variant="secondary" onClick={closeDrawer} size="sm">
                اكتشف/ي المنتجات
              </Button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <CartItemRow key={item.productId} item={item} onRemove={removeItem} />
                ))}
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-2 bg-brand-cream rounded-xl px-3 py-2">
                <ShieldCheck size={16} className="text-status-success shrink-0" />
                <p className="text-xs text-brand-espresso/70">
                  الدفع عند الاستلام — خلص/ي غير ملي توصلك الطلبية
                </p>
              </div>

              {/* Scarcity */}
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-status-warning shrink-0" />
                <p className="text-xs text-brand-espresso/60">
                  الباك ديال 3 قطع هو الأكثر طلباً هاد الأسبوع.
                </p>
              </div>

              {/* Cross-sells */}
              {crossSells.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-sm text-brand-espresso">كمل/ي الروتين ديالك</h3>
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

        {/* Footer CTA */}
        {items.length > 0 && (
          <div className="px-4 py-4 border-t border-brand-border bg-brand-ivory">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-brand-espresso">المجموع</span>
              <span className="font-bold text-brand-primary text-xl">{total} درهم</span>
            </div>
            <Button onClick={handleCheckout} fullWidth size="lg">
              أكمل/ي الطلب الآن
            </Button>
            <p className="text-center text-xs text-brand-espresso/50 mt-2">
              الدفع عند الاستلام · تأكيد بالهاتف
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function CartItemRow({ item, onRemove }: { item: CartItem; onRemove: (id: string) => void }) {
  const product = getProductById(item.productId);
  const gradient = GRADIENTS[item.productId] || "from-brand-cream to-brand-rose";

  return (
    <div className="flex items-center gap-3 bg-brand-cream rounded-xl p-3">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
        <span className="text-brand-primary/50 text-2xl font-arabic font-bold">
          {product?.shortHeading?.[0] || "ر"}
        </span>
      </div>
      <div className="flex-1 min-w-0 text-right">
        <p className="font-bold text-sm text-brand-espresso line-clamp-1">{item.name.split(" ").slice(1, 3).join(" ")}</p>
        <p className="text-xs text-brand-espresso/60">{item.offerPieces} قطع</p>
        <p className="font-bold text-brand-primary">{item.total} درهم</p>
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
  const p = product;
  const gradient = GRADIENTS[p.id] || "from-brand-cream to-brand-rose";
  const fromPrice = p.offers.find((o) => o.pieces === 1)!.price;

  return (
    <div className="flex items-center gap-3 bg-brand-cream rounded-xl p-3 border border-brand-border">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
        <span className="text-brand-primary/40 text-xl font-arabic font-bold">{p.shortHeading[0]}</span>
      </div>
      <div className="flex-1 text-right">
        <p className="font-bold text-sm text-brand-espresso">{p.shortHeading}</p>
        <p className="text-xs text-brand-espresso/60">من {fromPrice} درهم</p>
      </div>
      <button
        onClick={onAdd}
        className="shrink-0 bg-brand-primary text-brand-ivory text-xs font-bold px-3 py-1.5 rounded-full hover:bg-opacity-90 transition-colors"
      >
        أضف/ي
      </button>
    </div>
  );
}
