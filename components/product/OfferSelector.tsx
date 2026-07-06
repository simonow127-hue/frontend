"use client";
import { Offer } from "@/lib/products";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { clsx } from "clsx";
import { Check } from "lucide-react";

interface OfferSelectorProps {
  offers: Offer[];
  selected: 1 | 2 | 3;
  onChange: (pieces: 1 | 2 | 3) => void;
}

export default function OfferSelector({ offers, selected, onChange }: OfferSelectorProps) {
  return (
    <div className="flex flex-col gap-3" role="group" aria-label="اختر الكمية">
      {offers.map((offer) => {
        const isSelected = selected === offer.pieces;
        const is3Pieces = offer.pieces === 3;

        return (
          <button
            key={offer.pieces}
            type="button"
            onClick={() => onChange(offer.pieces)}
            aria-pressed={isSelected}
            className={clsx(
              "relative flex items-center justify-between rounded-offer border-2 p-4 text-right transition-all duration-200 cursor-pointer",
              isSelected
                ? "border-brand-primary bg-brand-cream shadow-md shadow-brand-primary/20"
                : "border-brand-border bg-brand-ivory hover:border-brand-primary/50",
              is3Pieces && !isSelected && "border-brand-gold/50 bg-brand-cream/50"
            )}
          >
            {/* Badge */}
            {offer.badge && (
              <span className="absolute -top-3 right-4 bg-brand-primary text-brand-ivory text-xs font-bold px-3 py-0.5 rounded-full">
                {offer.badge}
              </span>
            )}

            {/* Left: checkmark + price */}
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  isSelected ? "border-brand-primary bg-brand-primary" : "border-brand-border"
                )}
              >
                {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
              </div>
              <div className="text-right">
                <PriceDisplay
                  price={offer.price}
                  compareAtPrice={offer.compareAtPrice}
                  size="sm"
                />
                <div className="text-xs text-brand-espresso/60 mt-0.5">{offer.sublabel}</div>
              </div>
            </div>

            {/* Right: label + pieces */}
            <div className="text-right">
              <div className={clsx("font-bold text-base", is3Pieces ? "text-brand-primary" : "text-brand-espresso")}>
                {offer.label}
              </div>
              <div className="text-xs text-brand-espresso/50">
                {offer.pieces === 1 ? "قطعة واحدة" : offer.pieces === 2 ? "قطعتان" : "ثلاث قطع"}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
