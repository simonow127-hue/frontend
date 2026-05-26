import Image from "next/image";
import { clsx } from "clsx";

export type RiadsLogoVariant = "mark" | "lockup" | "stamp";

interface RiadsLogoProps {
  variant?: RiadsLogoVariant;
  className?: string;
  priority?: boolean;
}

const stampAsset = {
  src: "/brand/logo-stamp.svg",
  width: 80,
  height: 80,
  alt: "ختم رياض",
};

/** Riad arch + serif R — vector mark */
export function RiadsLogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={clsx("shrink-0", className)}
      viewBox="0 0 88 88"
      fill="none"
      role="img"
      aria-label="رياض"
    >
      <defs>
        <linearGradient id="riadsArchFill" x1="44" y1="8" x2="44" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A8583E" />
          <stop offset="1" stopColor="#8A452F" />
        </linearGradient>
      </defs>
      <path
        fill="url(#riadsArchFill)"
        d="M44 7c-20.2 0-36.5 15.2-36.5 34v33.5c0 3.6 2.9 6.5 6.5 6.5h60c3.6 0 6.5-2.9 6.5-6.5V41C80.5 22.2 64.2 7 44 7z"
      />
      <path
        fill="none"
        stroke="#C9A45C"
        strokeWidth="2.25"
        strokeLinecap="round"
        d="M44 16.5c-14.8 0-26.8 10.6-26.8 23.6"
      />
      <path
        fill="#FFF9F2"
        d="M33.5 29.5h15.2c7.4 0 12.3 4.2 12.3 10.6 0 5.2-3 9-7.8 10.2l8.5 15.2h-7.2l-7.8-14h-5.2v14h-7V29.5zm7 6.8v7.8h8c3.8 0 6-2 6-4.8 0-2.6-2.1-3-6-3h-8z"
      />
      <rect x="20" y="72" width="48" height="3.5" rx="1.75" fill="#C9A45C" opacity="0.85" />
    </svg>
  );
}

/** Header / footer lockup */
export function RiadsLogoLockup({
  className = "",
  theme = "light",
  compact = false,
}: {
  className?: string;
  theme?: "light" | "dark";
  compact?: boolean;
}) {
  const isDark = theme === "dark";
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <RiadsLogoMark className={compact ? "w-9 h-9" : "w-11 h-11"} />
      <div className="flex flex-col items-end leading-none gap-0.5">
        <span
          className={clsx(
            "font-arabic font-extrabold tracking-tight",
            compact ? "text-[15px]" : "text-lg",
            isDark ? "text-brand-cream" : "text-brand-espresso"
          )}
        >
          رياض
        </span>
        <span
          className={clsx(
            "font-latin font-medium ltr-text",
            compact ? "text-[15px]" : "text-xl",
            isDark ? "text-brand-gold" : "text-brand-primary"
          )}
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          riads
        </span>
        {!compact && (
          <span
            className={clsx(
              "font-arabic text-[10px] font-semibold",
              isDark ? "text-brand-cream/65" : "text-brand-primary/75"
            )}
          >
            للجمال رياض
          </span>
        )}
      </div>
    </div>
  );
}

export default function RiadsLogo({
  variant = "lockup",
  className = "",
  priority = false,
}: RiadsLogoProps) {
  if (variant === "mark") {
    return <RiadsLogoMark className={className} />;
  }

  if (variant === "lockup") {
    return <RiadsLogoLockup className={className} />;
  }

  const { src, width, height, alt } = stampAsset;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={clsx("h-auto w-auto object-contain", className)}
    />
  );
}
