"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

export function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="mt-28 scroll-mt-24 sm:mt-32">
      <SectionHeading
        eyebrow="Skills"
        title="Stuff I use to make things work"
        description="The stack shifts depending on the problem, but these are the tools I reach for most."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {skillGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.08 }}
              className="rounded-[1.8rem] border border-white/60 bg-white/[0.68] p-6 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]"
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-plum/10 text-plum dark:bg-lilac/10 dark:text-lilac">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink dark:text-white">
                  {group.title}
                </h3>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {group.items.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.08 + index * 0.04 }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full border border-white/70 bg-white/[0.86] px-4 py-2 text-sm font-medium text-ink shadow-sm transition dark:border-white/10 dark:bg-white/10 dark:text-white/[0.78]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
