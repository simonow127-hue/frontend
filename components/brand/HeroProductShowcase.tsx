import { Product } from "@/lib/products";
import ProductImage from "@/components/ui/ProductImage";
import BrandSideRail from "@/components/brand/BrandSideRail";
import { RiadsLogoLockup } from "@/components/brand/RiadsLogo";
import ProductBottleLabelOverlay from "@/components/brand/ProductBottleLabelOverlay";

interface HeroProductShowcaseProps {
  products: Product[];
  compact?: boolean;
}

/** Hero — منتجات + branding على الجنب */
export default function HeroProductShowcase({ products, compact = false }: HeroProductShowcaseProps) {
  return (
    <div className="grid md:grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
      <BrandSideRail className="min-h-full order-2 md:order-1" />

      <div className="flex flex-col gap-3 order-1 md:order-2">
        <div
          className={`relative rounded-2xl overflow-hidden border border-brand-border bg-gradient-to-br from-brand-cream to-brand-ivory shadow-xl ${
            compact ? "p-3 md:p-4" : "p-4 md:p-6"
          }`}
        >
          <div className="absolute top-3 left-3 z-10 bg-brand-ivory/90 backdrop-blur-sm rounded-xl px-2.5 py-1.5 border border-brand-border/60 shadow-sm">
            <RiadsLogoLockup compact />
          </div>

          <div
            className={`grid grid-cols-3 gap-2 md:gap-3 ${compact ? "mt-12" : "mt-14 md:mt-12"}`}
          >
            {products.map((p) => (
              <ProductImage
                key={p.id}
                src={p.imagePlaceholder}
                alt={p.arabicName}
                aspect="portrait"
                className="!rounded-xl"
                sizes="(max-width: 768px) 30vw, 15vw"
                overlay={<ProductBottleLabelOverlay product={p} size="thumb" />}
              />
            ))}
          </div>

          <p className="text-center text-xs text-brand-espresso/50 mt-4 font-arabic">
            جدر · نور · نقاء — روتين واحد متكامل
          </p>
        </div>

        {!compact && (
          <div className="grid grid-cols-3 gap-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="text-center rounded-xl py-2 px-1 border border-brand-border bg-brand-ivory"
              >
                <span className="block font-arabic font-bold text-xs text-brand-espresso">
                  {p.shortHeading.split(":")[0]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
