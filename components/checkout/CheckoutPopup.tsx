"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/lib/cart";
import { validateMoroccanPhone } from "@/lib/phone";
import { createOrder } from "@/lib/api";
import { getCookies, getClickIds, getUTMs, getLandingUrl, getReferrer, generateFreshEventId } from "@/lib/events";
import { trackPurchase } from "@/lib/tracking";
import Button from "@/components/ui/Button";
import { X, ShieldCheck, Clock, Star } from "lucide-react";
import UpsellModal from "./UpsellModal";

const schema = z.object({
  fullName: z.string().min(3, "المرجو إدخال الاسم الكامل (3 أحرف على الأقل)"),
  phone: z.string().min(9, "المرجو إدخال رقم الهاتف"),
});

type FormData = z.infer<typeof schema>;

type OrderResult = {
  orderId: string;
  orderCode: string;
  upsell?: {
    recommended_product_id: string;
    offer_pieces: number;
    price_mad: number;
  };
  purchaseEventId: string;
};

export default function CheckoutPopup() {
  const { items, isCheckoutOpen, closeCheckout, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);

  const total = getTotalPrice();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFieldError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError(null);
    const phoneResult = validateMoroccanPhone(data.phone);
    if (!phoneResult.valid) {
      setFieldError("phone", { message: phoneResult.error });
      return;
    }

    setLoading(true);
    try {
      const cookies = getCookies();
      const clickIds = getClickIds();
      const utms = getUTMs();
      const eventId = generateFreshEventId("purchase");

      const orderItems = items.map((item) => ({
        product_id: item.productId,
        slug: item.slug,
        name: item.name,
        offer_pieces: item.offerPieces,
        quantity: item.quantity,
        unit_bundle_price: item.unitBundlePrice,
        total: item.total,
      }));

      const response = await createOrder({
        customer: {
          full_name: data.fullName,
          phone: data.phone,
          phone_e164: phoneResult.e164!,
        },
        items: orderItems,
        totals: {
          subtotal: total,
          shipping: 0,
          total,
          currency: "MAD",
        },
        source: {
          landing_url: getLandingUrl(),
          referrer: getReferrer(),
          ...utms,
          ...clickIds,
        },
        tracking: {
          event_id: eventId,
          fbp: cookies.fbp,
          fbc: cookies.fbc,
          ttp: cookies.ttp,
        },
      });

      // Fire browser purchase event
      trackPurchase(
        response.order_code,
        total,
        items.map((i) => ({ id: i.productId, name: i.name, quantity: i.offerPieces, price: i.total })),
        eventId
      );

      setOrderResult({
        orderId: response.order_id,
        orderCode: response.order_code,
        upsell: response.upsell,
        purchaseEventId: eventId,
      });

      if (response.upsell) {
        setShowUpsell(true);
      } else {
        clearCart();
        closeCheckout();
        window.location.href = `/thank-you?order=${response.order_code}`;
      }
    } catch (err: unknown) {
      const detail = (err as { detail?: { message_ar?: string } })?.detail;
      if (detail?.message_ar) {
        setError(detail.message_ar);
      } else {
        setError("حدث خطأ في الاتصال. المرجو المحاولة مجدداً.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isCheckoutOpen) return null;

  if (showUpsell && orderResult) {
    return (
      <UpsellModal
        orderId={orderResult.orderId}
        orderCode={orderResult.orderCode}
        upsell={orderResult.upsell!}
        onDone={() => {
          clearCart();
          closeCheckout();
          window.location.href = `/thank-you?order=${orderResult.orderCode}`;
        }}
      />
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-brand-espresso/60 drawer-overlay animate-fade-in"
        onClick={closeCheckout}
        aria-hidden="true"
      />
      <div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto bg-brand-ivory rounded-2xl shadow-2xl animate-scale-in overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-label="إتمام الطلب"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-brand-border">
          <button onClick={closeCheckout} aria-label="إغلاق" className="p-1 hover:bg-brand-cream rounded-full">
            <X size={18} />
          </button>
          <h2 className="font-arabic font-bold text-brand-espresso text-lg">تأكيد الطلب</h2>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Order summary */}
          <div className="bg-brand-cream rounded-xl p-4">
            <h3 className="font-bold text-sm text-brand-espresso mb-3">ملخص الطلب</h3>
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center mb-2">
                <span className="font-bold text-brand-primary">{item.total} درهم</span>
                <span className="text-sm text-brand-espresso/80">
                  {item.offerPieces} {item.offerPieces === 1 ? "عبوة" : "عبوات"} ×{" "}
                  {item.name.split(" ").slice(1, 3).join(" ")}
                </span>
              </div>
            ))}
            <div className="border-t border-brand-border pt-2 flex justify-between items-center">
              <span className="font-bold text-brand-primary text-lg">{total} درهم</span>
              <span className="font-bold text-brand-espresso">المجموع</span>
            </div>
          </div>

          {/* COD badge */}
          <div className="flex items-center gap-2 bg-status-success/10 border border-status-success/30 rounded-xl px-4 py-3">
            <ShieldCheck size={18} className="text-status-success shrink-0" />
            <p className="text-sm text-brand-espresso/80">
              <span className="font-bold">الدفع عند الاستلام</span> — تدفع فقط عند استلام الطلبية
            </p>
          </div>

          {/* Social proof mini */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1 rtl:space-x-reverse">
              {["م", "س", "ه", "ك"].map((l, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-brand-primary text-brand-ivory flex items-center justify-center text-xs font-bold border-2 border-brand-ivory">
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-brand-espresso/60">
              <Star size={12} className="text-brand-gold fill-brand-gold" />
              <span>الكثير من عملائنا يعاودون الطلب هذا الأسبوع</span>
            </div>
          </div>

          {/* Scarcity */}
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-status-warning shrink-0" />
            <span className="text-xs text-brand-espresso/60">
              السعر الحالي صالح للطلبات المؤكدة اليوم فقط.
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm text-brand-espresso" htmlFor="fullName">
                الاسم الكامل *
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="مثال: محمد أو فاطمة العلوي"
                className="w-full rounded-xl border border-brand-border bg-brand-ivory px-4 py-3 text-brand-espresso text-base focus:outline-none focus:border-brand-primary transition-colors"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-status-error text-xs">{errors.fullName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm text-brand-espresso" htmlFor="phone">
                رقم الهاتف (للتواصل) *
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                dir="ltr"
                placeholder="0612345678"
                className="w-full rounded-xl border border-brand-border bg-brand-ivory px-4 py-3 text-brand-espresso text-base focus:outline-none focus:border-brand-primary transition-colors text-left"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-status-error text-xs">{errors.phone.message}</p>
              )}
            </div>

            {error && (
              <div className="bg-status-error/10 border border-status-error/30 rounded-xl px-4 py-3">
                <p className="text-status-error text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" fullWidth size="lg" loading={loading} className="mt-2">
              تأكيد الطلب — {total} درهم
            </Button>
          </form>

          <p className="text-center text-xs text-brand-espresso/40">
            سنتصل بك لتأكيد الطلب قبل الإرسال. معلوماتك بأمان وسرية تامة.
          </p>
        </div>
      </div>
    </>
  );
}
