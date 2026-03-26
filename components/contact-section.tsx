"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Sparkles } from "lucide-react";
import { contactLinks, emailHref, socialLinks } from "@/data/portfolio";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

export function ContactSection() {
  return (
    <AnimatedSection id="contact" className="mt-28 scroll-mt-24 pb-24 sm:mt-32">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/60 bg-white/[0.68] p-8 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08] sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,166,255,0.32),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.16),transparent_28%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s build something cool"
              description="I’m always up for interesting projects, ideas, or just talking about tech."
            />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={emailHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-plum/20 transition duration-300 hover:scale-[1.05] hover:bg-plum hover:shadow-glow dark:bg-white dark:text-night dark:hover:bg-lilac"
              >
                Start a conversation
                <Sparkles size={16} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.65] bg-white/75 px-6 py-3.5 text-sm font-semibold text-ink transition duration-300 hover:scale-[1.03] hover:border-plum/[0.35] hover:text-plum dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                View Resume
                <Download size={16} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon =
                  link.label === "GitHub"
                    ? Github
                    : link.label === "LinkedIn"
                      ? Linkedin
                      : ArrowUpRight;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.65] bg-white/[0.82] px-4 py-2.5 text-sm font-medium text-ink transition duration-300 hover:border-plum/[0.35] hover:text-plum hover:shadow-glow dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-lilac/30 dark:hover:text-lilac"
                  >
                    <Icon size={16} />
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center justify-between rounded-[1.45rem] border border-white/[0.65] bg-white/[0.82] px-5 py-4 shadow-sm transition dark:border-white/10 dark:bg-white/10"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-plum/[0.65] dark:text-lilac/70">
                    {link.label}
                  </p>
                  <p className="mt-2 text-base font-medium text-ink dark:text-white">{link.value}</p>
                </div>
                <ArrowUpRight className="text-plum dark:text-lilac" size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
