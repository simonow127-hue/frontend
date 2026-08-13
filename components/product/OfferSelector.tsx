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
    <div className="flex flex-col gap-3">
      {offers.map((offer) => {
        const isSelected = selected === offer.pieces;
        const isBestValue = offer.pieces === 3;
        const perPiece = Math.round(offer.price / offer.pieces);

        return (
          <button
            key={offer.pieces}
            type="button"
            onClick={() => onChange(offer.pieces)}
            aria-pressed={isSelected}
            className={[
              "w-full rounded-2xl border-2 p-4 text-right transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cta",
              isBestValue
                ? isSelected
                  ? "border-brand-gold bg-brand-gold/10 shadow-md"
                  : "border-brand-gold/50 bg-brand-ivory hover:border-brand-gold"
                : isSelected
                  ? "border-brand-cta bg-brand-cta/10 shadow-md"
                  : "border-brand-border bg-brand-ivory hover:border-brand-cta/50",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    isSelected
                      ? isBestValue
                        ? "border-brand-gold bg-brand-gold text-brand-primary"
                        : "border-brand-cta bg-brand-cta text-white"
                      : "border-brand-border bg-brand-ivory text-transparent",
                  ].join(" ")}
                >
                  <Check size={15} strokeWidth={3} />
                </span>

                <div>
                  <div className="flex items-center gap-2 justify-end flex-wrap">
                    <p className="font-bold text-brand-espresso">
                      {offer.pieces === 1 && "عرض أساسي"}
                      {offer.pieces === 2 && "عرض التوفير"}
                      {offer.pieces === 3 && "أفضل قيمة"}
                    </p>
                    {offer.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-accent border border-brand-gold/30">
                        {offer.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-brand-espresso/70 mt-1">
                    {offer.pieces === 1 && "1 قطعة"}
                    {offer.pieces === 2 && "2 قطع"}
                    {offer.pieces === 3 && "3 قطع"}
                    {" · "}
                    ≈ {formatPrice(perPiece)} / قطعة
                  </p>
                </div>
              </div>

              <div className="text-left shrink-0">
                <p
                  className={[
                    "font-bold text-lg",
                    isSelected
                      ? isBestValue
                        ? "text-brand-accent"
                        : "text-brand-cta"
                      : "text-brand-espresso",
                  ].join(" ")}
                >
                  {formatPrice(offer.price)}
                </p>

                {offer.compareAtPrice &&
                  offer.compareAtPrice > offer.price && (
                    <p className="text-xs text-brand-espresso/40 line-through">
                      {formatPrice(offer.compareAtPrice)}
                    </p>
                  )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
