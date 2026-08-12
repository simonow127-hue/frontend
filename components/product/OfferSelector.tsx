"use client";

import type { Offer } from "@/lib/products";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/currency";

type OfferSelectorProps = {
  offers: Offer[];
  selected: 1 | 2 | 3;
  onChange: (pieces: 1 | 2 | 3) => void;
};

export default function OfferSelector({
  offers,
  selected,
  onChange,
}: OfferSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5" dir="rtl">
      {offers.map((offer) => {
        const isSelected = selected === offer.pieces;

        const title =
          offer.pieces === 1
            ? "عرض أساسي"
            : offer.pieces === 2
              ? "عبوتين"
              : "3 قطع";

        const subtitle =
          offer.pieces === 1
            ? "عبوة واحدة"
            : offer.pieces === 2
              ? "عرض التوفير"
              : "أفضل قيمة";

        return (
          <button
            key={offer.pieces}
            type="button"
            onClick={() => {
              onChange(offer.pieces);
            }}
            aria-pressed={isSelected}
            className={[
              "w-full rounded-xl border-2 px-4 py-3",
              "flex items-center justify-between",
              "text-right transition-all duration-200",
              "focus:outline-none focus-visible:ring-2",
              "focus-visible:ring-brand-primary",
              isSelected
                ? "border-brand-primary bg-brand-primary/5 shadow-sm"
                : "border-brand-border bg-brand-ivory hover:border-brand-primary/50",
            ].join(" ")}
          >
            {/* النص */}
            <div className="flex items-center gap-3 min-w-0">
              {/* دائرة الاختيار */}
              <span
                className={[
                  "flex h-5 w-5 shrink-0 items-center justify-center",
                  "rounded-full border-2 transition-all duration-200",
                  isSelected
                    ? "border-brand-primary bg-brand-primary text-white"
                    : "border-brand-border bg-brand-ivory text-transparent",
                ].join(" ")}
              >
                {isSelected && <Check size={12} strokeWidth={3} />}
              </span>

              <div className="min-w-0">
                <p className="font-bold text-sm text-brand-espresso leading-tight">
                  {title}
                </p>

                <p
                  className={[
                    "text-xs font-bold mt-1",
                    isSelected
                      ? "text-brand-primary"
                      : "text-brand-espresso/60",
                  ].join(" ")}
                >
                  {subtitle}
                </p>
              </div>
            </div>

            {/* السعر */}
            <div className="text-left shrink-0 mr-3">
              <p
                className={[
                  "font-bold text-base leading-tight",
                  isSelected
                    ? "text-brand-primary"
                    : "text-brand-espresso",
                ].join(" ")}
              >
                {formatPrice(offer.price)}
              </p>

              {offer.compareAtPrice &&
                offer.compareAtPrice > offer.price && (
                  <p className="text-[11px] text-brand-espresso/40 line-through mt-0.5">
                    {formatPrice(offer.compareAtPrice)}
                  </p>
                )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
