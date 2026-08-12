"use client";

import { useEffect, useRef, useState } from "react";

interface ProductVideoProps {
  src: string;
  poster?: string;
  title: string;
}

export default function ProductVideo({ src, poster, title }: ProductVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div className="flex flex-col gap-2" ref={ref}>
      <span className="text-xs font-bold text-brand-gold tracking-wide text-right">فيديو المنتج</span>
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-brand-border bg-black">
        {shouldLoad ? (
          <video
            className="w-full h-full object-contain"
            controls
            playsInline
            preload="none"
            poster={poster}
            aria-label={title}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster || ""}
            alt={title}
            className="w-full h-full object-contain bg-black"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </div>
  );
}
