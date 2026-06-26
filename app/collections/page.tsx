"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS, getProductsByCategory } from "@/lib/products";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import TrustBadges from "@/components/ui/TrustBadges";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const activeCategory = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const products = activeCategory
    ? getProductsByCategory(activeCategory.id)
    : PRODUCTS;

  return (
    <div className="max-w-content mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-10">
        <h1 className="font-arabic font-bold text-3xl md:text-4xl text-brand-espresso mb-3">
          {activeCategory ? activeCategory.name : "كل المنتجات"}
        </h1>
        <p className="text-brand-espresso/70 max-w-xl mx-auto">
          {activeCategory
            ? activeCategory.description
            : "تشكيلة مختارة بجودة عالية — تسوق بثقة من رياض ستور"}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <Link
          href="/collections"
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            !activeCategory
              ? "bg-brand-primary text-brand-ivory border-brand-primary"
              : "bg-brand-ivory text-brand-espresso border-brand-border hover:border-brand-gold"
          }`}
        >
          الكل
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/collections?category=${c.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory?.id === c.id
                ? "bg-brand-primary text-brand-ivory border-brand-primary"
                : "bg-brand-ivory text-brand-espresso border-brand-border hover:border-brand-gold"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <TrustBadges variant="grid" className="mb-10 max-w-lg mx-auto" />

      {products.length === 0 ? (
        <p className="text-center text-brand-espresso/60">ما فيه منتجات بهالتصنيف حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-brand-espresso/60">جاري التحميل...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
