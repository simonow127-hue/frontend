import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الخصوصية — رياض" };

export default function PrivacyPage() {
  return (
    <div className="max-w-content mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-right">
        <h1 className="font-arabic font-bold text-3xl text-brand-espresso mb-6">سياسة الخصوصية</h1>
        <div className="flex flex-col gap-6 text-brand-espresso/80 text-sm leading-loose">
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">المعلومات التي نجمعها</h2>
            <p>نجمع فقط الاسم الكامل ورقم الهاتف اللازمين لتأكيد الطلب والتوصيل. لا نجمع أي بيانات دفع.</p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">استخدام المعلومات</h2>
            <p>معلوماتك تُستخدم حصراً لـ: تأكيد الطلب بالهاتف، التوصيل، وتحسين تجربتك معنا.</p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">التتبع الإعلاني</h2>
            <p>نستخدم بكسلات إعلانية (Meta، TikTok، Snapchat) لقياس أداء الإعلانات وتحسينها. البيانات المرسلة لهذه المنصات مُشفرة. يمكنك إلغاء تتبع الإعلانات من إعدادات متصفحك.</p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">الأمان</h2>
            <p>نلتزم بحماية بياناتك وعدم مشاركتها مع أطراف ثالثة خارج نطاق التوصيل والإعلانات المشروحة أعلاه.</p>
          </section>
          <section>
            <h2 className="font-bold text-base text-brand-espresso mb-2">التواصل</h2>
            <p>للاستفسار عن بياناتك أو طلب حذفها، تواصل/ي معنا عبر hello@riads.shop</p>
          </section>
        </div>
      </div>
    </div>
  );
}
