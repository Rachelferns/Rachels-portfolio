"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { projects } from "@/data/portfolio";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ProjectsSection() {
  return (
    <AnimatedSection id="projects" className="mt-28 scroll-mt-24 sm:mt-32">
      <SectionHeading
        eyebrow="Selected Work"
        title="Things I’ve Built (and Actually Like)"
        description="A few projects where AI, product thinking, and interface design had to play nicely together."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.title}
              variants={item}
              whileHover={{ y: -10, scale: 1.025 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group relative overflow-hidden rounded-[1.9rem] border border-white/60 bg-white/[0.68] p-6 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 transition duration-500 group-hover:opacity-100`}
              />
              <div className="absolute inset-[1px] rounded-[1.8rem] border border-transparent transition duration-500 group-hover:border-lilac/[0.65] group-hover:shadow-glow" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/85 text-plum shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-lilac">
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full border border-plum/[0.15] bg-plum/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-plum dark:border-lilac/20 dark:bg-lilac/10 dark:text-lilac">
                    Featured
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold text-ink dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-plum dark:text-lilac">{project.tagline}</p>
                <p className="mt-4 text-sm leading-7 text-ink/[0.72] dark:text-white/[0.68]">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.65] bg-white/80 px-3 py-1.5 text-xs font-medium text-ink/[0.72] dark:border-white/10 dark:bg-white/10 dark:text-white/[0.72]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-plum/20 transition duration-300 hover:scale-[1.05] hover:bg-plum hover:shadow-glow dark:bg-white dark:text-night dark:hover:bg-lilac"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </AnimatedSection>
  );
}
