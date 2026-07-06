"use client";

interface ProductVideoProps {
  src: string;
  poster?: string;
  title: string;
}

export default function ProductVideo({ src, poster, title }: ProductVideoProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold text-brand-gold tracking-wide text-right">فيديو المنتج</span>
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-brand-border bg-black">
        <video
          className="w-full h-full object-contain"
          controls
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
