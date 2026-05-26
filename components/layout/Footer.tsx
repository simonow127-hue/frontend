import Link from "next/link";
import RiadsLogo from "@/components/brand/RiadsLogo";

export default function Footer() {
  return (
    <footer className="bg-brand-espresso text-brand-cream mt-16">
      <div className="max-w-content mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <RiadsLogo variant="footer" />
            <p className="text-sm text-brand-cream/70 leading-relaxed">
              رياض — عناية مغربية مختارة للرجل والمرأة. منتجات موثوقة، توصيل لباب الدار، دفع عند الاستلام.
            </p>
            <p className="text-xs text-brand-cream/50">الدفع عند الاستلام — بلا مخاطرة</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-brand-cream mb-3">منتجاتنا</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/products/jadr-hair-serum" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  سيروم جدر للشعر
                </Link>
              </li>
              <li>
                <Link href="/products/nour-skin-serum" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  سيروم نور للبشرة
                </Link>
              </li>
              <li>
                <Link href="/products/naqaa-roll-on" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  رول اون نقاء
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  جميع المنتجات
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-brand-cream mb-3">المساعدة والسياسات</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/shipping" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  سياسة التوصيل
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  سياسة الاسترجاع
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-cream/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-cream/40">
            © {new Date().getFullYear()} رياض. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-brand-cream/40">
            معلوماتك تُستخدم فقط لتأكيد الطلب والتوصيل.
          </p>
        </div>
      </div>
    </footer>
  );
}
