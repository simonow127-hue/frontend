import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import ThankYouPurchase from "@/components/tracking/ThankYouPurchase";

export const metadata: Metadata = {
  title: "شكراً — تم تسجيل طلبك",
  description: "شكراً على طلبك. فريق رياض بيتواصل معك لتأكيد الطلب.",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }> | { order?: string };
}) {
  const params = await Promise.resolve(searchParams);
  const orderCode = params?.order;

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 py-16">
      <ThankYouPurchase orderCode={orderCode} />
      <div className="max-w-md w-full bg-brand-ivory rounded-2xl border border-brand-border shadow-lg p-8 text-right">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-status-success/10 border-2 border-status-success/30 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-status-success" />
          </div>
        </div>

        <h1 className="font-arabic font-bold text-2xl text-brand-espresso text-center mb-2">
          شكراً! طلبك انسجل بنجاح
        </h1>
        <p className="text-brand-espresso/70 text-center mb-8">
          فريق رياض بيتواصل معك قريب عشان يأكد التفاصيل.
        </p>

        {orderCode && (
          <p className="text-center text-sm text-brand-espresso/50 mb-6">
            رقم الطلب: <span className="font-bold text-brand-espresso ltr-text">{orderCode}</span>
          </p>
        )}

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-start gap-3 bg-brand-cream rounded-xl p-4">
            <Phone size={20} className="text-brand-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-brand-espresso text-sm">انتظر المكالمة</p>
              <p className="text-xs text-brand-espresso/60 mt-1">
                فريقنا بيتصل فيك خلال أقل من 24 ساعة لتأكيد الطلب.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-brand-cream rounded-xl p-4">
            <Clock size={20} className="text-status-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-brand-espresso text-sm">خلّ جوالك قريب منك</p>
              <p className="text-xs text-brand-espresso/60 mt-1">
                خلّ جوالك قريب عشان نأكد طلبك بسرعة. الطلبات المؤكدة لها أولوية في الشحن.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-status-success/10 border border-status-success/20 rounded-xl p-4 text-center mb-6">
          <p className="text-status-success font-bold text-sm">الدفع عند الاستلام</p>
          <p className="text-brand-espresso/70 text-xs mt-1">
            ادفع بس لما توصلك الطلبية — بدون أي قلق
          </p>
        </div>

        <Link href="/">
          <Button variant="secondary" fullWidth>
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
