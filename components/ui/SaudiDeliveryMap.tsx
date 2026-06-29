export default function SaudiDeliveryMap() {
  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <svg
        viewBox="0 0 400 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto rounded-xl overflow-hidden"
        style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.18))" }}
        aria-label="خريطة المملكة العربية السعودية"
      >
        {/* Ocean background - light blue like Google Maps */}
        <rect width="400" height="310" fill="#A8D0E6" />

        {/* Rounded clip */}
        <clipPath id="mapClip">
          <rect width="400" height="310" rx="12" />
        </clipPath>

        {/* Surrounding land (neighbors) — slightly greenish beige */}
        <path
          d="M 0,0 L 400,0 L 400,85 L 331,180 L 290,210 L 266,228 L 252,228 L 231,250 L 210,238 L 189,258 L 169,245 L 154,258 L 147,256 L 120,310 L 0,310 L 0,55 L 64,77 L 84,63 L 99,40 L 112,42 L 141,56 L 175,70 L 201,82 L 216,88 L 238,110 L 253,118 L 264,122 L 267,133 L 274,152 L 324,168 L 331,180 Z"
          fill="#D4C8A0"
        />

        {/* Saudi Arabia — warm beige like Google Maps */}
        <path
          d="
            M 64,77
            L 63,95 L 65,105 L 68,114 L 77,128 L 85,152 L 91,168
            L 100,188 L 112,202 L 127,221 L 140,245 L 147,256
            L 154,262 L 169,245 L 189,258 L 210,238
            L 231,250 L 252,228 L 266,228 L 290,210
            L 316,188 L 331,180 L 324,168 L 274,152
            L 267,133 L 264,122 L 253,118 L 238,110
            L 216,88 L 201,82 L 175,70 L 141,56
            L 112,42 L 99,40 L 84,63 Z
          "
          fill="#EFE5C2"
          stroke="#B0A070"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Red Sea - left, darker blue water */}
        <path
          d="M 0,55 L 64,77 L 63,95 L 65,105 L 68,114 L 77,128 L 85,152 L 91,168 L 100,188 L 112,202 L 127,221 L 140,245 L 147,256 L 120,310 L 0,310 Z"
          fill="#7BB8D4"
        />

        {/* Persian Gulf - right, darker blue water */}
        <path
          d="M 400,0 L 400,130 L 331,180 L 324,168 L 274,152 L 267,133 L 264,122 L 253,118 L 238,110 L 216,88 L 240,70 L 280,50 L 360,40 Z"
          fill="#7BB8D4"
        />

        {/* Red Sea label */}
        <text
          x="38" y="195"
          fontSize="6.5"
          fill="#4A8BA8"
          fontFamily="system-ui, sans-serif"
          fontWeight="500"
          textAnchor="middle"
          transform="rotate(-72, 38, 195)"
        >
          البحر الأحمر
        </text>

        {/* Persian Gulf label */}
        <text
          x="370" y="115"
          fontSize="6"
          fill="#4A8BA8"
          fontFamily="system-ui, sans-serif"
          fontWeight="500"
          textAnchor="middle"
          transform="rotate(68, 370, 115)"
        >
          الخليج العربي
        </text>

        {/* Country labels — muted like Google Maps */}
        <text x="350" y="55" fontSize="8" fill="#7A6E5A" fontFamily="system-ui" fontWeight="600" textAnchor="middle">IRAN</text>
        <text x="290" y="25" fontSize="7.5" fill="#7A6E5A" fontFamily="system-ui" fontWeight="500" textAnchor="middle">IRAQ</text>
        <text x="68" y="22" fontSize="7" fill="#7A6E5A" fontFamily="system-ui" fontWeight="500" textAnchor="middle">JORDAN</text>
        <text x="195" y="292" fontSize="7.5" fill="#7A6E5A" fontFamily="system-ui" fontWeight="500" textAnchor="middle">YEMEN</text>
        <text x="375" y="210" fontSize="7" fill="#7A6E5A" fontFamily="system-ui" fontWeight="500" textAnchor="middle">OMAN</text>
        <text x="375" y="120" fontSize="6.5" fill="#7A6E5A" fontFamily="system-ui" fontWeight="500" textAnchor="middle">UAE</text>

        {/* Riyadh dot + label */}
        <circle cx="222" cy="155" r="3" fill="#5A5A7A" />
        <text
          x="232" y="158"
          fontSize="9"
          fill="#2A2A3A"
          fontFamily="system-ui, sans-serif"
          fontWeight="600"
        >
          Riyadh
        </text>

        {/* Jeddah dot + label */}
        <circle cx="96" cy="188" r="2.5" fill="#5A5A7A" />
        <text
          x="58" y="184"
          fontSize="8.5"
          fill="#2A2A3A"
          fontFamily="system-ui, sans-serif"
          fontWeight="600"
        >
          Jeddah
        </text>

        {/* Center delivery pin — Google Maps style dark navy teardrop with checkmark */}
        {/* Pin shadow */}
        <ellipse cx="170" cy="166" rx="7" ry="3" fill="#000" opacity="0.18" />
        {/* Pin body (teardrop) */}
        <path
          d="M 170,110 C 150,110 137,124 137,141 C 137,157 155,173 170,185 C 185,173 203,157 203,141 C 203,124 190,110 170,110 Z"
          fill="#1A3B6E"
        />
        {/* Pin inner circle */}
        <circle cx="170" cy="140" r="14" fill="#1A3B6E" />
        <circle cx="170" cy="140" r="11" fill="#2550A0" />
        {/* White checkmark inside pin */}
        <path
          d="M 163,140 L 168,146 L 178,133"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
