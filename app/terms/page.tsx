import type { Metadata } from "next";

export const metadata: Metadata = { title: "شروط الاستخدام — رياض ستور" };

export default function TermsPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-right">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">شروط الاستخدام</h1>
        <div className="flex flex-col gap-6 text-brand-espresso/80 text-sm leading-loose">
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">قبول الشروط</h2>
            <p>باستخدامك لموقع riads.shop وتقديم طلب، أنت توافق على هالشروط.</p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">الطلبات</h2>
            <p>كل طلب يحتاج تأكيد بالجوال. رياض ستور يحتفظ بحق رفض أي طلب غير مؤكد أو مكرر.</p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">المنتجات</h2>
            <p>المنتجات موصوفة بدقة ضمن الحدود المسموحة. ما نقدم ادعاءات طبية مضمونة.</p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">الأسعار</h2>
            <p>الأسعار قابلة للتغيير. السعر اللي يظهر وقت الطلب هو السعر المعتمد.</p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">الملكية الفكرية</h2>
            <p>كل محتويات الموقع من نصوص وصور وشعارات هي ملكية حصرية لرياض ستور (riads.shop).</p>
          </section>
        </div>
      </div>
    </div>
  );
}
