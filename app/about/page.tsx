import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-right">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">من نحن</h1>
        <p className="text-brand-espresso/80 text-lg leading-loose mb-8">
          رياض ستور متجر سعودي يجمع منتجات مختارة بعناية — من السيارة للبيت للأناقة. نؤمن إن التسوق لازم يكون سهل، آمن، ويعطيك ثقة من أول زيارة.
        </p>
        <ul className="flex flex-col gap-4">
          {[
            "منتجات مختارة بجودة عالية — ما نبيع أي شيء ما نثق فيه",
            "توصيل سريع لكل مناطق المملكة",
            "دفع عند الاستلام — بدون مخاطرة",
            "فريق خدمة عملاء يرد عليك بسرعة",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center text-sm shrink-0">✓</span>
              <span className="text-brand-espresso/80">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link href="/collections" className="text-brand-gold font-bold hover:underline">
            تصفح منتجاتنا ←
          </Link>
        </div>
      </div>
    </div>
  );
}
