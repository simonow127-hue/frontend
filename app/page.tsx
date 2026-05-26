import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import TrustBadges from "@/components/ui/TrustBadges";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import BrandingSlider from "@/components/home/BrandingSlider";
import { ChevronDown, ShieldCheck, Sparkles, Droplets, Wind, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "رياض | riads — عناية موثوقة للجميع",
  description:
    "رياض — منتجات عناية مختارة للرجل والمرأة. شعر، بشرة، وانتعاش يومي. الدفع عند الاستلام داخل المغرب.",
};


export default function HomePage() {
  return (
    <div>
      <BrandingSlider />

      {/* Hero */}
      <section className="bg-brand-cream min-h-[85vh] flex items-center py-16 md:py-20">
        <div className="max-w-content mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6 text-right">
            <div className="inline-flex items-center gap-2 self-end md:self-start">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-xs text-brand-primary font-bold">عناية مغربية موثوقة</span>
            </div>
            <h1 className="font-arabic font-bold text-brand-espresso text-4xl md:text-5xl leading-tight">
              روتين عناية
              <br />
              <span className="text-brand-primary">مختار بعناية</span>
              <br />
              للجميع
            </h1>
            <p className="text-brand-espresso/70 text-lg leading-relaxed">
              رياض كيجمع عناية مركزة، اختيار موثوق، وتجربة طلب سهلة حتى لباب الدار. شعر، بشرة، وانتعاش يومي — للرجل والمرأة، من المغرب.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/collections">
                <Button size="lg">اكتشف/ي الروتين ديالك</Button>
              </Link>
              <Link href="/collections">
                <Button variant="secondary" size="lg">شاهد/ي المنتجات</Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-status-success shrink-0" />
              <span className="text-sm text-brand-espresso/70">الدفع عند الاستلام — تدفع فقط عند الاستلام</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative flex flex-col gap-3">
            <ImagePlaceholder
              label="صورة رئيسية — روتين رياض"
              hint="لقطة فاخرة للمنتجات الثلاثة معاً"
              aspect="wide"
              className="shadow-xl"
            />
            <div className="grid grid-cols-3 gap-3">
              {PRODUCTS.map((p) => (
                <ImagePlaceholder
                  key={p.id}
                  label={p.shortHeading.split(":")[0]}
                  hint="صورة المنتج"
                  aspect="square"
                  className="!rounded-xl"
                />
              ))}
            </div>
            <div className="absolute -bottom-4 right-4 bg-brand-ivory rounded-xl border border-brand-border shadow-lg p-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-status-success shrink-0" />
              <span className="text-xs font-bold text-brand-espresso">دفع عند الاستلام — بلا مخاطرة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-brand-border py-8 bg-brand-ivory">
        <div className="max-w-content mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Problem/solution */}
      <section className="max-w-content mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-4">
            روتين العناية مش كلها متساوية
          </h2>
          <p className="text-brand-espresso/70 text-base leading-loose">
            كثير من المنتجات متواجدة بالسوق — لكن رياض كيختار بعناية ما يناسب الروتين المغربي والمناخ المحلي. مش منتج عشوائي، راهو روتين متكامل.
          </p>
        </div>
      </section>

      {/* Three-product system */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-arabic font-bold text-3xl text-brand-espresso text-center mb-3">
            ثلاثة منتجات، روتين واحد متكامل
          </h2>
          <p className="text-center text-brand-espresso/60 mb-10">
            شعر · بشرة · انتعاش يومي — كمل/ي الروتين ديالك
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle education */}
      <section className="max-w-content mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-right">
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-4">
              ليش الباقة 3 عبوات أفضل اختيار؟
            </h2>
            <p className="text-brand-espresso/70 leading-loose mb-6">
              الاستمرارية هي اللي كتفرق. الباك 3 قطع كيضمن ليك روتين بلا انقطاع، وكيوفر عليك 248 درهم مقارنة بشراء منفصل.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "روتين مستمر بلا انقطاع",
                "توفير حقيقي: 248 درهم على 3 قطع",
                "أكثر اختياراً هاد الأسبوع",
                "الدفع عند الاستلام — بلا مخاطرة",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs shrink-0">✓</span>
                  <span className="text-sm text-brand-espresso/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-brand-cream rounded-2xl p-6 text-right border border-brand-border">
            <div className="text-center mb-4">
              <span className="inline-block bg-brand-primary text-brand-ivory text-xs font-bold px-3 py-1 rounded-full">
                الأكثر طلباً
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "قطعة واحدة", price: "199 درهم", note: "للتجربة" },
                { label: "قطعتان", price: "279 درهم", note: "وفر/ي 119 درهم" },
                { label: "3 قطع", price: "349 درهم", note: "وفر/ي 248 درهم", featured: true },
              ].map((o) => (
                <div
                  key={o.label}
                  className={`flex justify-between items-center p-3 rounded-xl border ${
                    o.featured
                      ? "border-brand-primary bg-brand-primary/5 font-bold"
                      : "border-brand-border bg-brand-ivory"
                  }`}
                >
                  <div className="text-right">
                    <span className={`font-bold ${o.featured ? "text-brand-primary text-lg" : "text-brand-espresso"}`}>
                      {o.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-brand-espresso text-sm">{o.label}</span>
                    <span className="text-xs text-brand-espresso/50 block">{o.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof — honest, no fake reviews */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-arabic font-bold text-3xl text-brand-espresso text-center mb-4">
            آراء الزبائن
          </h2>
          <p className="text-center text-brand-espresso/50 text-sm mb-10">
            لا نعرض تقييمات مختلقة — كل رأي حقيقي من زبون حقيقي
          </p>
          <div className="max-w-xl mx-auto bg-brand-ivory rounded-2xl border border-brand-border p-10 text-center flex flex-col items-center gap-4">
            <MessageSquare size={40} className="text-brand-primary/30" />
            <h3 className="font-arabic font-bold text-xl text-brand-espresso">
              شارك معنا تجربتك
            </h3>
            <p className="text-brand-espresso/60 text-sm leading-relaxed max-w-sm">
              اطلب المنتج، جربه بصدق، وشارك رأيك. تقييماتك الحقيقية هي أهم شيء لنا وللزبائن القادمين.
            </p>
            <a
              href={`https://wa.me/212600000000?text=${encodeURIComponent("السلام عليكم، بغيت نشارك رأيي في منتجات رياض 🌿")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#1ebe5d] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.126a.75.75 0 0 0 .921.916l5.355-1.453A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.722-.5-5.285-1.376l-.378-.214-3.927 1.066 1.088-3.824-.234-.393A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              شارك رأيك عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* How COD works */}
      <section className="max-w-content mx-auto px-4 py-16">
        <h2 className="font-arabic font-bold text-3xl text-brand-espresso text-center mb-10">
          كيف تطلب وتدفع عند الاستلام؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", icon: Sparkles, text: "اختر/ي العرض اللي يناسبك" },
            { step: "2", icon: ShieldCheck, text: "أدخل/ي اسمك ورقم هاتفك فقط" },
            { step: "3", icon: Wind, text: "نتصل بك لتأكيد الطلب" },
            { step: "4", icon: Droplets, text: "تدفع فقط عند استلام الطلب" },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-brand-primary text-brand-ivory flex items-center justify-center font-bold text-xl">
                {s.step}
              </div>
              <s.icon size={24} className="text-brand-primary/60" />
              <p className="text-sm text-brand-espresso/80">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-arabic font-bold text-3xl text-brand-espresso text-center mb-10">
            الأسئلة الشائعة
          </h2>
          <div className="max-w-2xl mx-auto bg-brand-ivory rounded-2xl border border-brand-border divide-y divide-brand-border">
            {[
              { q: "واش بصح كتوصلو؟", a: "نعم، كنوصلو لجميع مدن المغرب. الطلب كيتتبع ويتأكد بالهاتف قبل الإرسال." },
              { q: "واش نقدر نخلص حتى توصلني؟", a: "بالطبع! الدفع عند الاستلام — خلص/ي فقط ملي توصلك الطلبية بابك." },
              { q: "كم من الوقت للتوصيل؟", a: "عادة 2-5 أيام عمل حسب المنطقة." },
              { q: "واش عندكم رقم/واتساب؟", a: "نعم، فريق رياض متاح لتأكيد الطلبات. غادي يتاصلو بك بعد الطلب." },
              { q: "واش مناسب لكل أنواع البشرة والشعر؟", a: "منتجاتنا مصممة للاستعمال اليومي. ننصح بقراءة إرشادات الاستعمال لكل منتج." },
            ].map((faq) => (
              <div key={faq.q} className="px-6 py-4">
                <details>
                  <summary className="font-bold text-brand-espresso cursor-pointer flex justify-between items-center list-none">
                    <ChevronDown size={18} className="text-brand-primary" />
                    <span>{faq.q}</span>
                  </summary>
                  <p className="text-sm text-brand-espresso/70 mt-3 leading-relaxed text-right">{faq.a}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-primary py-16">
        <div className="max-w-content mx-auto px-4 text-center">
          <h2 className="font-arabic font-bold text-3xl text-brand-ivory mb-4">
            اختر/ي الروتين اللي مناسبك اليوم
          </h2>
          <p className="text-brand-ivory/80 mb-8">
            شعر، بشرة، وانتعاش يومي — للرجل والمرأة. الدفع عند الاستلام، بلا مخاطرة.
          </p>
          <Link href="/collections">
            <Button variant="secondary" size="lg" className="border-brand-ivory text-brand-primary hover:bg-brand-ivory">
              اكتشف/ي المنتجات
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
