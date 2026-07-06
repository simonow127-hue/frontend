const BRAND = {
  ocean: "#1E3520",
  oceanLight: "#2A4536",
  land: "#E8DCC8",
  landStroke: "#C9A45C",
  neighbor: "#3A4F42",
  sea: "#243D32",
  cityDot: "#C9A45C",
  cityText: "#1A1A1A",
  pin: "#C9A45C",
  pinInner: "#1A1A1A",
  muted: "#8A9A8E",
} as const;

export default function SaudiDeliveryMap() {
  return (
    <div className="w-full max-w-2xl mx-auto px-1">
      <svg
        viewBox="0 0 520 380"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto rounded-xl"
        style={{ filter: "drop-shadow(0 6px 20px rgba(26,26,26,0.12))" }}
        aria-label="خريطة المملكة العربية السعودية — توصيل لكل المناطق"
      >
        <rect width="520" height="380" fill={BRAND.ocean} rx="12" />

        {/* Neighboring countries */}
        <path
          d="M 0,0 L 520,0 L 520,30 L 420,35 L 370,28 L 310,22 L 250,30 L 190,42 L 155,52 L 130,68 L 100,72 L 78,88 L 65,105 L 0,80 Z"
          fill={BRAND.neighbor}
        />
        <path
          d="M 390,0 L 520,0 L 520,180 L 440,210 L 410,185 L 370,155 L 340,140 L 335,115 L 325,95 L 370,28 L 420,35 Z"
          fill={BRAND.neighbor}
        />
        <path
          d="M 440,210 L 520,180 L 520,380 L 460,380 L 420,330 L 400,295 L 390,270 L 375,248 L 360,238 L 340,230 L 320,245 L 306,262 L 290,275 L 270,310 L 250,330 L 260,355 L 280,370 L 350,380 L 440,380 Z"
          fill={BRAND.neighbor}
        />
        <path
          d="M 180,320 L 250,330 L 270,310 L 290,275 L 306,262 L 320,245 L 340,230 L 360,238 L 375,248 L 390,270 L 400,295 L 420,330 L 460,380 L 100,380 L 115,360 L 140,345 L 165,332 Z"
          fill={BRAND.neighbor}
        />
        <path
          d="M 0,200 L 65,195 L 78,210 L 90,230 L 100,260 L 112,290 L 118,320 L 115,360 L 100,380 L 0,380 Z"
          fill={BRAND.neighbor}
        />
        <path
          d="M 0,0 L 65,0 L 78,88 L 65,105 L 50,140 L 35,175 L 20,195 L 0,200 Z"
          fill={BRAND.neighbor}
        />

        {/* Red Sea */}
        <path
          d="M 65,105 L 78,88 L 78,105 L 82,125 L 88,145 L 95,168 L 104,190 L 118,215 L 132,235 L 148,260 L 155,275 L 160,295 L 165,332 L 140,345 L 115,360 L 100,380 L 0,380 L 0,200 L 35,175 L 50,140 Z"
          fill={BRAND.sea}
        />

        {/* Persian Gulf */}
        <path
          d="M 340,140 L 370,155 L 410,185 L 440,210 L 420,230 L 400,220 L 380,205 L 360,195 L 340,185 L 325,175 L 315,162 L 320,148 L 325,138 Z"
          fill={BRAND.sea}
        />
        <path
          d="M 420,230 L 440,210 L 520,180 L 520,280 L 500,310 L 470,340 L 440,360 L 440,380 L 350,380 L 280,370 L 260,355 L 250,330 L 290,275 L 320,245 L 340,230 L 360,238 L 390,270 L 420,310 L 445,340 L 470,330 L 490,290 L 500,260 L 490,235 L 460,215 L 440,215 Z"
          fill={BRAND.sea}
        />

        {/* Saudi Arabia */}
        <path
          d="
            M 78,88
            L 100,72
            L 130,68
            L 155,52
            L 190,42
            L 250,30
            L 310,22
            L 325,38
            L 325,95
            L 325,115
            L 325,138
            L 320,148
            L 315,162
            L 325,175
            L 340,185
            L 360,195
            L 380,205
            L 400,220
            L 390,245
            L 375,248
            L 360,238
            L 340,230
            L 320,245
            L 306,262
            L 290,275
            L 270,310
            L 250,330
            L 230,320
            L 210,310
            L 180,320
            L 165,332
            L 160,295
            L 155,275
            L 148,260
            L 132,235
            L 118,215
            L 104,190
            L 95,168
            L 88,145
            L 82,125
            L 78,105
            Z
          "
          fill={BRAND.land}
          stroke={BRAND.landStroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Cities */}
        <circle cx="105" cy="200" r="4" fill={BRAND.cityDot} />
        <text x="72" y="196" fontSize="12" fill={BRAND.cityText} fontFamily="var(--font-tajawal), sans-serif" fontWeight="700">
          جدة
        </text>

        <circle cx="290" cy="190" r="3.5" fill="white" stroke={BRAND.cityDot} strokeWidth="2" />
        <text x="298" y="195" fontSize="12" fill={BRAND.cityText} fontFamily="var(--font-tajawal), sans-serif" fontWeight="700">
          الرياض
        </text>

        <circle cx="355" cy="205" r="3.5" fill={BRAND.cityDot} />
        <text x="363" y="209" fontSize="11" fill={BRAND.cityText} fontFamily="var(--font-tajawal), sans-serif" fontWeight="700">
          الدمام
        </text>

        {/* Delivery pin */}
        <ellipse cx="210" cy="195" rx="9" ry="3.5" fill="#000" opacity="0.12" />
        <path
          d="M 210,130 C 188,130 172,146 172,168 C 172,188 195,208 210,222 C 225,208 248,188 248,168 C 248,146 232,130 210,130 Z"
          fill={BRAND.pin}
        />
        <circle cx="210" cy="166" r="17" fill={BRAND.pinInner} />
        <circle cx="210" cy="166" r="12" fill={BRAND.oceanLight} />
        <path
          d="M 201,166 L 207,173 L 220,157"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Legend */}
        <rect x="372" y="332" width="136" height="38" rx="8" fill={BRAND.land} stroke={BRAND.landStroke} strokeWidth="1" />
        <path
          d="M 392,348 C 388,348 385,351 385,355 C 385,359 389,363 392,366 C 395,363 399,359 399,355 C 399,351 396,348 392,348 Z"
          fill={BRAND.pin}
        />
        <circle cx="392" cy="355" r="2.5" fill={BRAND.pinInner} />
        <path d="M 389,355 L 391,358 L 395,352" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="408" y="349" fontSize="10" fill={BRAND.cityText} fontFamily="var(--font-tajawal), sans-serif" fontWeight="700">
          توصيل رياض
        </text>
        <text x="408" y="363" fontSize="9" fill={BRAND.muted} fontFamily="var(--font-tajawal), sans-serif">
          كل مناطق المملكة
        </text>
      </svg>
    </div>
  );
}
