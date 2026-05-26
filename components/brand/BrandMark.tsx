import { clsx } from "clsx";

type BrandMarkProps = {
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: { box: "h-8 w-8", letter: "text-lg" },
  md: { box: "h-10 w-10", letter: "text-xl" },
};

export default function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  const s = sizeClasses[size];

  return (
    <div
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-ivory shadow-sm",
        s.box,
        className
      )}
      aria-hidden
    >
      <span
        className={clsx(
          "font-latin font-semibold leading-none text-brand-primary ltr-text",
          s.letter
        )}
      >
        R
      </span>
    </div>
  );
}
