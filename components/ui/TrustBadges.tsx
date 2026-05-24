import { ShieldCheck, Phone, Package, Truck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, text: "الدفع عند الاستلام", sub: "خلص ملي توصلك" },
  { icon: Phone, text: "تأكيد الطلب بالهاتف", sub: "قبل الإرسال" },
  { icon: Truck, text: "توصيل داخل المغرب", sub: "مع تتبع الطلب" },
  { icon: Package, text: "تغليف عناية", sub: "وصول بأمان" },
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
          : "flex flex-wrap justify-center gap-4 md:gap-6"
      } ${className}`}
    >
      {badges.map((b) => (
        <div
          key={b.text}
          className="flex flex-col items-center gap-1 text-center"
        >
          <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-border flex items-center justify-center">
            <b.icon size={18} className="text-brand-primary" />
          </div>
          <span className="text-xs font-bold text-brand-espresso">{b.text}</span>
          <span className="text-[10px] text-brand-espresso/60">{b.sub}</span>
        </div>
      ))}
    </div>
  );
}
