import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1A1A1A",
          cream: "#F5F3EF",
          ivory: "#FAFAF8",
          gold: "#C9A45C",
          champagne: "#E8DCC8",
          espresso: "#1A1A1A",
          slate: "#4A4A4A",
          border: "#E5E0D8",
          accent: "#8B6914",
        },
        status: {
          success: "#2F7D4F",
          warning: "#B7791F",
          error: "#B42318",
        },
      },
      fontFamily: {
        arabic: ["var(--font-noto-kufi)", "var(--font-tajawal)", "sans-serif"],
        body: ["var(--font-tajawal)", "var(--font-noto-kufi)", "sans-serif"],
        latin: ["var(--font-cormorant)", "serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        offer: "20px",
      },
      animation: {
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        slideInLeft: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
