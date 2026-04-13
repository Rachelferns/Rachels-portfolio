"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, WandSparkles } from "lucide-react";
import { useState } from "react";
import type { PromptResult, PromptTemplate } from "@/lib/prompt-engine";

const templates: PromptTemplate[] = ["Q&A", "Code Generation", "Summarization"];

const starterInputs: Record<PromptTemplate, string> = {
  "Q&A": "Explain how photosynthesis works in simple language for a school student.",
  "Code Generation": "Create a React component for a login form with validation.",
  Summarization: "Summarize a long article about the benefits and risks of artificial intelligence."
};

const promptFeatures = [
  {
    title: "Prompt Optimization",
    description: "Transforms raw user intent into a clearer and more structured prompt."
  },
  {
    title: "Template Selection",
    description: "Supports Q&A, Code Generation, and Summarization use cases."
  },
  {
    title: "Before vs After",
    description: "Shows the difference between the original input and the optimized version."
  },
  {
    title: "Output Preview",
    description: "Demonstrates how improved prompts can lead to more organized responses."
  }
] as const;

const promptTechStack = ["Next.js", "React", "Tailwind CSS", "TypeScript", "API Routes", "Prompt Logic"];

const promptLearnings = [
  "Structured prompts improve output quality by clarifying task, format, and response expectations.",
  "The interface was designed to make prompt transformation visible rather than hidden behind a single action.",
  "A side-by-side case study layout helps explain both the product idea and the final interface in one page.",
  "Template-driven interactions keep the system approachable for academic demos and evaluation."
] as const;

