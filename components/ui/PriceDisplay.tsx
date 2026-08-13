import { formatPrice } from "@/lib/currency";
import { getDiscountPercent } from "@/lib/pricing";
import { clsx } from "clsx";

type PriceDisplayProps = {
  price: number;
  compareAtPrice: number;
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
  showBadge?: boolean;
  className?: string;
};

const sizeStyles = {
  sm: {
    compare: "text-[11px]",
    price: "text-sm",
    badge: "text-[9px] px-1.5 py-0.5",
  },
  md: {
    compare: "text-xs",
    price: "text-base",
    badge: "text-[10px] px-2 py-0.5",
  },
  lg: {
    compare: "text-sm",
    price: "text-2xl",
    badge: "text-[10px] px-2.5 py-1",
  },
};

export default function PriceDisplay({
  price,
  compareAtPrice,
  size = "md",
  inverted = false,
  showBadge = false,
  className,
}: PriceDisplayProps) {
  const styles = sizeStyles[size];
  const discount = getDiscountPercent(price, compareAtPrice);
  const showCompare = compareAtPrice > price;

  return (
    <div className={clsx("flex flex-col items-end gap-0.5", className)}>
      {showBadge && (
        <span
          className={clsx(
            "font-black rounded-full leading-none",
            styles.badge,
            inverted ? "bg-brand-gold text-brand-primary" : "bg-status-error/10 text-status-error"
          )}
        >
          عرض مؤقت{discount > 0 ? ` −${discount}%` : ""}
        </span>
      )}
      <div className="flex items-baseline gap-2 flex-wrap justify-end">
        <span
          className={clsx(
            "font-black",
            styles.price,
            inverted ? "text-brand-gold" : "text-brand-primary"
          )}
        >
          {formatPrice(price)}
        </span>
        {showCompare && (
          <span
            className={clsx(
              "line-through font-medium",
              styles.compare,
              inverted ? "text-brand-champagne/50" : "text-brand-espresso/40"
            )}
          >
            {formatPrice(compareAtPrice)}
          </span>
        )}
      </div>
    </div>
  );
}
