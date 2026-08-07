"use client";

import { useEffect } from "react";

const PIXEL_ID = "1449870366149258";

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const existingScript = document.querySelector(
      'script[src="https://connect.facebook.net/en_US/fbevents.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }

    const fbq = (...args: any[]) => {
      const w = window as any;
      w.fbq =
        w.fbq ||
        function () {
          w.fbq.callMethod
            ? w.fbq.callMethod.apply(w.fbq, arguments)
            : w.fbq.queue.push(arguments);
        };

      w.fbq(...args);
    };

    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }, []);

  return null;
}
