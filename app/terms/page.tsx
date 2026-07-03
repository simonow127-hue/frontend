import type { Metadata } from "next";

export const metadata: Metadata = { title: "شروط الاستخدام — رياض" };

export default function TermsPage() {
  return (
    <div className="text-right" dir="rtl">
      <section className="bg-brand-espresso text-brand-ivory py-14 px-4 text-center">
        <h1 className="font-arabic font-bold text-3xl md:text-4xl text-brand-gold mb-3">شروط الاستخدام</h1>
        <p className="text-brand-ivory/60 text-base">آخر تحديث: ٢٠٢٦</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-14">
        <div className="flex flex-col gap-6 text-brand-espresso/80 text-sm leading-loose">
          {[
            { title: "قبول الشروط", text: "باستخدامك لموقع riads.shop وتقديم طلب، أنت توافق على هالشروط." },
            { title: "الطلبات", text: "كل طلب يحتاج تأكيد بالجوال. رياض يحتفظ بحق رفض أي طلب غير مؤكد أو مكرر." },
            { title: "المنتجات", text: "المنتجات موصوفة بدقة ضمن الحدود المسموحة. ما نقدم ادعاءات طبية مضمونة." },
            { title: "الأسعار", text: "الأسعار قابلة للتغيير. السعر اللي يظهر وقت الطلب هو السعر المعتمد." },
            { title: "الملكية الفكرية", text: "كل محتويات الموقع من نصوص وصور وشعارات هي ملكية حصرية لرياض (riads.shop)." },
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
