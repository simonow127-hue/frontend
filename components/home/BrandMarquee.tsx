import {
  CreditCard,
  Truck,
  ShieldCheck,
  Star,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import BrandMark from "@/components/brand/BrandMark";

type MarqueeItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  useBrandMark?: boolean;
};

const ITEMS: MarqueeItem[] = [
  { id: "brand", label: "رياض", useBrandMark: true },
  { id: "cod", label: "دفع عند الاستلام", icon: CreditCard },
  { id: "shipping", label: "توصيل سريع لكل المملكة", icon: Truck },
  { id: "curated", label: "منتجات مختارة بعناية", icon: ShieldCheck },
  { id: "reviews", label: "تقييمات حقيقية", icon: Star },
  { id: "service", label: "خدمة تليق فيك", icon: HeartHandshake },
];

function MarqueePill({ item }: { item: MarqueeItem }) {
  const Icon = item.icon;

  return (
    <span className="inline-flex items-center gap-2.5 mx-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/15 shrink-0 whitespace-nowrap">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary/15 border border-brand-primary/20 shrink-0">
        {item.useBrandMark ? (
          <BrandMark size="sm" className="!h-5 !w-5" />
        ) : Icon ? (
          <Icon size={14} className="text-brand-primary" strokeWidth={2.25} />
        ) : null}
      </span>
      <span className="text-sm font-bold font-arabic text-brand-primary tracking-wide">
        {item.label}
      </span>
    </span>
  );
}

export default function BrandMarquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <section
      data-header-theme="light"
      className="bg-brand-gold border-y border-brand-primary/10 py-3 overflow-hidden"
      aria-label="مميزات رياض"
    >
      {/* LTR track keeps the infinite scroll smooth in RTL pages */}
      <div className="overflow-hidden" dir="ltr">
        <div className="flex w-max animate-marquee items-center">
          {track.map((item, i) => (
            <MarqueePill key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
