"use client";

import { useEffect } from "react";

const PIXEL_ID = "1449870366149258";

export default function MetaPixel() {
  useEffect(() => {
    const w = window as any;

    if (w.fbq) return;

    w.fbq = function (...args: any[]) {
      w.fbq.queue.push(args);
    };

    w.fbq.queue = [];
    w.fbq.loaded = true;
    w.fbq.version = "2.0";

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    document.head.appendChild(script);

    w.fbq("init", PIXEL_ID);
    w.fbq("track", "PageView");
  }, []);

  return null;
}
