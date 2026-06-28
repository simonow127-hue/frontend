import Image from "next/image";
import { clsx } from "clsx";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  framed?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: { box: "h-8 w-8" },
  md: { box: "h-10 w-10" },
  lg: { box: "h-14 w-14 md:h-16 md:w-16" },
};

export default function BrandMark({
  size = "md",
  framed = false,
  className = "",
}: BrandMarkProps) {
  const s = sizeClasses[size];

  return (
    <div
      className={clsx(
        "relative shrink-0 overflow-hidden rounded-full",
        s.box,
        framed && "ring-2 ring-brand-gold/70 shadow-[0_0_0_1px_#C9A45C33]",
        className
      )}
      aria-hidden
    >
      <Image
        src="/images/brand/logo-mark.png"
        alt="Riads logo mark"
        fill
        sizes="64px"
        className="object-contain"
      />
    </div>
  );
}
