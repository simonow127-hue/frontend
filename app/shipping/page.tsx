import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة التوصيل — رياض" };

export default function ShippingPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-right prose prose-sm">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">سياسة التوصيل</h1>
        <div className="flex flex-col gap-6 text-brand-espresso/80">
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">مناطق التوصيل</h2>
            <p>نوصل لجميع مدن وقرى المغرب.</p>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">مدة التوصيل</h2>
            <p>عادة من 2 إلى 5 أيام عمل حسب المنطقة الجغرافية. قد تتأخر بعض المناطق النائية.</p>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">تكلفة التوصيل</h2>
            <p>التوصيل مجاني على جميع الطلبات.</p>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">تأكيد الطلب</h2>
            <p>كل طلب يتم تأكيده عبر الهاتف قبل الإرسال. المرجو إبقاء هاتفك متاحاً بعد تقديم الطلب.</p>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">الدفع عند الاستلام</h2>
            <p>الدفع يكون حصراً عند استلام الطلب. لا حاجة لأي دفع مسبق.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
