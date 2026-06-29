export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-12 md:py-16">
      <div className="max-w-lg mx-auto text-right">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">تواصل معنا</h1>
        <p className="text-brand-espresso/70 mb-8 leading-relaxed">
          فريقنا جاهز يساعدك — استفسارات، تتبع طلب، أو أي سؤال. رد سريع على الإيميل.
        </p>
        <div className="bg-brand-cream rounded-2xl border border-brand-border p-6 flex flex-col gap-5">
          <div>
            <p className="text-xs text-brand-espresso/50 mb-1">البريد الإلكتروني</p>
            <a
              href="mailto:riads.shop@gmail.com"
              className="font-bold text-brand-primary text-lg hover:text-brand-gold transition-colors"
            >
              riads.shop@gmail.com
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

        <div className="mt-6 text-center">
          <a
            href="mailto:riads.shop@gmail.com"
            className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-brand-gold hover:text-brand-espresso transition-all shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            راسلنا الآن
          </a>
        </div>
      </div>
    </div>
  );
}
