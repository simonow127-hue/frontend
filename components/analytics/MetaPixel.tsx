"use client";

import { useEffect } from "react";

const PIXEL_ID = "1449870366149258";

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as any;

    // Don't initialize twice
    if (w.fbq && w.fbq.loaded) return;

    const fbq: any = function (...args: any[]) {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, args);
      } else {
        fbq.queue.push(args);
      }
    };

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    w.fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    document.head.appendChild(script);

    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }, []);

  return null;
}
