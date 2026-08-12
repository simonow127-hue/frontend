"use client";

import { useEffect, useRef } from "react";

interface ProductVideoProps {
  src: string;
  poster?: string;
  title: string;
}

export default function ProductVideo({ src, poster, title }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => {
        // Browser may block autoplay until interaction — controls stay available
      });
    };

    if (video.readyState >= 2) {
      tryPlay();
      return;
    }

    video.addEventListener("loadeddata", tryPlay, { once: true });
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, [src]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold text-brand-gold tracking-wide text-right">فيديو المنتج</span>
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-brand-border bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          controls
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
