import Link from "next/link";
import { ShieldCheck, Truck, HeadphonesIcon, Package, RefreshCw, Zap } from "lucide-react";

const promises = [
  {
    icon: ShieldCheck,
    title: "منتجات مختارة بعناية",
    desc: "كل منتج في رياض اخترناه بعد بحث دقيق في المواصفات والتقييمات — ما عندنا منتجات عشوائية.",
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
    title: "دعم شخصي على الإيميل",
    desc: "راسلنا على riads.shop@gmail.com وترد عليك بشكل شخصي — مو ردود آلية.",
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
            اخترنا كل منتج بعناية بناءً على البحث والتقييمات الحقيقية من مستخدمين حول العالم، وقررنا ما نبيع شيء ما نرضاه. من مروحة الرقبة للسيارة للعطور — كل شيء في رياض مدروس.
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
            أي مشكلة، أي سؤال، أي استفسار — راسلنا على الإيميل ونرد عليك بشكل شخصي.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-espresso font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all shadow-md"
            >
              تصفح المنتجات
            </Link>
            <a
              href="mailto:riads.shop@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold px-7 py-3.5 rounded-full hover:bg-brand-gold hover:text-brand-espresso transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              راسلنا
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
