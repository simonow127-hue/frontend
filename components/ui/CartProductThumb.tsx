import Image from "next/image";
import { Product } from "@/lib/products";

interface CartProductThumbProps {
  product?: Product | null;
  size?: "sm" | "md";
}

const sizes = { sm: "w-12 h-12", md: "w-16 h-16" };

export default function CartProductThumb({ product, size = "md" }: CartProductThumbProps) {
  const box = `${sizes[size]} rounded-xl overflow-hidden shrink-0 border border-brand-border bg-brand-cream relative`;

  if (!product?.imagePlaceholder) {
    return (
      <div className={`${box} bg-gradient-to-br from-brand-cream to-brand-rose flex items-center justify-center`}>
        <span className="text-brand-primary/50 text-lg font-arabic font-bold">ر</span>
      </div>
    );
  }

  return (
    <div className={box}>
      <Image
        src={product.imagePlaceholder}
        alt={product.arabicName}
        fill
        className="object-contain p-0.5"
        sizes="56px"
      />
    </div>
  );
}
