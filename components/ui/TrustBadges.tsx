import { ShieldCheck, Phone, Package, Truck, RotateCcw } from "lucide-react";

const badges = [
  { icon: ShieldCheck, text: "دفع عند الاستلام", sub: "ادفع لما يوصلك" },
  { icon: Truck, text: "توصيل سريع", sub: "لكل مناطق المملكة" },
  { icon: RotateCcw, text: "استرجاع سهل", sub: "خلال ٧ أيام" },
  { icon: Package, text: "تغليف فاخر", sub: "يصل بأمان" },
];

interface TrustBadgesProps {
  variant?: "row" | "grid";
  className?: string;
}

export default function TrustBadges({ variant = "row", className = "" }: TrustBadgesProps) {
  return (
    <div
      className={`${
        variant === "grid"
          ? "grid grid-cols-2 gap-3"
          : "flex flex-wrap justify-center gap-4 md:gap-8"
      } ${className}`}
    >
      {badges.map((b) => (
        <div key={b.text} className="flex flex-col items-center gap-1 text-center">
          <div className="w-10 h-10 rounded-full bg-brand-ivory border border-brand-border flex items-center justify-center">
            <b.icon size={18} className="text-brand-gold" />
          </div>
          <span className="text-xs font-bold text-brand-espresso">{b.text}</span>
          <span className="text-[10px] text-brand-espresso/60">{b.sub}</span>
        </div>
      ))}
    </div>
  );
}
