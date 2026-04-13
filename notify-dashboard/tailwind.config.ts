import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        slate: "#0f172a",
        cloud: "#f8fafc",
        accent: "#0f766e",
        accentSoft: "#ccfbf1",
        alert: "#b91c1c",
        alertSoft: "#fee2e2",
        warning: "#f59e0b",
        ink: "#111827"
      },
      boxShadow: {
        panel: "0 20px 45px rgba(15, 23, 42, 0.08)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
