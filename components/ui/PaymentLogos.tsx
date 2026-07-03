interface LogoProps {
  className?: string;
}

export function VisaLogo({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 60 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Visa">
      <rect width="60" height="38" rx="5" fill="#1A1F71" />
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">VISA</text>
    </svg>
  );
}

export function MastercardLogo({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 60 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Mastercard">
      <rect width="60" height="38" rx="5" fill="#252525" />
      <circle cx="23" cy="19" r="10" fill="#EB001B" />
      <circle cx="37" cy="19" r="10" fill="#F79E1B" />
      <path d="M30 11.5a10 10 0 0 1 0 15 10 10 0 0 1 0-15z" fill="#FF5F00" />
    </svg>
  );
}

export function MadaLogo({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 60 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="مدى">
      <rect width="60" height="38" rx="5" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
      <rect x="4" y="10" width="52" height="18" rx="3" fill="#BE2038" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="0.5">mada</text>
    </svg>
  );
}

export function StcPayLogo({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 60 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="STC Pay">
      <rect width="60" height="38" rx="5" fill="#7B2D8B" />
      <text x="50%" y="44%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="0.5">stc</text>
      <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fill="#E8A0F0" fontSize="9" fontFamily="Arial, sans-serif" letterSpacing="1">pay</text>
    </svg>
  );
}

export function ApplePayLogo({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 60 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Apple Pay">
      <rect width="60" height="38" rx="5" fill="#000000" />
      {/* Apple icon simplified */}
      <path d="M24.5 13.5c.8-1 1.3-2.3 1.1-3.6-1.1.1-2.5.8-3.3 1.8-.7.9-1.3 2.2-1.1 3.5 1.2.1 2.5-.7 3.3-1.7z" fill="white" />
      <path d="M25.6 15.2c-1.8-.1-3.3 1-4.2 1-.9 0-2.2-1-3.7-.9-1.9.1-3.6 1.1-4.5 2.8-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.2.9 3.6.9 1.5 0 2.5-1.3 3.4-2.6.7-1 1.2-2 1.5-3.1-2-.8-3.3-2.8-3.3-5 0-2 1.1-3.9 2.8-4.9-.9-1.3-2.4-2-4.1-1.9z" fill="white" />
      <text x="78%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontFamily="Arial, sans-serif" letterSpacing="0.3">Pay</text>
    </svg>
  );
}

export function CodLogo({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 60 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="الدفع عند الاستلام">
      <rect width="60" height="38" rx="5" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
      {/* Banknote icon */}
      <rect x="8" y="12" width="28" height="14" rx="2" fill="#16a34a" />
      <circle cx="22" cy="19" r="4" fill="#ffffff" opacity="0.3" />
      <text x="22" y="19.5" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">SAR</text>
      <text x="43" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#374151" fontSize="8" fontWeight="bold" fontFamily="Arial">COD</text>
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
  const logos = [CodLogo, MadaLogo, VisaLogo, MastercardLogo, StcPayLogo, ApplePayLogo];
  return (
    <div className={`flex flex-wrap gap-2 items-center ${className}`}>
      {logos.map((Logo, i) => (
        <Logo key={i} className={`${dims} rounded object-contain`} />
      ))}
    </div>
  );
}
