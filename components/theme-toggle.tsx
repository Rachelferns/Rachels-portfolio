"use client";

import { MoonStar, SunMedium } from "lucide-react";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.55] bg-white/60 text-ink shadow-glass backdrop-blur-xl transition duration-300 hover:scale-105 hover:shadow-glow dark:border-white/10 dark:bg-white/10 dark:text-white"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
    </button>
  );
}
