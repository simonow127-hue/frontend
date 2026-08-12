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

        const handleSelect = () => {
          if (offer.pieces === 1 || offer.pieces === 2 || offer.pieces === 3) {
            onChange(offer.pieces);
          }
        };

        return (
          <button
            key={offer.pieces}
            type="button"
            onClick={handleSelect}
            aria-pressed={isSelected}
            className={[
              "w-full rounded-2xl border-2 p-4 text-right transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
              isSelected
                ? "border-brand-primary bg-brand-primary/10 shadow-md"
                : "border-brand-border bg-brand-ivory hover:border-brand-primary/50",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    isSelected
                      ? "border-brand-primary bg-brand-primary text-white"
                      : "border-brand-border bg-brand-ivory text-transparent",
                  ].join(" ")}
                >
                  <Check size={15} strokeWidth={3} />
                </span>

                <div>
                  <p className="font-bold text-brand-espresso">
                    {offer.pieces === 1
                      ? "عبوة واحدة"
                      : `${offer.pieces} عبوات`}
                  </p>

                  {offer.pieces === 2 && (
                    <p className="text-xs text-brand-primary font-bold mt-1">
                      عرض التوفير
                    </p>
                  )}

                  {offer.pieces === 3 && (
                    <p className="text-xs text-brand-primary font-bold mt-1">
                      أفضل قيمة
                    </p>
                  )}
                </div>
              </div>

              <div className="text-left shrink-0">
                <p
                  className={[
                    "font-bold text-lg",
                    isSelected
                      ? "text-brand-primary"
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
