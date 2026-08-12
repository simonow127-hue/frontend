interface LogoProps {
  className?: string;
}

export function CodLogo({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 60 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="الدفع عند الاستلام"
    >
      <rect
        width="60"
        height="38"
        rx="5"
        fill="#ffffff"
        stroke="#e5e7eb"
        strokeWidth="1"
      />

      <rect x="8" y="12" width="28" height="14" rx="2" fill="#16a34a" />

      <circle
        cx="22"
        cy="19"
        r="4"
        fill="#ffffff"
        opacity="0.3"
      />

      <text
        x="22"
        y="19.5"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="bold"
        fontFamily="Arial"
      >
        SAR
      </text>

      <text
        x="43"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#374151"
        fontSize="8"
        fontWeight="bold"
        fontFamily="Arial"
      >
        COD
      </text>
    </svg>
  );
}

export default function PaymentLogos({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const dims = size === "sm" ? "w-10 h-6" : "w-14 h-9";

  return (
    <div className={`flex flex-wrap gap-2 items-center ${className}`}>
      <CodLogo className={`${dims} rounded object-contain`} />
    </div>
  );
}
