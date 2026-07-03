"use client";
import Image from "next/image";
import { clsx } from "clsx";
import { useState } from "react";

type AspectRatio = "square" | "wide" | "portrait";

interface ProductImageProps {
  src: string;
  alt: string;
  aspect?: AspectRatio;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
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
  quality = 75,
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl bg-brand-ivory",
        aspectClasses[aspect],
        className
      )}
    >
      {/* Shimmer skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-ivory to-brand-cream animate-[shimmer_1.5s_infinite]"
          style={{ backgroundSize: "200% 100%" }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        quality={quality}
        onLoad={() => setLoaded(true)}
        className={clsx(
          "object-contain object-center p-3 transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          imageClassName
        )}
      />
    </div>
  );
}
