import { Product } from "@/lib/products";
import { RiadsLogoMark } from "@/components/brand/RiadsLogo";
import BrandSideRail from "@/components/brand/BrandSideRail";
import { clsx } from "clsx";
import { FlaskConical, Leaf, ListOrdered, Sparkles } from "lucide-react";

export type BrandPanelVariant = "pain" | "science" | "ingredients" | "usage";

interface BrandVisualPanelProps {
  product: Product;
  variant: BrandPanelVariant;
  className?: string;
}

const variantMeta: Record<
  BrandPanelVariant,
  { icon: typeof Sparkles; title: string; subtitle: string }
> = {
  pain: {
    icon: Sparkles,
    title: "المشكلة",
    subtitle: "روتين رياض — حل مركّز",
  },
  science: {
    icon: FlaskConical,
    title: "الفعالية",
    subtitle: "مثبت بعناية · بلا مبالغة",
  },
  ingredients: {
    icon: Leaf,
    title: "المكونات",
    subtitle: "طبيعية · مختارة",
  },
  usage: {
    icon: ListOrdered,
    title: "الاستعمال",
    subtitle: "خطوات بسيطة",
  },
};

export default function BrandVisualPanel({ product, variant, className = "" }: BrandVisualPanelProps) {
  const meta = variantMeta[variant];
  const Icon = meta.icon;
  const name = product.shortHeading.split(":")[0];

  return (
    <div
      className={clsx(
        "grid gap-3 md:grid-cols-[minmax(0,1fr)_4.5rem]",
        className
      )}
    >
      <div
        className="relative aspect-square overflow-hidden rounded-2xl border border-brand-border shadow-md"
        style={{
          background: `linear-gradient(145deg, ${product.imageColor}18 0%, #FFF9F2 45%, #F7EFE6 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${product.imageColor} 0, ${product.imageColor} 1px, transparent 0, transparent 14px)`,
          }}
        />
        <div className="absolute top-4 right-4 opacity-20">
          <RiadsLogoMark className="w-16 h-16" />
        </div>

        <div className="relative z-10 h-full flex flex-col p-6 text-right">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span
              className="text-[10px] font-bold uppercase tracking-widest ltr-text opacity-70"
              style={{ color: product.imageColor }}
            >
              riads
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-brand-ivory"
              style={{ backgroundColor: product.imageColor }}
            >
              <Icon size={12} />
              {meta.title}
            </span>
          </div>

          <h3 className="font-arabic font-bold text-2xl text-brand-espresso mb-1">{name}</h3>
          <p className="text-sm text-brand-espresso/60 mb-4">{meta.subtitle}</p>

          {variant === "pain" && (
            <ul className="flex flex-col gap-2 mt-auto">
              {product.painBullets.slice(0, 3).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-brand-espresso/80">
                  <span className="text-status-error font-bold shrink-0">✕</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {variant === "science" && (
            <p className="text-sm text-brand-espresso/75 leading-relaxed mt-auto line-clamp-6">
              {product.mechanism.slice(0, 180)}…
            </p>
          )}

          {variant === "ingredients" && (
            <ul className="flex flex-col gap-2 mt-auto">
              {product.ingredients.map((ing) => (
                <li
                  key={ing.name}
                  className="flex items-center gap-2 bg-brand-ivory/80 rounded-xl px-3 py-2 border border-brand-border/60"
                >
                  <span className="text-brand-gold font-bold">✦</span>
                  <span className="text-sm font-bold text-brand-espresso">{ing.name}</span>
                </li>
              ))}
            </ul>
          )}

          {variant === "usage" && (
            <ol className="flex flex-col gap-2 mt-auto">
              {product.usageSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-2 text-sm text-brand-espresso/80">
                  <span
                    className="w-6 h-6 rounded-full text-brand-ivory text-xs font-bold flex items-center justify-center shrink-0"
                    style={{ backgroundColor: product.imageColor }}
                  >
                    {i + 1}
                  </span>
                  <span className="line-clamp-2">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: product.imageColor }}
        />
      </div>

      <BrandSideRail accent={product.imageColor} className="min-h-full" />
    </div>
  );
}
