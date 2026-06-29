import Link from "next/link";
import { ShieldCheck, Truck, HeadphonesIcon, Package, RefreshCw, Zap } from "lucide-react";

const promises = [
  {
    icon: ShieldCheck,
    title: "ما نبيع إلا ما نرضاه لأنفسنا",
    desc: "كل منتج في رياض اختارناه بعد تجربة شخصية — ما عندنا منتجات عشوائية.",
  },
  {
    icon: Truck,
    title: "توصيل سريع لكل المملكة",
    desc: "الرياض، جدة، الدمام، والمناطق الأخرى — نوصل لك في أسرع وقت ممكن.",
  },
  {
    icon: Package,
    title: "الدفع عند الاستلام",
    desc: "ما تدفع قرش قبل ما يوصلك طلبك — هذا هو الضمان الحقيقي.",
  },
  {
    icon: RefreshCw,
    title: "استرجاع بدون تعقيد",
    desc: "لو ما عجبك المنتج لأي سبب — تواصل معنا وما نتركك.",
  },
  {
    icon: HeadphonesIcon,
    title: "خدمة عملاء على واتساب",
    desc: "ترسل لنا على واتساب وترد عليك بشكل شخصي — مو ردود آلية.",
  },
  {
    icon: Zap,
    title: "منتجات تحل مشاكل حقيقية",
    desc: "ما نبيع زينة فارغة — كل منتج عندنا يحل مشكلة تحسها في يومك.",
  },
];

export default function AboutPage() {
  return (
    <div className="text-right" dir="rtl">
      {/* Hero */}
      <section className="bg-brand-espresso text-brand-ivory py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-arabic font-bold text-4xl md:text-5xl leading-tight mb-5">
            رياض — متجر سعودي
            <br />
            <span className="text-brand-gold">يهتم بك فعلاً</span>
          </h1>
          <p className="text-brand-ivory/70 text-lg leading-loose">
            مو مجرد متجر إلكتروني — رياض وعد بأن كل منتج تطلبه يستحق وقتك وفلوسك.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-bold px-4 py-1.5 rounded-full mb-5">
          من نحن
        </span>
        <h2 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">
          قصة رياض
        </h2>
        <div className="flex flex-col gap-5 text-brand-espresso/80 text-lg leading-loose">
          <p>
            بدأت رياض من فكرة بسيطة: السوق السعودي يستحق منتجات ذكية تحل مشاكل يومية حقيقية — بجودة تثق فيها وخدمة تحس فيها.
          </p>
          <p>
            اخترنا كل منتج بعناية، جربناه بأنفسنا، وقررنا ما نبيع شيء ما رضيناه. من مروحة الرقبة للسيارة للعطور — كل شيء في رياض مدروس.
          </p>
          <p>
            هدفنا مو بس تكمل طلبك — هدفنا ترجع مرة ثانية لأنك وثقت فينا.
          </p>
        </div>
      </section>

      {/* Promises */}
      <section className="bg-brand-cream py-16 px-4">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              وعودنا لك
            </span>
            <h2 className="font-arabic font-bold text-3xl text-brand-espresso">
              ليش تختار رياض؟
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {promises.map((p) => (
              <div
                key={p.title}
                className="bg-brand-ivory rounded-2xl p-6 flex gap-4 items-start border border-brand-border shadow-sm"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <p.icon size={20} className="text-brand-primary" />
                </div>
                <div>
                  <p className="font-bold text-brand-espresso mb-1 text-sm">{p.title}</p>
                  <p className="text-brand-espresso/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our commitment */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-brand-espresso rounded-3xl p-10 text-brand-ivory">
          <h2 className="font-arabic font-bold text-2xl mb-4 text-brand-gold">
            لو ما عجبك — كلمنا
          </h2>
          <p className="text-brand-ivory/70 leading-loose mb-8">
            أي مشكلة، أي سؤال، أي استفسار — فريقنا على واتساب يرد عليك بشكل شخصي. ما عندنا ردود آلية ولا نتركك تدور.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-espresso font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all shadow-md"
            >
              تصفح المنتجات
            </Link>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.126a.75.75 0 0 0 .921.916l5.355-1.453A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.722-.5-5.285-1.376l-.378-.214-3.927 1.066 1.088-3.824-.234-.393A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              واتساب
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
