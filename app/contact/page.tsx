import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-12 md:py-16">
      <div className="max-w-lg mx-auto text-right">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">تواصل معنا</h1>
        <p className="text-brand-espresso/70 mb-8 leading-relaxed">
          فريقنا جاهز يساعدك — استفسارات، تتبع طلب، أو استرجاع. رد سريع على الواتساب.
        </p>
        <div className="bg-brand-cream rounded-2xl border border-brand-border p-6 flex flex-col gap-4">
          <div>
            <p className="text-xs text-brand-espresso/50 mb-1">واتساب</p>
            <a
              href={whatsappUrl()}
              className="font-bold text-brand-primary text-lg hover:text-brand-gold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </div>
          <div>
            <p className="text-xs text-brand-espresso/50 mb-1">التوصيل</p>
            <p className="font-bold text-brand-espresso">المملكة العربية السعودية</p>
            <p className="text-brand-espresso/60 text-sm">نوصل لكل المناطق — الرياض، جدة، الدمام، وغيرها</p>
          </div>
          <div>
            <p className="text-xs text-brand-espresso/50 mb-1">أوقات الرد</p>
            <p className="text-brand-espresso/80 text-sm">يومياً من ٩ صباحاً إلى ١١ مساءً</p>
          </div>
        </div>
      </div>
    </div>
  );
}
