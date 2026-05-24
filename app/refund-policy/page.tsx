import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الاسترجاع — رياض" };

export default function RefundPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-right">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">سياسة الاسترجاع</h1>
        <div className="flex flex-col gap-6 text-brand-espresso/80">
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">الاسترجاع والاستبدال</h2>
            <p>في حالة وصول منتج تالف أو مختلف عن الطلب، يرجى التواصل معنا خلال 48 ساعة من الاستلام مع صور للمنتج.</p>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">شروط الاسترجاع</h2>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>المنتج لم يُستخدم ولا يزال في تغليفه الأصلي</li>
              <li>التواصل خلال 48 ساعة من الاستلام</li>
              <li>تقديم صور للمنتج</li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">الحالات المستثناة</h2>
            <p>لا يُقبل الاسترجاع في حالة تغيير الرأي بعد فتح المنتج واستخدامه، أو رفض الاستلام بدون سبب مقبول.</p>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">للتواصل</h2>
            <p>تواصل/ي معنا عبر الهاتف أو الواتساب مع ذكر رقم طلبك.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
