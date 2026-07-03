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
            <p>
              إذا وصلك منتج تالف أو مختلف عن طلبك، تواصل معنا خلال 48 ساعة من الاستلام مع صور واضحة للمنتج.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">شروط الاسترجاع</h2>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>المنتج ما انستخدم ولسه بتغليفه الأصلي</li>
              <li>التواصل خلال 48 ساعة من الاستلام</li>
              <li>إرسال صور للمنتج</li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">الحالات المستثناة</h2>
            <p>
              ما نقبل الاسترجاع إذا تغير رأيك بعد فتح المنتج واستخدامه، أو رفضت الاستلام بدون سبب مقنع.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-lg text-brand-espresso mb-2">للتواصل</h2>
            <p>تواصل معنا عبر الجوال أو واتساب مع ذكر رقم طلبك.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
