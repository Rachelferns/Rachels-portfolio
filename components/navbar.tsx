"use client";

import { motion } from "framer-motion";
import { navItems } from "@/data/portfolio";
import { ThemeToggle } from "@/components/theme-toggle";

type Theme = "light" | "dark";

type NavbarProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      className="sticky top-4 z-50 mx-auto flex w-[min(1120px,92vw)] items-center justify-between rounded-full border border-white/50 bg-white/[0.55] px-3 py-3 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]"
    >
      <a
        href="#home"
        className="rounded-full px-4 py-2 font-display text-sm font-semibold tracking-[0.08em] text-ink transition hover:text-plum dark:text-white"
      >
        Rachel
      </a>

      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group rounded-full px-4 py-2 text-sm text-ink/[0.72] transition duration-300 hover:bg-white/60 hover:text-plum dark:text-white/[0.72] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <span className="relative">
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-transparent bg-ink px-4 py-2 text-sm font-medium text-white transition duration-300 hover:scale-[1.03] hover:bg-plum md:inline-flex dark:bg-white dark:text-night dark:hover:bg-lilac"
        >
          Resume
        </a>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </motion.header>
  );
}
