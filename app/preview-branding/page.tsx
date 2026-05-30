import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductImage from "@/components/ui/ProductImage";
import {
  PREVIEW_PRODUCTS,
  PREVIEW_STORE_IMAGES,
  PREVIEW_HERO_IMAGES,
  PREVIEW_PRODUCT_SECTIONS,
  PREVIEW_IMAGE_SIZES,
} from "@/lib/preview-branding";

export const metadata: Metadata = {
  title: "معاينة صور البراندينغ",
  robots: { index: false, follow: false },
};

function PreviewLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-bold text-brand-primary text-center mb-3 tracking-wide">{children}</p>
  );
}

function BrandImage({
  src,
  alt,
  aspect = "square",
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: "square" | "wide" | "banner";
  className?: string;
}) {
  const aspectClass =
    aspect === "wide" ? "aspect-[4/3]" : aspect === "banner" ? "aspect-[21/9]" : "aspect-square";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-cream to-brand-ivory ${aspectClass} ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover object-center" sizes="100vw" />
    </div>
  );
}

export default function PreviewBrandingPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-10 md:py-14">
      <div className="max-w-content mx-auto px-4 flex flex-col gap-14">
        <header className="text-center flex flex-col gap-3">
          <p className="text-xs font-bold text-brand-primary">معاينة Nano Banana — الستور باقي كيف ما هو</p>
          <h1 className="font-arabic font-bold text-3xl md:text-4xl text-brand-espresso">
            صور البراندينغ — نفس التصميم اللي سيفطي
          </h1>
          <p className="text-brand-espresso/70 max-w-2xl mx-auto leading-relaxed">
            هاد الصفحة كتوريك كيفاش غادي يبانُو التصاور فالرئيسية، فالمجموعة، وفصفحات المنتوجات.
            إلا عجبوك، قولّي «حطّهم».
          </p>
          <Link href="/" className="text-sm text-brand-primary underline underline-offset-4 self-center">
            رجوع للمتجر الحالي
          </Link>
        </header>

        {/* Home hero — like app/page.tsx */}
        <section className="bg-brand-ivory rounded-3xl border border-brand-border p-6 md:p-8 shadow-sm">
          <PreviewLabel>الرئيسية — بلايص الصور لي كانت خاوية</PreviewLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-right flex flex-col gap-3">
              <h2 className="font-arabic font-bold text-2xl text-brand-espresso">روتين عناية مختار بعناية</h2>
              <p className="text-brand-espresso/70 text-sm">النصوص والأزرار بقاو كما هما — غير الصور.</p>
            </div>
            <div className="flex flex-col gap-3">
              <BrandImage src={PREVIEW_STORE_IMAGES.heroTrio} alt="روتين رياض — المنتجات الثلاثة" aspect="wide" />
              <p className="text-[11px] text-brand-espresso/60 text-right">
                المقاس المناسب: {PREVIEW_IMAGE_SIZES.homeHeroMain}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {PREVIEW_PRODUCTS.map((p) => (
                  <div key={p.id}>
                    <BrandImage src={p.src} alt={p.name} aspect="square" className="!rounded-xl" />
                    <p className="text-[11px] text-brand-espresso/60 text-right mt-1">
                      {p.name}: {PREVIEW_IMAGE_SIZES.homeHeroCards}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="bg-brand-ivory rounded-3xl border border-brand-border p-6 md:p-8 shadow-sm">
          <PreviewLabel>صفحة المجموعة — بانر + كروت المنتوجات</PreviewLabel>
          <BrandImage
            src={PREVIEW_STORE_IMAGES.heroTrio}
            alt="بانر المجموعة"
            aspect="banner"
            className="mb-6"
          />
          <p className="text-[11px] text-brand-espresso/60 text-right mb-4">
            مقاس بانر المجموعة: {PREVIEW_IMAGE_SIZES.collectionsBanner}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PREVIEW_PRODUCTS.map((p) => (
              <div key={p.id} className="bg-brand-cream rounded-2xl border border-brand-border overflow-hidden">
                <ProductImage src={p.src} alt={p.name} aspect="square" className="!rounded-none border-0" />
                <p className="p-3 text-center text-sm font-bold text-brand-espresso">{p.name}</p>
                <p className="pb-3 text-center text-[11px] text-brand-espresso/60">
                  {PREVIEW_IMAGE_SIZES.productHero}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Product heroes */}
        <section className="bg-brand-ivory rounded-3xl border border-brand-border p-6 md:p-8 shadow-sm">
          <PreviewLabel>صفحة كل منتوج — صورة الهيرو</PreviewLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREVIEW_PRODUCTS.map((p) => (
              <div key={p.id} className="flex flex-col gap-2">
                <ProductImage src={p.src} alt={p.name} aspect="square" className="shadow-md" />
                <p className="text-center font-bold text-brand-espresso">{p.name}</p>
                <p className="text-center text-[11px] text-brand-espresso/60">{PREVIEW_IMAGE_SIZES.productHero}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product page sections */}
        <section className="bg-brand-ivory rounded-3xl border border-brand-border p-6 md:p-8 shadow-sm">
          <PreviewLabel>صفحة المنتوج — أقسام: المشكل، كيف كيخدم، المكونات، الاستعمال</PreviewLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold text-brand-espresso mb-2 text-right">واش هاد الشي مألوف؟</p>
              <BrandImage src={PREVIEW_HERO_IMAGES.nour} alt="صورة المنتج — المشكل" />
              <p className="text-[11px] text-brand-espresso/60 text-right mt-1">
                صورة المنتج (بلا صور فيها نساء)
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-espresso mb-2 text-right">كيف يخدم المنتج؟</p>
              <BrandImage src={PREVIEW_STORE_IMAGES.sectionScience} alt="صورة علمية" />
              <p className="text-[11px] text-brand-espresso/60 text-right mt-1">
                {PREVIEW_IMAGE_SIZES.sectionBlocks}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-espresso mb-2 text-right">المكونات الطبيعية</p>
              <BrandImage src={PREVIEW_STORE_IMAGES.sectionIngredients} alt="صورة المكونات" />
              <p className="text-[11px] text-brand-espresso/60 text-right mt-1">
                {PREVIEW_IMAGE_SIZES.sectionBlocks}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-espresso mb-2 text-right">طريقة الاستعمال</p>
              <BrandImage src={PREVIEW_HERO_IMAGES.nour} alt="صورة المنتج — الاستعمال" />
              <p className="text-[11px] text-brand-espresso/60 text-right mt-1">
                صورة المنتج (بلا صور فيها نساء)
              </p>
            </div>
          </div>
        </section>

        {/* Per-product section mockups */}
        {(
          [
            { id: "jadr" as const, title: "جدر — زيت الشعر" },
            { id: "naqaa" as const, title: "نقاء — مزيل العرق" },
          ] as const
        ).map(({ id, title }) => (
          <section
            key={id}
            className="bg-brand-ivory rounded-3xl border border-brand-border p-6 md:p-8 shadow-sm"
          >
            <PreviewLabel>{`${title} — هيرو + مكونات + استعمال`}</PreviewLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-bold text-brand-espresso mb-2 text-right">هيرو</p>
                <BrandImage src={PREVIEW_HERO_IMAGES[id]} alt={title} />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-espresso mb-2 text-right">المكونات</p>
                <BrandImage
                  src={PREVIEW_PRODUCT_SECTIONS[id].ingredients}
                  alt={`${title} — مكونات`}
                />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-espresso mb-2 text-right">الاستعمال</p>
                <BrandImage src={PREVIEW_PRODUCT_SECTIONS[id].usage} alt={`${title} — استعمال`} />
              </div>
            </div>
          </section>
        ))}

        {/* Full product example — nour */}
        <section className="bg-brand-ivory rounded-3xl border border-brand-border p-6 md:p-8 shadow-sm">
          <PreviewLabel>مثال كامل — صفحة نور (معاينة)</PreviewLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-8">
            <ProductImage
              src={PREVIEW_HERO_IMAGES.nour}
              alt="نور"
              aspect="square"
              className="shadow-lg"
            />
            <div className="text-right text-sm text-brand-espresso/80 leading-relaxed">
              <p className="font-bold text-brand-espresso text-lg mb-2">نور: إشراقة متجددة لوجهك</p>
              <p>كريم رتينول متقدم — نفس النصوص والأسعار فالمتجر.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrandImage src={PREVIEW_HERO_IMAGES.nour} alt="المشكلة — صورة المنتج" />
            <BrandImage src={PREVIEW_STORE_IMAGES.sectionScience} alt="الآلية" />
            <BrandImage src={PREVIEW_STORE_IMAGES.sectionIngredients} alt="المكونات" />
            <BrandImage src={PREVIEW_HERO_IMAGES.nour} alt="الاستعمال — صورة المنتج" />
          </div>
        </section>

        <footer className="text-center text-sm text-brand-espresso/60 pb-6">
          معاينة فقط — الصور فـ{" "}
          <code className="text-brand-primary">public/images/preview-nano-banana/</code>
          <br />
          إلا عجبوك قولّي «حطّهم» باش نبدّلو المتجر الحي.
        </footer>
      </div>
    </div>
  );
}
