export default function SaudiDeliveryMap() {
  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <svg
        viewBox="0 0 520 380"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto rounded-xl"
        style={{ filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.15))" }}
        aria-label="خريطة المملكة العربية السعودية — توصيل لكل المناطق"
      >
        {/* Ocean background — Google Maps light blue */}
        <rect width="520" height="380" fill="#A8CEE3" rx="12" />

        {/* ── Neighboring countries (muted tan-green) ── */}
        {/* Jordan + Iraq + Syria (north) */}
        <path
          d="M 0,0 L 520,0 L 520,30 L 420,35 L 370,28 L 310,22 L 250,30 L 190,42 L 155,52 L 130,68 L 100,72 L 78,88 L 65,105 L 0,80 Z"
          fill="#C8BE9A"
        />
        {/* Iran (north-east) */}
        <path
          d="M 390,0 L 520,0 L 520,180 L 440,210 L 410,185 L 370,155 L 340,140 L 335,115 L 325,95 L 370,28 L 420,35 Z"
          fill="#C4BA94"
        />
        {/* UAE + Oman (east) */}
        <path
          d="M 440,210 L 520,180 L 520,380 L 460,380 L 420,330 L 400,295 L 390,270 L 375,248 L 360,238 L 340,230 L 320,245 L 306,262 L 290,275 L 270,310 L 250,330 L 260,355 L 280,370 L 350,380 L 440,380 Z"
          fill="#C4BA94"
        />
        {/* Yemen (south) */}
        <path
          d="M 180,320 L 250,330 L 270,310 L 290,275 L 306,262 L 320,245 L 340,230 L 360,238 L 375,248 L 390,270 L 400,295 L 420,330 L 460,380 L 100,380 L 115,360 L 140,345 L 165,332 Z"
          fill="#C8BF9A"
        />
        {/* Sudan / Ethiopia (south-west) */}
        <path
          d="M 0,200 L 65,195 L 78,210 L 90,230 L 100,260 L 112,290 L 118,320 L 115,360 L 100,380 L 0,380 Z"
          fill="#C4BC98"
        />
        {/* Egypt (north-west) */}
        <path
          d="M 0,0 L 65,0 L 78,88 L 65,105 L 50,140 L 35,175 L 20,195 L 0,200 Z"
          fill="#C8BE9A"
        />

        {/* ── Red Sea (west) ── */}
        <path
          d="M 65,105 L 78,88 L 65,0 L 0,0 L 0,200 L 20,195 L 35,175 L 50,140 L 65,105 Z"
          fill="#7AB8D2"
        />
        {/* Red Sea corridor along Saudi coast */}
        <path
          d="M 65,105 L 78,88 L 78,105 L 82,125 L 88,145 L 95,168 L 104,190 L 118,215 L 132,235 L 148,260 L 155,275 L 160,295 L 165,332 L 140,345 L 115,360 L 100,380 L 0,380 L 0,200 L 35,175 L 50,140 Z"
          fill="#7AB8D2"
        />

        {/* ── Persian Gulf (east) ── */}
        <path
          d="M 340,140 L 370,155 L 410,185 L 440,210 L 420,230 L 400,220 L 380,205 L 360,195 L 340,185 L 325,175 L 315,162 L 320,148 L 325,138 Z"
          fill="#7AB8D2"
        />
        {/* Gulf of Oman */}
        <path
          d="M 420,230 L 440,210 L 520,180 L 520,280 L 500,310 L 470,340 L 440,360 L 440,380 L 350,380 L 280,370 L 260,355 L 250,330 L 290,275 L 320,245 L 340,230 L 360,238 L 390,270 L 420,310 L 445,340 L 470,330 L 490,290 L 500,260 L 490,235 L 460,215 L 440,215 Z"
          fill="#7AB8D2"
        />

        {/* ── Saudi Arabia — warm beige like Google Maps ── */}
        <path
          d="
            M 78,88
            L 78,105
            L 82,125
            L 88,145
            L 95,168
            L 104,190
            L 118,215
            L 132,235
            L 148,260
            L 155,275
            L 160,295
            L 165,332
            L 180,320
            L 210,310
            L 230,320
            L 250,330
            L 270,310
            L 290,275
            L 306,262
            L 320,245
            L 340,230
            L 360,238
            L 375,248
            L 390,270
            L 400,295
            L 390,270
            L 375,248
            L 360,238
            L 340,230
            L 325,175
            L 315,162
            L 320,148
            L 325,138
            L 325,115
            L 335,115
            L 340,140
            L 325,138
            L 320,148
            L 315,162
            L 325,175
            L 340,185
            L 360,195
            L 380,205
            L 400,220
            L 420,230
            L 410,185
            L 370,155
            L 340,140
            L 325,115
            L 335,115
            L 340,140
            Z
          "
          fill="#EDE3C0"
          stroke="#9B9060"
          strokeWidth="1.2"
        />

        {/* Cleaner Saudi Arabia path */}
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
          fill="#EDE3C0"
          stroke="#8C8455"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* ── Country labels — muted like Google Maps ── */}
        <text x="430" y="22" fontSize="11" fill="#7A7060" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">IRAN</text>
        <text x="220" y="16" fontSize="10" fill="#7A7060" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">IRAQ</text>
        <text x="55"  y="35" fontSize="9.5" fill="#7A7060" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">JORDAN</text>
        <text x="300" y="368" fontSize="10" fill="#7A7060" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">YEMEN</text>
        <text x="490" y="290" fontSize="9" fill="#7A7060" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">OMAN</text>
        <text x="468" y="220" fontSize="8.5" fill="#7A7060" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">UAE</text>
        <text x="28"  y="350" fontSize="9" fill="#7A7060" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">Sudan</text>

        {/* ── Sea labels ── */}
        <text x="28" y="225" fontSize="7.5" fill="#4A88AA" fontFamily="Arial, sans-serif" fontWeight="600" textAnchor="middle" transform="rotate(-75,28,225)">Red Sea</text>
        <text x="462" y="165" fontSize="7.5" fill="#4A88AA" fontFamily="Arial, sans-serif" fontWeight="600" textAnchor="middle" transform="rotate(72,462,165)">Persian Gulf</text>

        {/* ── City dots ── */}
        {/* Jeddah */}
        <circle cx="105" cy="200" r="3.5" fill="#5A5A70" />
        <text x="72" y="196" fontSize="11" fill="#1A1A2E" fontFamily="Arial, sans-serif" fontWeight="600">Jeddah</text>

        {/* Riyadh — small hollow circle like Google Maps */}
        <circle cx="290" cy="190" r="3" fill="white" stroke="#5A5A70" strokeWidth="2" />
        <text x="298" y="195" fontSize="11" fill="#1A1A2E" fontFamily="Arial, sans-serif" fontWeight="600">Riyadh</text>

        {/* Dubai partial */}
        <text x="476" y="175" fontSize="9" fill="#5A5060" fontFamily="Arial, sans-serif">Du...</text>

        {/* ── Main delivery pin — Google Maps style dark navy teardrop + checkmark ── */}
        {/* Pin shadow */}
        <ellipse cx="210" cy="195" rx="9" ry="3.5" fill="#000" opacity="0.15" />
        {/* Pin teardrop body */}
        <path
          d="M 210,130 C 188,130 172,146 172,168 C 172,188 195,208 210,222 C 225,208 248,188 248,168 C 248,146 232,130 210,130 Z"
          fill="#1A3B6E"
        />
        {/* Inner circle highlight */}
        <circle cx="210" cy="166" r="17" fill="#2455A8" />
        <circle cx="210" cy="166" r="13" fill="#1A3B6E" />
        {/* White checkmark */}
        <path
          d="M 201,166 L 207,173 L 220,157"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* ── Small legend box bottom-right (like screenshot) ── */}
        <rect x="390" y="340" width="118" height="32" rx="6" fill="white" opacity="0.92" />
        <path
          d="M 406,356 C 400,356 395,361 395,367 C 395,373 403,379 406,382 C 409,379 417,373 417,367 C 417,361 412,356 406,356 Z"
          fill="#1A3B6E"
          transform="scale(0.6) translate(263, 216)"
        />
        <circle cx="404" cy="354" r="3.5" fill="#2455A8" transform="scale(0.6) translate(263,216)" />
        {/* Simpler pin icon */}
        <path d="M 404,344 C 400,344 397,347 397,351 C 397,355 401,359 404,362 C 407,359 411,355 411,351 C 411,347 408,344 404,344 Z" fill="#1A3B6E" />
        <circle cx="404" cy="351" r="2.8" fill="#2455A8" />
        <path d="M 401,351 L 403,354 L 407,348" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="418" y="349" fontSize="9" fill="#333" fontFamily="Arial, sans-serif" fontWeight="600">Delivery</text>
        <text x="418" y="363" fontSize="8.5" fill="#555" fontFamily="Arial, sans-serif">All KSA regions</text>
      </svg>
    </div>
  );
}
