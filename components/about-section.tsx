"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { quickFacts } from "@/data/portfolio";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="mt-28 scroll-mt-24 sm:mt-32">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="relative mx-auto max-w-md"
        >
          <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-lilac/[0.45] via-white/20 to-plum/25 blur-xl dark:from-plum/[0.18] dark:to-lilac/[0.12]" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.55] bg-white/60 p-3 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]">
            <div className="overflow-hidden rounded-[1.5rem]">
              <Image
                src="/profile.jpg"
                alt="Rachel Fernandes"
                width={3299}
                height={4398}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
        >
          <SectionHeading eyebrow="About Me" title="More builder, less buzzword machine" />
          <div className="mt-6 space-y-5 text-lg leading-8 text-ink/[0.74] dark:text-white/[0.72]">
            <p>
              I&apos;m a Computer Science student who enjoys building systems that actually <em>do</em>
              something, especially when AI is involved.
            </p>
            <p>
              I like working on problems where logic meets creativity, whether it&apos;s designing
              multi-LLM systems, building recommendation engines, or making interfaces that don&apos;t
              feel painful to use.
            </p>
            <p>
              I tend to learn by building, breaking things, and then fixing them better. Over time,
              that&apos;s helped me get comfortable with both backend systems and user-facing design.
            </p>
            <p>
              Right now, I&apos;m focused on creating projects that are not just functional, but
              actually useful.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="rounded-3xl border border-white/60 bg-white/[0.65] p-4 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]"
                >
                  <Icon className="h-5 w-5 text-plum dark:text-lilac" />
                  <p className="mt-3 text-sm leading-6 text-ink/70 dark:text-white/[0.68]">{fact.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
