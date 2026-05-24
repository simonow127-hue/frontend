import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصل معنا — رياض",
  description: "تواصل/ي مع فريق رياض للاستفسار عن الطلبات والمنتجات.",
};

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto text-right">
        <h1 className="font-arabic font-bold text-4xl text-brand-espresso mb-4">تواصل معنا</h1>
        <p className="text-brand-espresso/70 mb-10">
          فريق رياض كيجاوب على جميع الاستفسارات المتعلقة بالطلبات والمنتجات والتوصيل.
        </p>

        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-4 bg-brand-cream rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
              <Phone size={18} className="text-brand-primary" />
            </div>
            <div>
              <p className="font-bold text-brand-espresso text-sm">الهاتف / واتساب</p>
              <p className="text-brand-espresso/60 text-sm" dir="ltr">+212 6XX XXX XXX</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-brand-cream rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-brand-primary" />
            </div>
            <div>
              <p className="font-bold text-brand-espresso text-sm">البريد الإلكتروني</p>
              <p className="text-brand-espresso/60 text-sm" dir="ltr">hello@riads.shop</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-brand-cream rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-brand-primary" />
            </div>
            <div>
              <p className="font-bold text-brand-espresso text-sm">المملكة</p>
              <p className="text-brand-espresso/60 text-sm">توصيل سريع لجميع مناطق المملكة</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-cream rounded-xl p-5 text-center">
          <p className="text-sm text-brand-espresso/70">
            للأسئلة المتعلقة بطلبك، المرجو ذكر رقم الطلب أو اسمك الكامل حتى نقدر نساعدك بسرعة.
          </p>
        </div>
      </div>
    </div>
  );
}
