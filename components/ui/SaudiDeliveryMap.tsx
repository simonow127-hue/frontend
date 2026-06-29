// City coordinates (lon, lat) converted to SVG: x=(lon-32)*14, y=(35-lat)*14
const cities = [
  { id: "riyadh",  ar: "الرياض",          x: 207, y: 143, r: 4,   main: true  },
  { id: "jeddah",  ar: "جدة",              x: 100, y: 188, r: 3.5, main: true  },
  { id: "dammam",  ar: "الدمام",           x: 253, y: 120, r: 3,   main: true  },
  { id: "mecca",   ar: "مكة المكرمة",     x: 109, y: 191, r: 2.5              },
  { id: "medina",  ar: "المدينة المنورة", x: 107, y: 147, r: 2.5              },
  { id: "tabuk",   ar: "تبوك",             x: 64,  y: 93,  r: 2                },
  { id: "abha",    ar: "أبها",             x: 147, y: 237, r: 2                },
  { id: "jizan",   ar: "جازان",            x: 147, y: 254, r: 2                },
  { id: "qassim",  ar: "القصيم",           x: 168, y: 121, r: 2                },
  { id: "hail",    ar: "حائل",             x: 135, y: 104, r: 2                },
  { id: "najran",  ar: "نجران",            x: 171, y: 243, r: 2                },
  { id: "jouf",    ar: "الجوف",            x: 113, y: 71,  r: 2                },
];

// Label offset per city to avoid overlap
const labelOffset: Record<string, [number, number]> = {
  riyadh:  [0, -7],
  jeddah:  [-8, -6],
  dammam:  [0, -7],
  mecca:   [10, 3],
  medina:  [8, -6],
  tabuk:   [-8, -5],
  abha:    [8, 3],
  jizan:   [8, 3],
  qassim:  [0, -6],
  hail:    [-6, -5],
  najran:  [8, 3],
  jouf:    [-5, -5],
};

export default function SaudiDeliveryMap() {
  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <svg
        viewBox="0 0 400 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-lg"
        aria-label="خريطة المملكة العربية السعودية"
      >
        {/* Sea background */}
        <rect width="400" height="310" fill="#0D2137" rx="12" />

        {/* Red Sea (west) */}
        <path
          d="M 0,55 L 64,77 L 63,95 L 65,105 L 68,114 L 77,128 L 85,152 L 91,168 L 100,188 L 112,202 L 127,221 L 140,245 L 147,256 L 120,310 L 0,310 Z"
          fill="#1B3D5C"
          opacity="0.8"
        />

        {/* Persian Gulf (east) */}
        <path
          d="M 400,90 L 331,180 L 324,168 L 274,152 L 267,133 L 264,122 L 253,118 L 238,110 L 216,88 L 240,70 L 280,60 L 320,60 L 400,80 Z"
          fill="#1B3D5C"
          opacity="0.8"
        />

        {/* Surrounding land (neighbors) */}
        {/* Jordan / Iraq north */}
        <path
          d="M 0,0 L 400,0 L 400,85 L 331,180 L 290,210 L 266,228 L 252,228 L 231,250 L 210,238 L 189,258 L 169,245 L 154,258 L 147,256 L 120,310 L 0,310 L 0,55 L 64,77 L 84,63 L 99,40 L 112,42 L 141,56 L 175,70 L 201,82 L 216,88 L 238,110 L 253,118 L 264,122 L 267,133 L 274,152 L 324,168 L 331,180 Z"
          fill="#2A3520"
          opacity="0.5"
        />

        {/* Saudi Arabia fill */}
        <path
          d="
            M 64,77
            L 63,95
            L 65,105
            L 68,114
            L 77,128
            L 85,152
            L 91,168
            L 100,188
            L 112,202
            L 127,221
            L 140,245
            L 147,256
            L 154,262
            L 169,245
            L 189,258
            L 210,238
            L 231,250
            L 252,228
            L 266,228
            L 290,210
            L 316,188
            L 331,180
            L 324,168
            L 274,152
            L 267,133
            L 264,122
            L 253,118
            L 238,110
            L 216,88
            L 201,82
            L 175,70
            L 141,56
            L 112,42
            L 99,40
            L 84,63
            Z
          "
          fill="#C8B882"
          stroke="#8B7340"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Internal region lines (simplified) */}
        {[
          "M 130,88 L 175,70",
          "M 130,88 L 100,188",
          "M 130,88 L 207,143",
          "M 207,143 L 253,118",
          "M 207,143 L 175,70",
          "M 207,143 L 169,245",
          "M 130,88 L 64,77",
        ].map((d, i) => (
          <path key={i} d={d} stroke="#8B7340" strokeWidth="0.5" strokeOpacity="0.35" strokeDasharray="3,4" />
        ))}

        {/* City markers */}
        {cities.map((city) => {
          const offset = labelOffset[city.id] ?? [0, -6];
          return (
            <g key={city.id}>
              {city.main && (
                <circle cx={city.x} cy={city.y} r={city.r + 4} fill="#1B2B1B" opacity="0.25" />
              )}
              <circle cx={city.x} cy={city.y} r={city.r} fill={city.main ? "#C9A45C" : "#C9A45C99"} />
              <text
                x={city.x + offset[0]}
                y={city.y + offset[1]}
                textAnchor="middle"
                fontSize={city.main ? 6.5 : 5}
                fill={city.main ? "#FDEDB0" : "#E8C97ABB"}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight={city.main ? "700" : "500"}
              >
                {city.ar}
              </text>
            </g>
          );
        })}

        {/* Country label: إيران */}
        <text x="365" y="110" fontSize="7" fill="#ffffff44" fontFamily="system-ui" textAnchor="middle">إيران</text>
        {/* Country label: العراق */}
        <text x="230" y="30" fontSize="7" fill="#ffffff44" fontFamily="system-ui" textAnchor="middle">العراق</text>
        {/* Country label: الأردن */}
        <text x="85" y="25" fontSize="7" fill="#ffffff44" fontFamily="system-ui" textAnchor="middle">الأردن</text>
        {/* Country label: اليمن */}
        <text x="190" y="295" fontSize="7" fill="#ffffff44" fontFamily="system-ui" textAnchor="middle">اليمن</text>
        {/* Sea label */}
        <text x="30" y="200" fontSize="6" fill="#5A8FAA" fontFamily="system-ui" textAnchor="middle" transform="rotate(-70,30,200)">البحر الأحمر</text>
        <text x="375" y="140" fontSize="6" fill="#5A8FAA" fontFamily="system-ui" textAnchor="middle" transform="rotate(70,375,140)">الخليج العربي</text>
      </svg>
    </div>
  );
}
