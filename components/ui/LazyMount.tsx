"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mount children only when near the viewport (keeps above-the-fold light). */
export default function LazyMount({
  children,
  rootMargin = "200px",
  className,
  fallbackHeight,
}: {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  fallbackHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;

    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, show]);

  return (
    <div
      ref={ref}
      className={className}
      style={!show && fallbackHeight ? { minHeight: fallbackHeight } : undefined}
    >
      {show ? children : null}
    </div>
  );
}
