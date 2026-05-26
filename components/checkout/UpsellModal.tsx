"use client";
import { useState, useEffect, useRef } from "react";
import { getProductById } from "@/lib/products";
import { applyUpsell } from "@/lib/api";
import { sendOrderToGoogleSheet, type SheetCustomer, type SheetLineItem } from "@/lib/sheets";
import Button from "@/components/ui/Button";
import { Clock, X } from "lucide-react";

const UPSELL_DURATION = 12; // seconds

const GRADIENTS: Record<string, string> = {
  jadr: "from-[#9A4E36]/20 to-[#C9A45C]/20",
  nour: "from-[#C9A45C]/20 to-[#E8C8B6]/30",
  naqaa: "from-[#7A8061]/20 to-[#9A4E36]/20",
};

interface UpsellModalProps {
  orderId: string;
  orderCode: string;
  customer: SheetCustomer;
  baseItems: SheetLineItem[];
  baseTotalMad: number;
  upsell: {
    recommended_product_id: string;
    offer_pieces: number;
    price_mad: number;
  };
  onDone: () => void;
}

export default function UpsellModal({
  orderId,
  orderCode,
  customer,
  baseItems,
  baseTotalMad,
  upsell,
  onDone,
}: UpsellModalProps) {
  const [timeLeft, setTimeLeft] = useState(UPSELL_DURATION);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const product = getProductById(upsell.recommended_product_id);
  const gradient = GRADIENTS[upsell.recommended_product_id] || "from-brand-cream to-brand-rose";

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          onDone();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [onDone]);

  const handleAccept = async () => {
    if (!product) return;
    clearInterval(timerRef.current!);
    setLoading(true);
    try {
      const res = await applyUpsell(orderId, {
        item: {
          product_id: product.id,
          slug: product.slug,
          name: product.arabicName,
          offer_pieces: upsell.offer_pieces,
          price_mad: upsell.price_mad,
        },
      });
      const sheetItems: SheetLineItem[] = [
        ...baseItems,
        {
          product_id: product.id,
          name: product.arabicName,
          offer_pieces: upsell.offer_pieces,
        },
      ];
      void sendOrderToGoogleSheet(
        orderCode,
        customer,
        sheetItems,
        res.new_total_mad
      );
    } catch {
      // Non-blocking — proceed to thank you regardless
    } finally {
      onDone();
    }
  };

  const progressPct = (timeLeft / UPSELL_DURATION) * 100;

  if (!product) {
    onDone();
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-60 bg-brand-espresso/70 animate-fade-in" />
      <div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-60 max-w-sm mx-auto bg-brand-ivory rounded-2xl shadow-2xl animate-scale-in overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="عرض إضافي"
      >
        {/* Countdown bar */}
        <div className="h-1.5 bg-brand-border">
          <div
            className="h-full bg-brand-primary transition-none"
            style={{ width: `${progressPct}%`, transition: "width 1s linear" }}
          />
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Timer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-status-warning text-sm font-bold">
              <Clock size={16} />
              <span>العرض ينتهي بعد {timeLeft} ثانية</span>
            </div>
            <button onClick={onDone} aria-label="تخطي" className="p-1 hover:bg-brand-cream rounded-full">
              <X size={16} className="text-brand-espresso/40" />
            </button>
          </div>

          {/* Header */}
          <div className="text-center">
            <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1 rounded-full mb-2">
              عرض حصري قبل التأكيد النهائي
            </span>
            <h3 className="font-arabic font-bold text-brand-espresso text-xl leading-snug">
              زيد/ي {product.shortHeading} قبل تأكيد طلبك!
            </h3>
          </div>

          {/* Product preview */}
          <div className={`bg-gradient-to-br ${gradient} rounded-xl p-4 flex items-center gap-4`}>
            <div className="w-16 h-16 rounded-xl bg-brand-primary/20 flex items-center justify-center shrink-0">
              <span className="text-brand-primary font-arabic font-bold text-2xl">
                {product.shortHeading[0]}
              </span>
            </div>
            <div className="flex-1 text-right">
              <p className="font-bold text-brand-espresso">{product.shortHeading}</p>
              <p className="text-sm text-brand-espresso/60 line-clamp-2">{product.subheading}</p>
              <p className="font-bold text-brand-primary mt-1">+ {upsell.price_mad} درهم</p>
            </div>
          </div>

          {/* Social proof */}
          <p className="text-center text-sm text-brand-espresso/60">
            زبائن بزاف كيكملو الروتين بـ{product.shortHeading.split(":")[0]} بعد طلبهم
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-2">
            <Button onClick={handleAccept} fullWidth size="lg" loading={loading}>
              زيد/يها للطلب — + {upsell.price_mad} درهم
            </Button>
            <button
              onClick={onDone}
              className="text-sm text-brand-espresso/50 hover:text-brand-espresso py-2 transition-colors"
            >
              لا شكراً، كمل/ي الطلب
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
