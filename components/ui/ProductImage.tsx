import Image from "next/image";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type AspectRatio = "square" | "wide" | "portrait";

interface ProductImageProps {
  src: string;
  alt: string;
  aspect?: AspectRatio;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: ReactNode;
}

const aspectClasses: Record<AspectRatio, string> = {
  square: "aspect-square",
  wide: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
};

export default function ProductImage({
  src,
  alt,
  aspect = "square",
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  overlay,
}: ProductImageProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-cream to-brand-ivory",
        aspectClasses[aspect],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={clsx("object-contain object-center p-2 md:p-4", imageClassName)}
      />
      {overlay ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {overlay}
        </div>
      ) : null}
    </div>
  );
}