export function PromptEngineStudio() {
  const [template, setTemplate] = useState<PromptTemplate>("Q&A");
  const [userInput, setUserInput] = useState(starterInputs["Q&A"]);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Choose a template and optimize the prompt.");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("Optimizing prompt...");

    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userInput,
          template
        })
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Unable to optimize prompt.");
      }

      const data = (await response.json()) as PromptResult;
      setResult(data);
      setStatus("Prompt optimized successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to optimize prompt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-3 py-4 md:px-4 md:py-5 lg:px-5 lg:py-6">
      <div className="space-y-8">
        <section className="rounded-[34px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-600">
                UX Case Study
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-[2.8rem]">
                Prompt Engine System
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                A prompt engineering tool that converts rough user requests into stronger structured prompts and demonstrates the value of better prompt design through comparison and response preview.
              </p>
            </div>

            <div className="rounded-[28px] bg-violet-50 px-6 py-6 ring-1 ring-violet-100">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-600">
                Project Summary
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This system presents prompt optimization as a visible process, helping users understand how structure improves response quality.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <CaseStudySection
            title="Problem Statement"
            description="Users often write vague prompts that lead to weak AI outputs, making it difficult to understand how better instructions improve results."
          />
          <CaseStudySection
            title="Solution"
            description="Prompt Engine turns rough input into optimized prompts, compares the before and after states, and previews a more structured response."
          />
        </div>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_360px]">
          <div className="rounded-[32px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Features</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {promptFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Tech Stack</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {promptTechStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-600">
              Final Interface
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Live Prompt Optimization Tool
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              The working interface below demonstrates the final prompt optimization experience, including template selection, transformation logic, before-vs-after comparison, and output preview.
            </p>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-violet-100/80 bg-white/88 p-6 shadow-[0_20px_50px_rgba(76,29,149,0.08)] backdrop-blur md:p-7"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-600">Project 2</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-[2.7rem]">
                Prompt Engine System
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                Transform rough user ideas into optimized prompts with a clear before-vs-after comparison, template-driven structure, and improved preview output.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <MiniMetric label="Templates" value="3" />
              <MiniMetric label="Views" value="Before / After" />
              <MiniMetric label="Mode" value="Full-stack" />
            </div>
          </div>
        </motion.section>

        <div className="mx-auto flex min-h-[calc(100vh-15rem)] max-w-7xl flex-col gap-5 xl:flex-row">
          <div className="space-y-5 xl:flex-[1.2]">
            <motion.form
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              onSubmit={handleSubmit}
              className="flex h-full min-h-[680px] flex-col rounded-[34px] border border-violet-100/80 bg-white/88 p-8 shadow-[0_24px_60px_rgba(76,29,149,0.08)] backdrop-blur md:p-9"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-[20px] bg-violet-100 p-3 text-violet-700 ring-1 ring-violet-200/70">
                  <WandSparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Prompt Builder</h2>
                  <p className="text-sm leading-6 text-slate-600">Select a template and refine the request.</p>
                </div>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-violet-100 via-slate-200 to-transparent" />

              <div className="space-y-5">
                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2.5 block text-sm font-semibold text-slate-800">Template</span>
                  <select
                    value={template}
                    onChange={(event) => {
                      const nextTemplate = event.target.value as PromptTemplate;
                      setTemplate(nextTemplate);
                      setUserInput(starterInputs[nextTemplate]);
                    }}
                    className="w-full rounded-[20px] border border-slate-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50"
                  >
                    {templates.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2.5 block text-sm font-semibold text-slate-800">User Input</span>
                  <textarea
                    rows={16}
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    className="min-h-[360px] w-full rounded-[24px] border border-slate-200 bg-stone-50 px-5 py-4 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50"
                    placeholder="Enter a basic user request to optimize..."
                  />
                </label>
              </div>

              <div className="mt-auto pt-6">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <p className="rounded-[20px] bg-violet-50/70 px-4 py-3 text-sm text-slate-700 ring-1 ring-violet-100">
                    {status}
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_14px_30px_rgba(124,58,237,0.20)] transition duration-200 hover:scale-[1.01] hover:shadow-[0_18px_40px_rgba(124,58,237,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Sparkles className="h-4 w-4" />
                    {loading ? "Optimizing..." : "Generate Optimized Prompt"}
                  </button>
                </div>
              </div>
            </motion.form>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="flex min-h-[680px] flex-col gap-5 xl:flex-[1.8]"
          >
            <div className="relative flex-[1.15] overflow-hidden rounded-[36px] border border-violet-100/80 bg-white/90 p-8 shadow-[0_24px_60px_rgba(76,29,149,0.08)] backdrop-blur md:p-10">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/80 to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-[20px] bg-violet-100 p-3 text-violet-700 ring-1 ring-violet-200/70">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-600">
                      Primary Output
                    </p>
                    <h2 className="mt-2 text-[2rem] font-semibold tracking-tight text-slate-950 md:text-[2.35rem]">
                      Optimized Prompt
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      The refined prompt is the main working surface in this layout, designed to read like a real tool rather than a centered form.
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-700">
                  AI Optimization
                </span>
              </div>

              {result ? (
                <div className="mt-8">
                    <ResultPanel title="Optimized Prompt" content={result.optimizedPrompt} subtle large />
                </div>
              ) : (
                <EmptyState compact />
              )}
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_320px]">
              <div className="rounded-[34px] border border-violet-100/80 bg-slate-950 p-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-200/80">
                  Output Response
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">Model Response Preview</h3>
                <div className="mt-6">
                  <ResultPanel
                    title="Output Response"
                    content={result?.outputResponse ?? "Generate a prompt to preview the improved response here."}
                    dark
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[34px] border border-violet-100/80 bg-white/88 p-6 shadow-[0_24px_60px_rgba(76,29,149,0.08)] backdrop-blur">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">Before vs After</h3>
                  <div className="mt-4 space-y-3">
                    <ComparisonCard
                      label="Before"
                      content={result?.comparison.before ?? "Your original prompt will appear here."}
                      tone="border-rose-100 bg-rose-50/90"
                    />
                    <ComparisonCard
                      label="After"
                      content={result?.comparison.after ?? "The optimized prompt will appear here."}
                      tone="border-violet-100 bg-violet-50/90"
                    />
                  </div>
                </div>

                <div className="rounded-[34px] border border-violet-100/80 bg-white/88 p-6 shadow-[0_24px_60px_rgba(76,29,149,0.08)] backdrop-blur">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-600">
                    Guidance
                  </p>
                  <div className="mt-4 space-y-3">
                    {(result?.suggestions ?? [
                      "Choose a template to load tailored prompt-writing suggestions.",
                      "Write clear goals and expected output style.",
                      "Keep the request specific to improve response quality."
                    ]).map((tip) => (
                      <div
                        key={tip}
                        className="rounded-[20px] border border-slate-200 bg-stone-50 px-4 py-4 text-sm leading-6 text-slate-600"
                      >
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <section className="rounded-[32px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Learning & Impact</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {promptLearnings.map((item) => (
              <li key={item} className="rounded-[20px] bg-slate-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function CaseStudySection({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-[30px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">{title}</p>
      <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[26px] bg-slate-950 px-4 py-4 text-white shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
      <p className="text-[11px] uppercase tracking-[0.28em] text-violet-200/70">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function ResultPanel({
  title,
  content,
  subtle,
  large,
  dark
}: {
  title: string;
  content: string;
  subtle?: boolean;
  large?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[28px] border transition duration-200 ${
        large ? "p-7 md:p-8" : "p-5"
      } ${
        dark
          ? "border-white/10 bg-white/5"
          : ""
      } ${
        subtle
          ? "border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 shadow-[0_12px_30px_rgba(124,58,237,0.08)]"
          : !dark
            ? "border-slate-200 bg-stone-50"
            : ""
      }`}
    >
      <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${
        dark ? "text-violet-200/70" : "text-slate-500"
      }`}>
        {title}
      </p>
      <pre
        className={`mt-3 whitespace-pre-wrap ${
          large ? "text-[15px] leading-8" : "text-sm leading-7"
        } ${
          dark ? "text-slate-100" : "text-slate-700"
        } ${
          subtle ? "font-mono" : ""
        }`}
      >
        {content}
      </pre>
    </div>
  );
}

function ComparisonCard({
  label,
  content,
  tone
}: {
  label: string;
  content: string;
  tone: string;
}) {
  return (
    <div className={`rounded-[28px] border p-5 ${tone}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <pre className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{content}</pre>
    </div>
  );
}

function EmptyState({ compact }: { compact?: boolean }) {
  return (
    <div className={`rounded-[28px] border border-dashed border-violet-200 bg-violet-50/40 px-6 text-sm text-slate-500 ${
      compact ? "mt-8 py-20 text-left" : "mt-7 py-14 text-center"
    }`}>
      Run the prompt builder to generate the optimized prompt and output preview.
    </div>
  );
}
