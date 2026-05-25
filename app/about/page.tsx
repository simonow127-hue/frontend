import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "من نحن — رياض",
  description: "رياض — قصتنا ورسالتنا في تقديم عناية مغربية موثوقة للجميع.",
};

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-right">
        <h1 className="font-arabic font-bold text-4xl text-brand-espresso mb-6">من نحن</h1>

        <p className="text-brand-espresso/80 text-lg leading-loose mb-8">
          رياض هو اختيار موثوق للعناية بالشعر، البشرة، والانتعاش اليومي — للرجل والمرأة. كنجمعو منتجات مركزة ومختارة بعناية تناسب مناخنا وأجواءنا الحارة.
        </p>

        <p className="text-brand-espresso/70 leading-loose mb-8">
          رسالتنا بسيطة: نعطيك عناية حقيقية بلا ادعاءات مبالغ فيها. كل منتج من رياض معمول باش يدخل بسهولة لروتينك اليومي ويعطيك إحساس الاهتمام والثقة.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { num: "3", label: "منتجات مختارة" },
            { num: "100%", label: "دفع عند الاستلام" },
            { num: "2-5", label: "أيام توصيل" },
          ].map((s) => (
            <div key={s.label} className="bg-brand-cream rounded-2xl p-4 text-center">
              <p className="font-arabic font-bold text-brand-primary text-2xl">{s.num}</p>
              <p className="text-xs text-brand-espresso/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-cream rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-brand-espresso text-xl mb-4">وعدنا ليك</h2>
          <ul className="flex flex-col gap-3">
            {[
              "الدفع عند الاستلام — تدفع فقط عند استلام الطلب",
              "تأكيد الطلب بالهاتف قبل الإرسال",
              "إرشادات استعمال واضحة لكل منتج",
              "لا ادعاءات طبية مبالغ فيها",
              "توصيل موثوق لجميع مناطق المغرب",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs shrink-0">✓</span>
                <span className="text-sm text-brand-espresso/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <Link href="/collections"><Button size="md">اكتشف/ي المنتجات</Button></Link>
          <Link href="/contact"><Button variant="secondary" size="md">تواصل/ي معنا</Button></Link>
        </div>
      </div>
    </div>
  );
}
