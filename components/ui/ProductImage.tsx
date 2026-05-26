import Image from "next/image";
import { clsx } from "clsx";

type AspectRatio = "square" | "wide" | "portrait";

interface ProductImageProps {
  src: string;
  alt: string;
  aspect?: AspectRatio;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
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
    </div>
  );
}
