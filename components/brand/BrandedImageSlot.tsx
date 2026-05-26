import ProductImage from "@/components/ui/ProductImage";
import BrandSideRail from "@/components/brand/BrandSideRail";
import { clsx } from "clsx";
import type { ReactNode } from "react";

interface BrandedImageSlotProps {
  src: string;
  alt: string;
  accent?: string;
  showSideRail?: boolean;
  aspect?: "square" | "wide" | "portrait";
  className?: string;
  priority?: boolean;
  overlay?: ReactNode;
}

/** صورة منتج + شريط branding على الجنب */
export default function BrandedImageSlot({
  src,
  alt,
  accent = "#9A4E36",
  showSideRail = true,
  aspect = "square",
  className = "",
  priority = false,
  overlay,
}: BrandedImageSlotProps) {
  return (
    <div
      className={clsx(
        "grid gap-3",
        showSideRail ? "md:grid-cols-[minmax(0,1fr)_4.5rem]" : "grid-cols-1",
        className
      )}
    >
      <ProductImage
        src={src}
        alt={alt}
        aspect={aspect}
        priority={priority}
        className="shadow-md ring-1 ring-brand-border/50"
        sizes="(max-width: 768px) 100vw, 45vw"
        overlay={overlay}
      />
      {showSideRail && <BrandSideRail accent={accent} className="min-h-full" />}
    </div>
  );
}
