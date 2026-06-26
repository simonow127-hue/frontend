import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الخصوصية — رياض ستور" };

export default function PrivacyPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-right">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">سياسة الخصوصية</h1>
        <div className="flex flex-col gap-6 text-brand-espresso/80 text-sm leading-loose">
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">المعلومات اللي نجمعها</h2>
            <p>
              نجمع بس اسمك الكامل ورقم جوالك عشان نأكد الطلب ونوصله لك. ما نجمع أي بيانات دفع.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">استخدام المعلومات</h2>
            <p>
              معلوماتك تُستخدم بس عشان: تأكيد الطلب بالجوال، التوصيل، وتحسين تجربتك مع رياض ستور.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
