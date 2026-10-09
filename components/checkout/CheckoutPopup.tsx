"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/lib/cart";
import { getProductById } from "@/lib/products";
import { validatePhone } from "@/lib/phone";
import { formatPrice } from "@/lib/currency";
import { createOrder } from "@/lib/api";
import {
  getCookies,
  getClickIds,
  getUTMs,
  getLandingUrl,
  getReferrer,
  generateFreshEventId,
} from "@/lib/events";
import { trackPurchase } from "@/lib/tracking";
import { savePendingPurchase } from "@/components/tracking/ThankYouPurchase";
import { X, ShieldCheck } from "lucide-react";

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "المرجو إدخال الاسم الكامل (3 أحرف على الأقل)")
    .max(150, "الاسم طويل جداً"),

  phone: z
    .string()
    .trim()
    .min(9, "المرجو إدخال رقم الهاتف")
    .max(30, "رقم الهاتف غير صحيح"),
});

type FormData = z.infer<typeof schema>;
type Country = "SA" | "AE";

export default function CheckoutPopup() {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState<Country>("SA");

  const total = getTotalPrice();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFieldError,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (loading) return;

    setError(null);
    clearErrors("phone");

    if (items.length === 0) {
      setError("السلة فارغة. المرجو إضافة منتج قبل تأكيد الطلب.");
      return;
    }

    const phoneResult = validatePhone(data.phone, country);

    if (!phoneResult.valid || !phoneResult.e164) {
      setFieldError("phone", {
        type: "validate",
        message:
          phoneResult.error ||
          "المرجو إدخال رقم هاتف صحيح للدولة المحددة.",
      });
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
        sku:
          item.sku ||
          getProductById(item.productId)?.sku ||
          "",
        name: item.name,
        offer_pieces: item.offerPieces,
        quantity: item.quantity,
        unit_bundle_price: item.unitBundlePrice,
        total: item.total,
      }));

      const response = await createOrder({
        customer: {
          full_name: data.fullName.trim(),
          phone: data.phone.trim(),
          phone_e164: phoneResult.e164,
          country,
        },

        items: orderItems,

        totals: {
          subtotal: total,
          shipping: 0,
          total,
          currency: country === "SA" ? "SAR" : "AED",
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

      savePendingPurchase({
        orderCode: response.order_code,
        total,
        eventId,
        items: items.map((item) => ({
          id: item.productId,
          name: item.name,
          quantity: item.offerPieces * item.quantity,
          price: item.total,
        })),
      });

      trackPurchase(
        response.order_code,
        total,
        items.map((item) => ({
          id: item.productId,
          name: item.name,
          quantity: item.offerPieces * item.quantity,
          price: item.total,
        })),
        eventId
      );

      clearCart();
      closeCheckout();

      await new Promise((resolve) => setTimeout(resolve, 800));

      window.location.href =
        `/thank-you?order=${encodeURIComponent(
          response.order_code
        )}&v=${encodeURIComponent(
          String(total)
        )}&eid=${encodeURIComponent(eventId)}`;
    } catch (err: unknown) {
      const apiError = err as {
        detail?: {
          message_ar?: string;
          code?: string;
        };
        status?: number;
        message?: string;
      };

      if (apiError.detail?.message_ar) {
        setError(apiError.detail.message_ar);
      } else if (apiError.status === 403) {
        setError(
          "تعذر إتمام الطلب من هذا الاتصال. جرّب شبكة عادية بدون VPN."
        );
      } else if (apiError.status === 422) {
        setError(
          "بعض بيانات الطلب غير صحيحة. المرجو مراجعة رقم الهاتف والدولة والعملة."
        );
      } else {
        setError(
          "حدث خطأ أثناء إرسال الطلب. المرجو المحاولة مجدداً."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isCheckoutOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-brand-espresso/60 drawer-overlay animate-fade-in"
        onClick={() => {
          if (!loading) closeCheckout();
        }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-x-4 top-4 bottom-4 z-50 max-w-md mx-auto bg-brand-ivory rounded-2xl shadow-2xl animate-scale-in flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="إتمام الطلب"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-brand-border">
          <button
            type="button"
            onClick={closeCheckout}
            disabled={loading}
            aria-label="إغلاق"
            className="p-1 hover:bg-brand-cream rounded-full disabled:opacity-50"
          >
            <X size={18} />
          </button>

          <h2 className="font-arabic font-bold text-brand-espresso text-lg">
            تأكيد الطلب
          </h2>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto flex-1">
          <div className="bg-brand-cream rounded-xl p-4">
            <h3 className="font-bold text-sm text-brand-espresso mb-3">
              ملخص الطلب
            </h3>

            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center mb-2 gap-3"
              >
                <span className="font-bold text-brand-primary shrink-0">
                  {formatPrice(item.total)}
                </span>

                <span className="text-sm text-brand-espresso/80 text-right">
                  {item.offerPieces}{" "}
                  {item.offerPieces === 1 ? "عبوة" : "عبوات"}{" "}
                  ×{" "}
                  {item.name.split(" ").slice(1, 3).join(" ")}
                  {item.quantity > 1 && ` (${item.quantity})`}
                </span>
              </div>
            ))}

            <div className="border-t border-brand-border pt-2 flex justify-between items-center">
              <span className="font-bold text-brand-primary text-lg">
                {formatPrice(total)}
              </span>

              <span className="font-bold text-brand-espresso">
                المجموع
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-status-success/10 border border-status-success/30 rounded-xl px-4 py-3">
            <ShieldCheck
              size={18}
              className="text-status-success shrink-0"
            />

            <p className="text-sm text-brand-espresso/80">
              <span className="font-bold">الدفع عند الاستلام</span>
              {" "}— تدفع فقط عند استلام الطلبية
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1.5">
              <label
                className="font-bold text-sm text-brand-espresso"
                htmlFor="fullName"
              >
                الاسم الكامل *
              </label>

              <input
                id="fullName"
                type="text"
                autoComplete="name"
                disabled={loading}
                placeholder="مثال: محمد أو فاطمة العلوي"
                className="w-full rounded-xl border border-brand-border bg-brand-ivory px-4 py-3 text-brand-espresso text-base focus:outline-none focus:border-brand-primary transition-colors disabled:opacity-60"
                {...register("fullName")}
              />

              {errors.fullName && (
                <p className="text-status-error text-xs">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="font-bold text-sm text-brand-espresso"
                htmlFor="country"
              >
                الدولة *
              </label>

              <select
                id="country"
                value={country}
                disabled={loading}
                onChange={(e) => {
                  setCountry(e.target.value as Country);
                  clearErrors("phone");
                  setError(null);
                }}
                className="w-full rounded-xl border border-brand-border bg-brand-ivory px-4 py-3 text-brand-espresso text-base focus:outline-none focus:border-brand-primary transition-colors disabled:opacity-60"
              >
                <option value="SA">🇸🇦 السعودية (+966)</option>
                <option value="AE">🇦🇪 الإمارات (+971)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="font-bold text-sm text-brand-espresso"
                htmlFor="phone"
              >
                رقم الهاتف *
              </label>

              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                dir="ltr"
                disabled={loading}
                placeholder="05XXXXXXXX"
                className="w-full rounded-xl border border-brand-border bg-brand-ivory px-4 py-3 text-brand-espresso text-base focus:outline-none focus:border-brand-primary transition-colors text-left disabled:opacity-60"
                {...register("phone")}
              />

              <p className="text-xs text-brand-espresso/50">
                {country === "SA"
                  ? "أدخل رقم الجوال السعودي، مثال: 0512345678"
                  : "أدخل رقم الجوال الإماراتي، مثال: 0501234567"}
              </p>

              {errors.phone && (
                <p className="text-status-error text-xs">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {error && (
              <div
                role="alert"
                className="bg-status-error/10 border border-status-error/30 rounded-xl px-4 py-3"
              >
                <p className="text-status-error text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="mt-2 w-full py-4 px-6 rounded-full bg-brand-cta text-white font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:bg-brand-cta-hover active:bg-brand-cta-hover active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "جاري معالجة الطلب..."
                : `تأكيد الطلب — ${formatPrice(total)}`}
            </button>
          </form>

          <p className="text-center text-xs text-brand-espresso/40">
            سنتصل بك لتأكيد الطلب قبل الإرسال. معلوماتك بأمان وسرية تامة.
          </p>
        </div>
      </div>
    </>
  );
}
