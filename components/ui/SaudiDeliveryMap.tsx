const cities = [
  { name: "الرياض",         x: 168, y: 106, r: 4, main: true  },
  { name: "جدة",            x: 20,  y: 126, r: 3, main: true  },
  { name: "مكة المكرمة",   x: 25,  y: 133, r: 2.5            },
  { name: "المدينة المنورة",x: 28,  y: 96,  r: 2.5            },
  { name: "الدمام",         x: 190, y: 80,  r: 3, main: true  },
  { name: "تبوك",           x: 20,  y: 52,  r: 2.5            },
  { name: "أبها",           x: 55,  y: 168, r: 2              },
  { name: "جازان",          x: 46,  y: 181, r: 2              },
  { name: "القصيم",         x: 135, y: 70,  r: 2.5            },
  { name: "حائل",           x: 108, y: 54,  r: 2              },
  { name: "نجران",          x: 145, y: 186, r: 2              },
  { name: "الجوف",          x: 65,  y: 38,  r: 2              },
  { name: "الباحة",         x: 42,  y: 150, r: 2              },
  { name: "الخبر",          x: 195, y: 85,  r: 2              },
];

export default function SaudiDeliveryMap() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg
        viewBox="-10 10 290 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="خريطة المملكة العربية السعودية"
      >
        {/* Saudi Arabia border */}
        <path
          d="
            M 15,55
            L 10,65
            L 8,82
            L 10,100
            L 16,118
            L 20,128
            L 26,140
            L 34,158
            L 42,172
            L 50,182
            L 62,190
            L 88,194
            L 115,196
            L 140,192
            L 162,182
            L 178,170
            L 192,158
            L 205,145
            L 212,130
            L 210,115
            L 208,100
            L 202,86
            L 195,75
            L 182,62
            L 168,54
            L 152,50
            L 138,47
            L 118,40
            L 92,30
            L 68,22
            L 46,28
            L 30,36
            L 18,45
            Z
          "
          fill="#C9A45C14"
          stroke="#C9A45C"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* City dots + labels */}
        {cities.map((city) => (
          <g key={city.name}>
            {/* Glow ring for main cities */}
            {city.main && (
              <circle
                cx={city.x}
                cy={city.y}
                r={city.r + 3.5}
                fill="#C9A45C22"
              />
            )}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.r}
              fill={city.main ? "#C9A45C" : "#C9A45C99"}
            />
            <text
              x={city.x}
              y={city.y - city.r - 2.5}
              textAnchor="middle"
              fontSize={city.main ? "6" : "5"}
              fill={city.main ? "#E8C97A" : "#C9A45C99"}
              fontFamily="system-ui, sans-serif"
              fontWeight={city.main ? "700" : "400"}
            >
              {city.name}
            </text>
          </g>
        ))}

        {/* Subtle grid lines */}
        <line x1="0" y1="110" x2="230" y2="110" stroke="#C9A45C" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="3,4" />
        <line x1="110" y1="20" x2="110" y2="200" stroke="#C9A45C" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="3,4" />
      </svg>
    </div>
  );
}
