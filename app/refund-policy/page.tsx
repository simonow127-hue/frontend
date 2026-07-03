import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "سياسة الشكاوى — رياض" };

export default function RefundPage() {
  return (
    <div className="text-right" dir="rtl">
      <section className="bg-brand-espresso text-brand-ivory py-14 px-4 text-center">
        <h1 className="font-arabic font-bold text-3xl md:text-4xl text-brand-gold mb-3">الشكاوى والمشاكل</h1>
        <p className="text-brand-ivory/60 text-base">وصلك شيء غلط؟ نحل معك</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-14">
        <div className="flex flex-col gap-6 text-brand-espresso/80 text-sm leading-loose">
          {[
            { title: "منتج تالف أو مختلف عن الطلب", text: "إذا وصلك منتج تالف أو مختلف عن طلبك، تواصل معنا خلال 48 ساعة من الاستلام مع صور واضحة للمنتج." },
            { title: "شروط القبول", text: "المنتج ما انستخدم ولسه بتغليفه الأصلي، والتواصل خلال 48 ساعة من استلامك للطلب مع صور توضيحية." },
            { title: "الحالات غير المقبولة", text: "ما نقبل الشكوى إذا تغير رأيك بعد استلام المنتج وفتحه، أو رفضت الاستلام بدون سبب واضح." },
          ].map((s) => (
            <div key={s.title} className="border-b border-brand-border pb-5 last:border-0">
              <h2 className="font-bold text-base text-brand-espresso mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                {s.title}
              </h2>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-brand-espresso rounded-2xl p-6 text-center">
          <p className="text-brand-ivory/80 text-sm mb-4">لأي مشكلة تواصل معنا مباشرة</p>
          <Link
            href="mailto:riads.shop@gmail.com"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-espresso font-bold px-6 py-3 rounded-full hover:brightness-110 transition-all text-sm"
          >
            راسلنا على الإيميل
          </Link>
        </div>
      </section>
    </div>
  );
}
