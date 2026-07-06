import type { Metadata } from "next";
import { Truck, MapPin, Clock, CreditCard } from "lucide-react";

export const metadata: Metadata = { title: "سياسة التوصيل — رياض" };

export default function ShippingPage() {
  return (
    <div className="text-right" dir="rtl">
      <section data-header-theme="dark" className="bg-brand-espresso text-brand-ivory py-14 px-4 text-center -mt-24 pt-32">
        <h1 className="font-arabic font-bold text-3xl md:text-4xl text-brand-gold mb-3">سياسة التوصيل</h1>
        <p className="text-brand-ivory/60 text-base">نوصل لكل مناطق المملكة — سريع وآمن</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-14">
        <div className="flex flex-col gap-5">
          {[
            { icon: MapPin, title: "مناطق التوصيل", text: "نوصل لجميع مناطق المملكة العربية السعودية — المدن الرئيسية والمناطق البعيدة." },
            { icon: Clock, title: "مدة التوصيل", text: "٣–٥ أيام توصيل حسب المدينة." },
            { icon: Truck, title: "تكلفة الشحن", text: "شحن مجاني على الطلبات — بدون رسوم إضافية مخفية." },
            { icon: CreditCard, title: "الدفع عند الاستلام", text: "تدفع للمندوب لما يوصلك الطلب — ما تحتاج بطاقة أو تحويل مسبق." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 items-start bg-brand-cream rounded-2xl border border-brand-border p-5">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <item.icon size={18} className="text-brand-primary" />
              </div>
              <div>
                <h2 className="font-bold text-brand-espresso mb-1">{item.title}</h2>
                <p className="text-brand-espresso/70 text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
