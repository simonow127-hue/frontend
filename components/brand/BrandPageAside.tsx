import { PRODUCTS, Product } from "@/lib/products";
import HeroProductShowcase from "@/components/brand/HeroProductShowcase";
import BrandSideRail from "@/components/brand/BrandSideRail";
import ProductImage from "@/components/ui/ProductImage";
import BrandedImageSlot from "@/components/brand/BrandedImageSlot";
import { RiadsLogoLockup, RiadsLogoMark } from "@/components/brand/RiadsLogo";
import ProductBottleLabelOverlay from "@/components/brand/ProductBottleLabelOverlay";
import { Package, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import Link from "next/link";

export type BrandAsideVariant = "routine" | "delivery" | "trust" | "contact" | "offers";

interface BrandPageAsideProps {
  variant: BrandAsideVariant;
}

function InfoPanel({
  icon: Icon,
  title,
  lines,
}: {
  icon: typeof Truck;
  title: string;
  lines: string[];
}) {
  return (
    <div className="relative rounded-2xl border border-brand-border bg-gradient-to-br from-brand-cream to-brand-ivory p-5 shadow-md overflow-hidden">
      <div className="absolute top-3 left-3 opacity-[0.08]">
        <RiadsLogoMark className="w-20 h-20" />
      </div>
      <div className="relative z-10 flex items-center gap-2 mb-4">
        <span className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center">
          <Icon size={18} className="text-brand-primary" />
        </span>
        <h2 className="font-arabic font-bold text-brand-espresso">{title}</h2>
      </div>
      <ul className="relative z-10 flex flex-col gap-2">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm text-brand-espresso/75">
            <span className="text-brand-gold font-bold shrink-0">✦</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductStrip({ products }: { products: Product[] }) {
  return (
    <div className="grid md:grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
      <BrandSideRail className="min-h-full hidden md:flex" />
      <div className="grid grid-cols-3 gap-2">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="block hover:opacity-90 transition-opacity">
            <ProductImage
              src={p.imagePlaceholder}
              alt={p.arabicName}
              aspect="square"
              className="!rounded-xl"
              sizes="120px"
              overlay={<ProductBottleLabelOverlay product={p} size="thumb" />}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function BrandPageAside({ variant }: BrandPageAsideProps) {
  if (variant === "routine") {
    return <HeroProductShowcase products={PRODUCTS} compact />;
  }

  if (variant === "offers") {
    return (
      <div className="flex flex-col gap-4">
        <ProductStrip products={PRODUCTS} />
        <div className="rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-4 text-center">
          <p className="font-arabic font-bold text-brand-primary text-lg">3 قطع — 349 درهم</p>
          <p className="text-xs text-brand-espresso/60 mt-1">وفر/ي 248 درهم · الأكثر طلباً</p>
        </div>
      </div>
    );
  }

  if (variant === "delivery") {
    return (
      <div className="flex flex-col gap-4">
        <BrandedImageSlot
          src={PRODUCTS[0].imagePlaceholder}
          alt={PRODUCTS[0].arabicName}
          accent={PRODUCTS[0].imageColor}
        />
        <InfoPanel
          icon={Truck}
          title="توصيل رياض"
          lines={[
            "توصيل مجاني لجميع المغرب",
            "2–5 أيام عمل حسب المنطقة",
            "تأكيد بالهاتف قبل الإرسال",
            "الدفع عند الاستلام فقط",
          ]}
        />
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-brand-border bg-brand-ivory p-5 shadow-md flex flex-col items-center gap-3">
          <RiadsLogoLockup />
          <p className="text-sm text-brand-espresso/70 text-center font-arabic">
            فريق رياض — تأكيد سريع · دعم واتساب
          </p>
        </div>
        <ProductStrip products={PRODUCTS} />
        <InfoPanel
          icon={MessageCircle}
          title="فريق رياض"
          lines={[
            "نجاوب على استفسارات الطلبات",
            "تأكيد سريع عبر الهاتف",
            "دعم واتساب متاح",
          ]}
        />
      </div>
    );
  }

  /* trust — سياسات وثقة */
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-brand-border bg-brand-ivory p-5 shadow-md">
        <div className="flex justify-center mb-4">
          <RiadsLogoLockup />
        </div>
        <InfoPanel
          icon={ShieldCheck}
          title="ثقة وشفافية"
          lines={[
            "معلوماتك للطلب والتوصيل فقط",
            "لا دفع مسبق — COD فقط",
            "إرشادات واضحة لكل منتج",
          ]}
        />
      </div>
      <ProductStrip products={PRODUCTS} />
      <div className="flex items-center gap-2 justify-center text-xs text-brand-espresso/50">
        <Package size={14} />
        <span className="font-arabic">صُنع في المغرب · رياض</span>
      </div>
    </div>
  );
}
