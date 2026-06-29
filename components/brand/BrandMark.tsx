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

// 6 palm fronds: angles from -75° to +75°, symmetric fan
const frondAngles = [-75, -45, -15, 15, 45, 75];

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
          <radialGradient id="bm_bg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1E3520" />
            <stop offset="100%" stopColor="#0A160B" />
          </radialGradient>
          <linearGradient id="bm_gold" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#F0D882" />
            <stop offset="50%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#A07830" />
          </linearGradient>
          <linearGradient id="bm_trunk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A07830" />
            <stop offset="50%" stopColor="#D4AE60" />
            <stop offset="100%" stopColor="#A07830" />
          </linearGradient>
        </defs>

        {/* Background */}
        <circle cx="50" cy="50" r="50" fill="url(#bm_bg)" />

        {/* Outer decorative ring */}
        <circle cx="50" cy="50" r="44" stroke="#C9A45C" strokeWidth="0.7" strokeOpacity="0.45" />
        <circle cx="50" cy="50" r="40" stroke="#C9A45C" strokeWidth="0.3" strokeOpacity="0.2" />

        {/* Fronds — 6 fronds radiating from crown (50,44) */}
        {frondAngles.map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="29"
            rx="3"
            ry="14"
            fill="url(#bm_gold)"
            opacity={Math.abs(angle) > 60 ? "0.75" : "0.95"}
            transform={`rotate(${angle}, 50, 44)`}
          />
        ))}

        {/* Trunk */}
        <path
          d="M 47.5,84 C 46.5,74 47,64 48.5,55 Q 50,50 51.5,55 C 53,64 53.5,74 52.5,84 Z"
          fill="url(#bm_trunk)"
        />

        {/* Crown center (dates cluster) */}
        <circle cx="50" cy="44" r="4.5" fill="#D4AE60" />
        <circle cx="50" cy="44" r="2.5" fill="#F0D882" />

        {/* Small ground accent line */}
        <path
          d="M 40,84 Q 50,82 60,84"
          stroke="#C9A45C"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
