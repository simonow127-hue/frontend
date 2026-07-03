import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الخصوصية — رياض" };

export default function PrivacyPage() {
  return (
    <div className="text-right" dir="rtl">
      <section className="bg-brand-espresso text-brand-ivory py-14 px-4 text-center">
        <h1 className="font-arabic font-bold text-3xl md:text-4xl text-brand-gold mb-3">سياسة الخصوصية</h1>
        <p className="text-brand-ivory/60 text-base">خصوصيتك أمانة عندنا</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-14">
        <div className="flex flex-col gap-6 text-brand-espresso/80 text-sm leading-loose">
          {[
            { title: "المعلومات اللي نجمعها", text: "نجمع بس اسمك الكامل ورقم جوالك عشان نأكد الطلب ونوصله لك. ما نجمع أي بيانات دفع." },
            { title: "استخدام المعلومات", text: "معلوماتك تُستخدم بس عشان: تأكيد الطلب بالجوال، التوصيل، وتحسين تجربتك مع رياض." },
            { title: "مشاركة البيانات", text: "ما نشارك بياناتك مع أي طرف ثالث إلا شركة التوصيل لإتمام الطلب." },
            { title: "الأمان", text: "نحافظ على بياناتك ونستخدم أنظمة آمنة لحمايتها." },
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
      </section>
    </div>
  );
}
