import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#f7f1ff",
        ink: "#1f1633",
        lilac: "#c8a6ff",
        plum: "#8b5cf6",
        haze: "#efe4ff",
        night: "#130f1f"
      },
      fontFamily: {
        display: ["Sora", "Avenir Next", "Segoe UI", "sans-serif"],
        body: ["Manrope", "Inter", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        glass: "0 12px 40px rgba(113, 74, 182, 0.14)",
        glow: "0 0 0 1px rgba(200, 166, 255, 0.5), 0 18px 40px rgba(139, 92, 246, 0.2)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.95" }
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 7s ease-in-out infinite",
        gradientShift: "gradientShift 16s ease infinite"
      }
    }
  },
  plugins: []
};

export default config;
