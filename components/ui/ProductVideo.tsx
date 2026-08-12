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

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.removeAttribute("controls");

    const tryPlay = () => {
      video.muted = true;
      video.controls = false;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          window.setTimeout(() => {
            video.muted = true;
            void video.play().catch(() => {});
          }, 250);
        });
      }
    };

    const onEnded = () => {
      video.currentTime = 0;
      void video.play().catch(() => {});
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && video.paused) {
        tryPlay();
      }
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibility);

    const t1 = window.setTimeout(tryPlay, 100);
    const t2 = window.setTimeout(tryPlay, 600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src]);

  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-brand-border bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-contain pointer-events-none"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        aria-label={title}
      />
    </div>
  );
}
