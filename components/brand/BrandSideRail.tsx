import { RiadsLogoMark } from "@/components/brand/RiadsLogo";
import { clsx } from "clsx";

interface BrandSideRailProps {
  className?: string;
  accent?: string;
}

/** شريط branding عمودي — يملأ الجنب بجانب الصور */
export default function BrandSideRail({ className = "", accent = "#9A4E36" }: BrandSideRailProps) {
  return (
    <div
      className={clsx(
        "hidden md:flex flex-col items-center justify-between py-6 px-2 rounded-2xl border border-brand-border/80",
        "bg-gradient-to-b from-brand-cream via-brand-ivory to-brand-cream",
        className
      )}
      aria-hidden
    >
      <div className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent" />
      <RiadsLogoMark className="w-9 h-9 shrink-0" />
      <span
        className="font-arabic font-extrabold text-[11px] tracking-wide my-3"
        style={{ color: accent, writingMode: "vertical-rl" }}
      >
        رياض
      </span>
      <span
        className="font-latin text-[9px] ltr-text opacity-60 mb-2"
        style={{ writingMode: "vertical-rl", fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        riads
      </span>
      <div className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent" />
      <span className="text-[8px] text-brand-espresso/40 text-center leading-tight mt-2">
        صُنع
        <br />
        في المغرب
      </span>
    </div>
  );
}
