import { clsx } from "clsx";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  framed?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14 md:h-16 md:w-16",
};

export default function BrandMark({
  size = "md",
  framed = false,
  className = "",
}: BrandMarkProps) {
  return (
    <div
      className={clsx(
        "shrink-0 rounded-full overflow-hidden",
        sizeClasses[size],
        framed && "ring-2 ring-brand-gold/70 shadow-[0_0_0_1px_#C9A45C33]",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#2A3F2A" />
            <stop offset="100%" stopColor="#0F1F0F" />
          </radialGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="50%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#A8843A" />
          </linearGradient>
        </defs>

        {/* Background */}
        <circle cx="50" cy="50" r="50" fill="url(#bgGrad)" />

        {/* Outer ring */}
        <circle cx="50" cy="50" r="45" stroke="#C9A45C" strokeWidth="0.7" strokeOpacity="0.5" />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="38" stroke="#C9A45C" strokeWidth="0.4" strokeOpacity="0.25" />

        {/* 8-pointed Islamic star */}
        <path
          d="M50,17 L55.36,37.06 L73.33,26.67 L62.94,44.64 L83,50 L62.94,55.36 L73.33,73.33 L55.36,62.94 L50,83 L44.64,62.94 L26.67,73.33 L37.06,55.36 L17,50 L37.06,44.64 L26.67,26.67 L44.64,37.06 Z"
          fill="url(#goldGrad)"
          opacity="0.95"
        />

        {/* Center octagon cutout */}
        <circle cx="50" cy="50" r="10" fill="url(#bgGrad)" />

        {/* Center small diamond */}
        <path d="M50,44.5 L55.5,50 L50,55.5 L44.5,50 Z" fill="url(#goldGrad)" />
      </svg>
    </div>
  );
}
