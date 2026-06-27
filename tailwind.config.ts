import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EF233C",
          dark: "#D90429",
          light: "#FF4D6D",
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#EF233C",
          600: "#D90429",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        volt: {
          DEFAULT: "#D4FF00",
          dark: "#B8E600",
          light: "#E4FF4D",
        },
        ink: {
          DEFAULT: "#0B0B0F",
          50: "#F5F5F7",
          100: "#E5E5EA",
          200: "#C7C7CC",
          300: "#8A8A93",
          400: "#636366",
          500: "#48484A",
          600: "#3A3A3C",
          700: "#2C2C2E",
          800: "#1C1C1E",
          900: "#0B0B0F",
        },
        smoke: "#F5F5F7",
      },
      fontFamily: {
        display: ["var(--font-anton)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2s infinite linear",
        float: "float 5s ease-in-out infinite",
        "bounce-in": "bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
