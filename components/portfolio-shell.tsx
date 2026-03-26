"use client";

import { useEffect, useState } from "react";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";

type Theme = "light" | "dark";

export function PortfolioShell() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme ?? (systemDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [mounted, theme]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <div className="relative min-h-screen overflow-hidden bg-base text-ink transition-colors duration-500 dark:bg-night dark:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,166,255,0.28),transparent_62%)] blur-2xl transition duration-200"
          style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_35%),linear-gradient(180deg,rgba(244,238,255,0.75),rgba(247,241,255,1))] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,rgba(19,15,31,1),rgba(14,10,24,1))]" />
      </div>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto w-[min(1120px,92vw)]">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}
