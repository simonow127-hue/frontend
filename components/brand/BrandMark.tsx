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
        {/* Background */}
        <circle cx="50" cy="50" r="50" fill="#1B2B1B" />
        {/* Outer decorative ring */}
        <circle cx="50" cy="50" r="43" stroke="#C9A45C" strokeWidth="1" strokeOpacity="0.35" />
        {/* 4-pointed compass star — main arms */}
        <path
          d="M50 15 L56.5 43.5 L85 50 L56.5 56.5 L50 85 L43.5 56.5 L15 50 L43.5 43.5 Z"
          fill="#C9A45C"
        />
        {/* Inner diamond overlay for depth */}
        <path
          d="M50 15 L56.5 43.5 L85 50 L56.5 56.5 L50 85 L43.5 56.5 L15 50 L43.5 43.5 Z"
          fill="url(#starGrad)"
        />
        {/* Center circle cutout */}
        <circle cx="50" cy="50" r="9" fill="#1B2B1B" />
        {/* Center diamond */}
        <path d="M50 44 L56 50 L50 56 L44 50 Z" fill="#C9A45C" opacity="0.9" />
        <defs>
          <radialGradient id="starGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#E8C97A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C9A45C" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
