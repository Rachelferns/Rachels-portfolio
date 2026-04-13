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
        paper: "#fafaf9",
        carbon: "#0f172a",
        mint: "#14b8a6",
        ocean: "#0f766e",
        sky: "#e0f2fe",
        sand: "#fff7ed"
      },
      boxShadow: {
        panel: "0 22px 60px rgba(15, 23, 42, 0.10)"
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        floatIn: "floatIn 0.45s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
