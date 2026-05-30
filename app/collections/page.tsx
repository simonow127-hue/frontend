import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import ProductImage from "@/components/ui/ProductImage";
import { STORE_IMAGES } from "@/lib/store-images";

export const metadata: Metadata = {
  title: "جميع منتجات رياض — روتين عناية للجميع",
  description: "اكتشف/ي روتين رياض: سيروم جدر للشعر، سيروم نور للبشرة، ورول اون نقاء للانتعاش اليومي. للرجل والمرأة. الدفع عند الاستلام.",
};

const COMPARISON = [
  {
    need: "شعر خفيف وفروة تحتاج عناية",
    product: "سيروم جدر",
    bestFor: "كل من يبغي روتين شعر مركز",
    recommended: "3 قطع — 399 درهم",
    slug: "jadr-hair-serum",
  },
  {
    need: "بشرة مرهقة وتفتقر الإشراقة",
    product: "سيروم نور",
    bestFor: "كل من يبغي إشراقة يومية خفيفة",
    recommended: "3 قطع — 399 درهم",
    slug: "nour-skin-serum",
  },
  {
    need: "القلق من الرائحة والتعرق",
    product: "رول اون نقاء",
    bestFor: "الاستعمال اليومي في الأيام الطويلة",
    recommended: "3 قطع — 399 درهم",
    slug: "naqaa-roll-on",
  },
];

export default function CollectionsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-content mx-auto px-4 text-center">
          <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            روتين رياض
          </span>
          <h1 className="font-arabic font-bold text-4xl text-brand-espresso mb-4">
            روتين رياض للعناية اليومية
          </h1>
          <p className="text-brand-espresso/70 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            ثلاثة منتجات مختارة بعناية للرجل والمرأة — شعر، بشرة، وانتعاش يومي. كمل/ي الروتين اللي ناقصك.
          </p>
          <div className="max-w-2xl mx-auto">
            <ProductImage
              src={STORE_IMAGES.heroTrio}
              alt="بانر المجموعة — روتين رياض"
              aspect="wide"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-content mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-brand-cream py-12">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-arabic font-bold text-2xl text-brand-espresso text-center mb-8">
            أي منتج يناسبك؟
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-border">
            <table className="w-full text-right bg-brand-ivory">
              <thead className="bg-brand-espresso text-brand-cream">
                <tr>
                  <th className="px-4 py-3 text-sm font-bold">الاحتياج</th>
                  <th className="px-4 py-3 text-sm font-bold">المنتج</th>
                  <th className="px-4 py-3 text-sm font-bold hidden md:table-cell">الأفضل لـ</th>
                  <th className="px-4 py-3 text-sm font-bold">العرض المنصوح</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.product} className={`border-t border-brand-border ${i % 2 === 0 ? "bg-brand-ivory" : "bg-brand-cream"}`}>
                    <td className="px-4 py-3 text-sm text-brand-espresso/80">{row.need}</td>
                    <td className="px-4 py-3">
                      <Link href={`/products/${row.slug}`} className="font-bold text-brand-primary hover:underline text-sm">
                        {row.product}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-brand-espresso/70 hidden md:table-cell">{row.bestFor}</td>
                    <td className="px-4 py-3 text-sm font-bold text-brand-espresso">{row.recommended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cross-routine bundle */}
      <section className="max-w-content mx-auto px-4 py-12 text-center">
        <h2 className="font-arabic font-bold text-2xl text-brand-espresso mb-4">
          كمل/ي الروتين: شعر + بشرة + انتعاش
        </h2>
        <p className="text-brand-espresso/70 mb-8 max-w-xl mx-auto">
          كل منتج من رياض يعمل لحاله — لكن مع بعضياتهم، كيشكلو روتين عناية يومي متكامل لمظهر مرتاح وواثق.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="block hover:opacity-95 transition-opacity hover:shadow-md rounded-2xl"
            >
              <ProductImage
                src={product.imagePlaceholder}
                alt={product.arabicName}
                aspect="square"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
