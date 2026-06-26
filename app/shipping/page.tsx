export default function ShippingPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-right">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">سياسة التوصيل</h1>
        <div className="flex flex-col gap-6 text-brand-espresso/80 leading-loose text-sm">
          <section>
            <h2 className="font-bold text-brand-espresso text-lg mb-2">مناطق التوصيل</h2>
            <p>نوصل لجميع مناطق المملكة العربية السعودية — المدن الرئيسية والمناطق البعيدة.</p>
          </section>
          <section>
            <h2 className="font-bold text-brand-espresso text-lg mb-2">مدة التوصيل</h2>
            <p>من ٢ إلى ٥ أيام عمل حسب مدينتك. الرياض وجدة والدمام والخبر عادةً أسرع.</p>
          </section>
          <section>
            <h2 className="font-bold text-brand-espresso text-lg mb-2">تكلفة الشحن</h2>
            <p>شحن مجاني على الطلبات — بدون رسوم إضافية مخفية.</p>
          </section>
          <section>
            <h2 className="font-bold text-brand-espresso text-lg mb-2">تأكيد الطلب</h2>
            <p>نتواصل معك بالجوال لتأكيد الطلب قبل الإرسال — تأكد رقمك صحيح.</p>
          </section>
          <section>
            <h2 className="font-bold text-brand-espresso text-lg mb-2">الدفع عند الاستلام</h2>
            <p>تدفع للمندوب لما يوصلك الطلب — نقداً أو شبكة حسب توفر المندوب.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
