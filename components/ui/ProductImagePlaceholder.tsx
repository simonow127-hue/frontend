interface ProductImagePlaceholderProps {
  productId: string;
  productName: string;
  color: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const GRADIENTS: Record<string, string> = {
  jadr: "from-[#9A4E36] to-[#C9A45C]",
  nour: "from-[#C9A45C] to-[#E8C8B6]",
  naqaa: "from-[#7A8061] to-[#9A4E36]",
};

const ARABIC_ABBR: Record<string, string> = {
  jadr: "ج",
  nour: "ن",
  naqaa: "ق",
};

export default function ProductImagePlaceholder({
  productId,
  productName,
  className = "",
  size = "md",
}: ProductImagePlaceholderProps) {
  const gradient = GRADIENTS[productId] || "from-brand-primary to-brand-gold";
  const abbr = ARABIC_ABBR[productId] || productName[0];

  const sizes = {
    sm: "w-16 h-16 text-2xl",
    md: "w-full aspect-square text-6xl",
    lg: "w-full aspect-[4/5] text-8xl",
  };

  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-2xl flex flex-col items-center justify-center gap-4 ${sizes[size]} ${className}`}
      role="img"
      aria-label={productName}
    >
      <span className="text-white/20 font-arabic font-bold">{abbr}</span>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-white text-xs font-bold font-arabic">
          {productName.split(" ").slice(0, 2).join(" ")}
        </span>
      </div>
    </div>
  );
}
