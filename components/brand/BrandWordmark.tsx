import Link from "next/link";
import { clsx } from "clsx";
import BrandMark from "./BrandMark";

type BrandWordmarkProps = {
  size?: "sm" | "md";
  className?: string;
  asLink?: boolean;
};

const nameStyles =
  "bg-gradient-to-l from-brand-gold via-[#E8C97A] to-brand-gold bg-clip-text text-transparent";

export default function BrandWordmark({
  size = "md",
  className = "",
  asLink = false,
}: BrandWordmarkProps) {
  const content = (
    <div className={clsx("flex items-center gap-2.5 shrink-0 min-w-0", className)}>
      <BrandMark size={size === "sm" ? "sm" : "md"} framed />
      <div className="flex items-baseline gap-1.5 whitespace-nowrap leading-none">
        <span
          className={clsx(
            "font-arabic font-black tracking-tight",
            nameStyles,
            size === "sm" ? "text-base" : "text-lg md:text-xl"
          )}
        >
          رياض
        </span>
        <span
          className={clsx(
            "font-body font-bold ltr-text tracking-[0.18em] uppercase",
            nameStyles,
            size === "sm" ? "text-[8px]" : "text-[9px] md:text-[10px]"
          )}
        >
          Riads
        </span>
      </div>
    </div>
  );

  if (asLink) {
    return <Link href="/">{content}</Link>;
  }

  return content;
}
