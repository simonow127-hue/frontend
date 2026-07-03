"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  priority?: boolean;
}

export default function ProductGallery({ images, alt, priority = false }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
    touchEnd.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-brand-border/50 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
          >
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              priority={priority && i === 0}
              loading={priority && i === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
              className="object-contain object-center p-3"
            />
          </div>
        ))}

        {/* Arrows — desktop only */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border border-brand-border items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="السابق"
            >
              <ChevronRight size={16} className="text-brand-espresso" />
            </button>
            <button
              onClick={next}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border border-brand-border items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="التالي"
            >
              <ChevronLeft size={16} className="text-brand-espresso" />
            </button>
          </>
        )}

        {/* Counter badge */}
        {images.length > 1 && (
          <span className="absolute bottom-2 left-2 bg-black/40 text-white text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide justify-center">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all duration-200 bg-white ${
                i === active
                  ? "border-brand-gold scale-105"
                  : "border-brand-border opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                sizes="56px"
                quality={50}
                className="object-contain object-center p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
