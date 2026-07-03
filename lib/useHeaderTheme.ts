"use client";
import { useEffect, useState } from "react";

const HEADER_HEIGHT = 96;

function detectHeaderTheme(): boolean {
  const themed = document.querySelectorAll<HTMLElement>("[data-header-theme]");
  if (!themed.length) return false;

  let overDark = false;
  let maxOverlap = 0;

  themed.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const overlap = Math.min(rect.bottom, HEADER_HEIGHT) - Math.max(rect.top, 0);
    if (overlap > maxOverlap) {
      maxOverlap = overlap;
      overDark = el.dataset.headerTheme === "dark";
    }
  });

  return overDark;
}

export function useHeaderTheme(pathname: string) {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const sync = () => setOverDark(detectHeaderTheme());
    sync();

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  return overDark;
}
