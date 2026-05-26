import { ImageIcon } from "lucide-react";
import Image from "next/image";

type AspectRatio = "square" | "wide" | "banner" | "portrait";

interface ImagePlaceholderProps {
  label: string;
  hint?: string;
  aspect?: AspectRatio;
  className?: string;
}

const aspectClasses: Record<AspectRatio, string> = {
  square: "aspect-square",
  wide: "aspect-[4/3]",
  banner: "aspect-[21/9] md:aspect-[3/1]",
  portrait: "aspect-[3/4]",
};

export default function ImagePlaceholder({
  label,
  hint = "أضف صورتك هنا",
  aspect = "square",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-brand-primary/25 bg-gradient-to-br from-brand-cream via-brand-ivory to-brand-cream/80 flex flex-col items-center justify-center gap-3 p-6 text-center ${aspectClasses[aspect]} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(45deg,#9A4E36_0,#9A4E36_1px,transparent_0,transparent_50%)] bg-[length:12px_12px]" />
      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand-ivory/90 p-1.5 ring-1 ring-brand-border/70">
        <Image
          src="/brand/logo-stamp.svg"
          alt="riads"
          width={24}
          height={24}
          className="h-6 w-6 opacity-80"
        />
      </div>
      <div className="relative z-10 w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center">
        <ImageIcon size={28} className="text-brand-primary/60" />
      </div>
      <div className="relative z-10 flex flex-col gap-1 max-w-[85%]">
        <p className="font-arabic font-bold text-brand-espresso text-sm md:text-base">{label}</p>
        <p className="text-xs text-brand-espresso/50">{hint}</p>
      </div>
      <span className="relative z-10 text-[10px] uppercase tracking-widest text-brand-primary/40 font-latin ltr-text">
        riads.shop
      </span>
    </div>
  );
}
