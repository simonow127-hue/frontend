"use client";

import { useEffect } from "react";

const PIXEL_ID = "1449870366149258";

export default function MetaPixel() {
  useEffect(() => {
    const w = window as any;

    if (w.fbq) return;

    const fbq = function (...args: any[]) {
      fbq.callMethod
        ? fbq.callMethod.apply(fbq, args)
        : fbq.queue.push(args);
    };

    w.fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    document.head.appendChild(script);

    w.fbq("init", PIXEL_ID);
    w.fbq("track", "PageView");
  }, []);

  return null;
}
