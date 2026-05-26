import Image from "next/image";
import { clsx } from "clsx";

type AspectRatio = "square" | "wide" | "portrait" | "banner";

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
  banner: "aspect-[16/9]",
};

const studioBg =
  "bg-gradient-to-br from-[#ECECEF] via-[#F7F7F9] to-[#E4E4E8]";

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
        "relative overflow-hidden rounded-2xl ring-1 ring-brand-border/40",
        studioBg,
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
      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand-ivory/90 p-1.5 ring-1 ring-brand-border/70">
        <Image
          src="/brand/logo-stamp.svg"
          alt="riads"
          width={24}
          height={24}
          className="h-6 w-6 opacity-80"
        />
      </div>
    </div>
  );
}
