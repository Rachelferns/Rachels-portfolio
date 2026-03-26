"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { emailHref } from "@/data/portfolio";

const codeLines = [
  { indent: "", color: "text-sky-300", text: "const", trailing: " build = (idea) => {" },
  { indent: "ml-6", color: "text-fuchsia-300", text: "if", trailing: ' (!idea) return "always building something better";' },
  { indent: "ml-6", color: "text-violet-200", text: "return", trailing: ' "turning ideas into impactful solutions";' },
  { indent: "", color: "text-slate-400", text: "};" },
];

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-20 sm:pt-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-8 h-64 w-64 rounded-full bg-plum/20 blur-3xl dark:bg-plum/25" />
        <div className="absolute left-[22%] top-24 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl dark:bg-fuchsia-500/[0.15]" />
        <div className="absolute right-[8%] top-20 h-72 w-72 rounded-full bg-lilac/25 blur-3xl dark:bg-violet-400/[0.12]" />
      </div>

      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <div className="relative">
            <div className="absolute -left-6 top-8 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(200,166,255,0.4),transparent_70%)] blur-2xl" />

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center rounded-full border border-white/60 bg-white/[0.65] px-4 py-2 text-sm text-ink/[0.72] shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white/[0.72]"
            >
              Developer, builder, and soft spot for thoughtful interfaces
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl dark:text-white"
            >
              Hi, I&apos;m Rachel <span className="inline-block animate-float">👋</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-ink/[0.88] sm:text-2xl dark:text-white/[0.86]"
            >
              I build things that think, adapt, and actually help.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.24 }}
              className="mt-4 max-w-xl text-base leading-7 text-ink/[0.68] dark:text-white/[0.68]"
            >
              Mostly building with AI. Occasionally debugging life.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-4 max-w-xl text-base leading-7 text-ink/[0.68] dark:text-white/[0.68]"
            >
              Smart systems, clean design, and a bit of curiosity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.38 }}
              className="mt-12 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-plum/20 transition duration-300 hover:scale-[1.05] hover:bg-plum hover:shadow-glow dark:bg-white dark:text-night dark:hover:bg-lilac"
              >
                View Projects
                <ArrowRight size={16} />
              </a>
              <a
                href={emailHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.65] bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink shadow-glass backdrop-blur-xl transition duration-300 hover:scale-[1.05] hover:border-plum/40 hover:text-plum dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-lilac/30"
              >
                Let&apos;s Connect
                <Mail size={16} />
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,rgba(139,92,246,0.32),transparent_68%)] blur-3xl" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            whileHover={{ scale: 1.02 }}
            transition={{
              y: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              scale: { duration: 0.25 },
            }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/50 bg-[#161227]/90 p-4 shadow-[0_20px_60px_rgba(87,52,165,0.28)] backdrop-blur-2xl dark:border-white/10"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),transparent_35%,rgba(56,189,248,0.12))]" />
            <div className="absolute inset-[1px] rounded-[1.9rem] border border-transparent transition duration-300 group-hover:border-violet-300/40 group-hover:shadow-[0_0_0_1px_rgba(196,181,253,0.18),0_22px_50px_rgba(76,29,149,0.3)]" />

            <div className="relative rounded-[1.5rem] border border-white/10 bg-[#0d0b16]/85 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                  build.ts
                </span>
              </div>

              <div className="mt-5 space-y-3 font-mono text-[0.95rem] leading-7">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={`${line.text}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.4 + index * 0.08 }}
                    className={`flex items-start gap-4 ${line.indent}`}
                  >
                    <span className="w-4 text-right text-white/25">{index + 1}</span>
                    <span>
                      <span className={line.color}>{line.text}</span>
                      <span className="text-white/72">{line.trailing ?? ""}</span>
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-violet-300/10 bg-white/[0.04] px-4 py-3 text-sm text-white/55">
                Building ideas into something a little more useful than they started.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
