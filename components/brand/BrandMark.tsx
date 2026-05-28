import Image from "next/image";
import { clsx } from "clsx";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: { box: "h-8 w-8" },
  md: { box: "h-10 w-10" },
  lg: { box: "h-14 w-14 md:h-16 md:w-16" },
};

export default function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  const s = sizeClasses[size];

  return (
    <div
      className={clsx(
        "relative shrink-0 overflow-hidden rounded-full",
        s.box,
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
