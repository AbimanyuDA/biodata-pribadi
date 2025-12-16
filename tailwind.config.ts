import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: "#111112",
        },
        accent: {
          DEFAULT: "#2563eb", // subtle blue accent
        },
      },
      borderRadius: {
        soft: "1rem",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
        poppins: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,0.12)",
      },
      keyframes: {
        grain: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-100%, -100%)" },
        },
      },
      animation: {
        grain: "grain 8s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

export default config;
