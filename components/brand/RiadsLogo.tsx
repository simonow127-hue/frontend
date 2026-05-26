import Link from "next/link";
import { clsx } from "clsx";

type RiadsLogoProps = {
  variant?: "header" | "footer" | "mark";
  className?: string;
  href?: string;
};

export default function RiadsLogo({
  variant = "header",
  className = "",
  href = "/",
}: RiadsLogoProps) {
  const isFooter = variant === "footer";
  const isMark = variant === "mark";

  const markSize = isMark ? "h-12 w-12" : isFooter ? "h-9 w-9" : "h-10 w-10";
  const letterSize = isMark ? "text-xl" : isFooter ? "text-base" : "text-lg";

  const content = (
    <div
      className={clsx(
        "flex items-center gap-2.5 shrink-0",
        isMark && "flex-col gap-1.5",
        className
      )}
    >
      <div className={clsx("relative flex items-center justify-center", markSize)}>
        <span
          className="absolute inset-0 rounded-full bg-brand-gold/30 logo-ring-pulse"
          aria-hidden
        />
        <span
          className="absolute inset-[2px] rounded-full border-2 border-brand-gold logo-ring-shimmer"
          aria-hidden
        />
        <div
          className={clsx(
            "relative z-10 flex items-center justify-center rounded-full bg-brand-ivory shadow-sm",
            isMark ? "h-11 w-11" : isFooter ? "h-8 w-8" : "h-9 w-9"
          )}
        >
          <span
            className={clsx(
              "font-latin font-bold text-brand-primary ltr-text logo-letter-float",
              letterSize
            )}
          >
            R
          </span>
        </div>
      </div>

      {!isMark && (
        <div className="flex flex-col items-end leading-none">
          <span
            className={clsx(
              "font-arabic font-bold",
              isFooter ? "text-brand-cream text-sm" : "text-brand-espresso text-sm"
            )}
          >
            رياض
          </span>
          <span
            className={clsx(
              "font-latin ltr-text tracking-wide",
              isFooter ? "text-brand-gold text-xs" : "text-brand-primary text-xs"
            )}
          >
            riads.shop
          </span>
        </div>
      )}
    </div>
  );

  if (isMark) return content;

  return (
    <Link href={href} className="group transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}
