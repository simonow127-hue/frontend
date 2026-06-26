import { Star } from "lucide-react";

interface StarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}

export default function Stars({ rating, count, size = "md" }: StarsProps) {
  const starSize = size === "sm" ? 12 : 16;
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={starSize}
            className={i <= Math.round(rating) ? "text-brand-gold fill-brand-gold" : "text-brand-border"}
          />
        ))}
      </div>
      <span className={`text-brand-espresso font-bold ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={`text-brand-espresso/60 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          ({count.toLocaleString("ar-SA")} تقييم)
        </span>
      )}
    </div>
  );
}
