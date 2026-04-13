"use client";

import { Bell, LayoutDashboard, Megaphone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Notice, NoticeCategory } from "@/lib/notices";

type NoticeFormState = {
  title: string;
  content: string;
  category: NoticeCategory;
  audience: string;
  urgent: boolean;
};

const initialForm: NoticeFormState = {
  title: "",
  content: "",
  category: "Event",
  audience: "",
  urgent: false
};

const categoryOptions: Array<NoticeCategory | "All"> = ["All", "Exam", "Event", "Urgent"];
const notifyFeatures = [
  {
    title: "Search & Filter",
    description: "Students can quickly locate notices by keyword and narrow results by category."
  },
  {
    title: "Admin CRUD",
    description: "Administrators can publish, edit, and remove notices from one dashboard flow."
  },
  {
    title: "Urgent Highlighting",
    description: "Priority updates are surfaced visually so time-sensitive notices are not missed."
  },
  {
    title: "Structured Feed",
    description: "Announcements are organized into a readable campus communication interface."
  }
] as const;

const notifyTechStack = ["Next.js", "React", "Tailwind CSS", "TypeScript", "Route Handlers", "JSON Store"];

const notifyLearnings = [
  "Designed for clarity first by separating urgent notices, regular updates, and management actions.",
  "Balanced admin usability with a student-facing reading experience in the same system.",
  "Used category filters and visual tags to reduce notice overload and improve scanability.",
  "Kept the architecture simple enough for academic review while still demonstrating full-stack thinking."
] as const;

export function DashboardShell({ initialNotices }: { initialNotices: Notice[] }) {
  const [notices, setNotices] = useState(initialNotices);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | "All">("All");
  const [adminKey, setAdminKey] = useState("");
  const [form, setForm] = useState<NoticeFormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("Dashboard ready.");
  const [busy, setBusy] = useState(false);

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesCategory =
        selectedCategory === "All" ? true : notice.category === selectedCategory;
      const matchesQuery = [notice.title, notice.content, notice.audience]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [notices, query, selectedCategory]);

  const stats = useMemo(() => {
    return {
      total: notices.length,
      urgent: notices.filter((notice) => notice.urgent).length,
      exams: notices.filter((notice) => notice.category === "Exam").length
    };
  }, [notices]);

  async function refreshNotices() {
    const response = await fetch("/api/notices", { cache: "no-store" });
    const data = (await response.json()) as { notices: Notice[] };
    setNotices(data.notices);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(editingId ? "Updating notice..." : "Publishing notice...");

    try {
      const response = await fetch(editingId ? `/api/notices/${editingId}` : "/api/notices", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey
        },
        body: JSON.stringify({
          ...form,
          urgent: form.urgent || form.category === "Urgent"
        })
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Unable to save notice.");
      }

      await refreshNotices();
      setForm(initialForm);
      setEditingId(null);
      setStatus(editingId ? "Notice updated successfully." : "Notice published successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save notice.");
    } finally {
      setBusy(false);
    }
  }

  function startEditing(notice: Notice) {
    setEditingId(notice.id);
    setForm({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      audience: notice.audience,
      urgent: notice.urgent
    });
    setStatus(`Editing "${notice.title}".`);
  }

  async function handleDelete(id: string) {
    setBusy(true);
    setStatus("Deleting notice...");

    try {
      const response = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey
        }
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Unable to delete notice.");
      }

      await refreshNotices();
      if (editingId === id) {
        setEditingId(null);
        setForm(initialForm);
      }
      setStatus("Notice deleted successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to delete notice.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen px-3 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <div className="mx-auto max-w-screen-2xl space-y-8">
        <section className="rounded-[34px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-600">
                UX Case Study
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-[2.8rem]">
                Notify Dashboard
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                A student notice dashboard designed to centralize academic communication, reduce missed updates, and provide a clear admin workflow for campus announcements.
              </p>
            </div>

            <div className="rounded-[28px] bg-violet-50 px-6 py-6 ring-1 ring-violet-100">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-600">
                Project Summary
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This system turns scattered institutional communication into one searchable interface with visible priority states and simple notice management.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <CaseStudySection
            title="Problem Statement"
            description="Students often miss important academic notices because updates are spread across chat groups, physical boards, and disconnected portals."
          />
          <CaseStudySection
            title="Solution"
            description="Notify provides a centralized dashboard where administrators manage notices and students consume updates through searchable, category-based views."
          />
        </div>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_360px]">
          <div className="rounded-[32px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Features</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {notifyFeatures.map((feature) => (
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
              {notifyTechStack.map((item) => (
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
              Live Dashboard Preview
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              The working interface below demonstrates the final student notice system with full CRUD support, notice visibility, category states, and priority alerts.
            </p>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[32px] border border-slate-800/80 bg-[#171326] px-6 py-7 text-white shadow-[0_24px_70px_rgba(17,24,39,0.28)]">
          <div className="flex items-center gap-3">
            <div className="rounded-[20px] bg-white/10 p-3 ring-1 ring-white/10">
              <Bell className="h-6 w-6 text-violet-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-violet-200/70">Project 1</p>
              <h1 className="text-2xl font-semibold tracking-tight text-white">Notify</h1>
            </div>
          </div>

          <div className="mt-10 space-y-4 text-sm text-slate-200">
            <div className="rounded-[24px] bg-white/8 p-4 ring-1 ring-white/10">
              <p className="font-medium text-white">Admin access key</p>
              <input
                value={adminKey}
                onChange={(event) => setAdminKey(event.target.value)}
                placeholder="Enter key for CRUD actions"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 transition focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300/20"
              />
            </div>

            <div className="rounded-[24px] bg-white/8 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-4 w-4 text-violet-200" />
                <span className="font-medium">Submission Checklist</span>
              </div>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>CRUD-ready notice management</li>
                <li>Responsive student-facing board</li>
                <li>Search, filters, urgent highlighting</li>
                <li>CI-ready build workflow included</li>
              </ul>
            </div>

            <nav className="rounded-[24px] bg-white/8 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-white">
                <LayoutDashboard className="h-4 w-4 text-violet-200" />
                <span className="font-medium">Sections</span>
              </div>
              <div className="mt-3 space-y-2 text-slate-300">
                <p className="rounded-2xl border border-violet-300/20 bg-violet-300/12 px-3 py-2 text-sm font-medium text-violet-100">
                  Overview
                </p>
                <p className="rounded-2xl px-3 py-2 transition hover:bg-white/6 hover:text-white">
                  Notice Manager
                </p>
                <p className="rounded-2xl px-3 py-2 transition hover:bg-white/6 hover:text-white">
                  Student Feed
                </p>
              </div>
            </nav>
          </div>
        </aside>

        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-violet-100/80 bg-white/90 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] backdrop-blur md:p-7"
          >
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-600">
                  Student Notice Dashboard
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.15rem]">
                  Campus communication, organized
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
                  Built for academic submission with a clean admin workflow and a polished student-facing feed.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <StatCard label="Total Notices" value={stats.total} tone="bg-slate text-white" />
                <StatCard label="Urgent Alerts" value={stats.urgent} tone="bg-rose-50 text-rose-700 ring-1 ring-rose-100" />
                <StatCard label="Exam Updates" value={stats.exams} tone="bg-amber-50 text-amber-800 ring-1 ring-amber-100" />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.55fr)_360px]">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 }}
                className="rounded-[34px] border border-violet-100 bg-white p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-violet-700">
                        Main Notice
                      </span>
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-rose-700">
                        Priority Update
                      </span>
                    </div>

                    {filteredNotices[0] ? (
                      <div className="mt-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
                          {filteredNotices[0].category}
                        </p>
                        <h3 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 md:text-[2.75rem] md:leading-[1.1]">
                          {filteredNotices[0].title}
                        </h3>
                        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
                          {filteredNotices[0].content}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-5">
                        <h3 className="text-3xl font-semibold tracking-tight text-slate-950">
                          No notice selected
                        </h3>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                          Use the filters below to surface key updates for students.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid min-w-[260px] gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    <div className="rounded-[26px] bg-slate-950 px-5 py-5 text-white shadow-[0_16px_36px_rgba(15,23,42,0.2)]">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-violet-200/80">Audience</p>
                      <p className="mt-3 text-lg font-semibold">
                        {filteredNotices[0]?.audience ?? "All Students"}
                      </p>
                    </div>
                    <div className="rounded-[26px] bg-violet-50 px-5 py-5 ring-1 ring-violet-100">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-violet-600">Published</p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {filteredNotices[0]
                          ? new Date(filteredNotices[0].publishedAt).toLocaleDateString()
                          : "No date"}
                      </p>
                    </div>
                    <div className="rounded-[26px] bg-amber-50 px-5 py-5 ring-1 ring-amber-100">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-amber-700">Current Filter</p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">{selectedCategory}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="rounded-[32px] border border-violet-100 bg-white p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-7"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Student Notice Feed</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Search live notices, filter by category, and review the latest institutional updates.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[minmax(260px,1fr)_220px]">
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50"
                      placeholder="Search notices..."
                    />
                    <select
                      value={selectedCategory}
                      onChange={(event) =>
                        setSelectedCategory(event.target.value as NoticeCategory | "All")
                      }
                      className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50"
                    >
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredNotices.length > 0 ? (
                  <div className="mt-8 grid gap-5 lg:grid-cols-2">
                    {filteredNotices.slice(1).map((notice) => (
                      <article
                        key={notice.id}
                        className={`rounded-[30px] border p-6 transition duration-200 hover:scale-[1.01] hover:shadow-[0_18px_45px_rgba(76,29,149,0.12)] ${
                          notice.urgent
                            ? "border-rose-200 bg-gradient-to-r from-rose-50 to-white shadow-[0_12px_34px_rgba(244,63,94,0.08)]"
                            : "border-slate-200 bg-slate-50/85 shadow-[0_12px_34px_rgba(15,23,42,0.05)]"
                        }`}
                      >
                        <div className="flex h-full flex-col justify-between gap-6">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${
                                notice.category === "Exam"
                                  ? "bg-amber-100 text-amber-800"
                                  : notice.category === "Urgent"
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-violet-100 text-violet-700"
                              }`}>
                                {notice.category}
                              </span>
                              {notice.urgent ? (
                                <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-700">
                                  Urgent
                                </span>
                              ) : null}
                            </div>
                            <div className={`mt-4 ${notice.urgent ? "border-l-4 border-rose-300 pl-4" : ""}`}>
                              <h4 className="text-[1.35rem] font-semibold tracking-tight text-slate-900">
                                {notice.title}
                              </h4>
                              <p className="mt-3 text-sm leading-7 text-slate-600">{notice.content}</p>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                              <span>{notice.audience}</span>
                              <span>{new Date(notice.publishedAt).toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => startEditing(notice)}
                              className="rounded-[18px] border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(notice.id)}
                              className="rounded-[18px] bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-8 rounded-[30px] border border-dashed border-violet-200 bg-violet-50/40 px-6 py-14 text-center text-sm text-slate-500">
                    No notices match the current search and filter combination.
                  </div>
                )}
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.form
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="rounded-[32px] border border-violet-100 bg-white p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-7"
              >
                <div className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-violet-600" />
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {editingId ? "Edit Notice" : "Create Notice"}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Publish new announcements with a clear category, audience, and urgency level.
                </p>

                <div className="my-6 h-px bg-gradient-to-r from-violet-100 via-slate-200 to-transparent" />

                <div className="space-y-5">
                  <Field label="Title">
                    <input
                      required
                      value={form.title}
                      onChange={(event) => setForm({ ...form, title: event.target.value })}
                      className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50"
                      placeholder="Enter a clear notice title"
                    />
                  </Field>

                  <Field label="Audience">
                    <input
                      required
                      value={form.audience}
                      onChange={(event) => setForm({ ...form, audience: event.target.value })}
                      className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50"
                      placeholder="Example: First Year Students"
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Category">
                      <select
                        value={form.category}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            category: event.target.value as NoticeCategory,
                            urgent: event.target.value === "Urgent" ? true : form.urgent
                          })
                        }
                        className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50"
                      >
                        <option value="Exam">Exam</option>
                        <option value="Event">Event</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </Field>

                    <label className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={form.urgent || form.category === "Urgent"}
                        onChange={(event) => setForm({ ...form, urgent: event.target.checked })}
                      />
                      Highlight as urgent
                    </label>
                  </div>

                  <Field label="Content">
                    <textarea
                      required
                      rows={6}
                      value={form.content}
                      onChange={(event) => setForm({ ...form, content: event.target.value })}
                      className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50"
                      placeholder="Write the announcement details here..."
                    />
                  </Field>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={busy}
                    className="rounded-[20px] bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(124,58,237,0.22)] transition duration-200 hover:scale-[1.01] hover:shadow-[0_16px_36px_rgba(124,58,237,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {busy ? "Please wait..." : editingId ? "Update Notice" : "Publish Notice"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(initialForm);
                      setStatus("Form reset.");
                    }}
                    className="rounded-[20px] border border-violet-200 px-5 py-3 text-sm font-medium text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
                  >
                    Clear Form
                  </button>
                </div>

                <p className="mt-5 rounded-[20px] bg-violet-50/70 px-4 py-3 text-sm text-slate-700 ring-1 ring-violet-100">
                  {status}
                </p>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="rounded-[32px] border border-violet-100 bg-[#141126] p-6 text-white shadow-[0_22px_60px_rgba(17,24,39,0.24)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-violet-700">
                    Event Highlight
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
                    Secondary Card
                  </span>
                </div>
                <h3 className="mt-6 text-[1.9rem] font-semibold tracking-tight text-white">
                  Campus update spotlight
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Use this panel as a supporting announcement space for workshops, deadlines, or department-level updates that deserve persistent visibility.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] bg-white/6 px-4 py-4 ring-1 ring-white/10">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-violet-200/80">Upcoming</p>
                    <p className="mt-2 text-lg font-semibold">Research Seminar</p>
                  </div>
                  <div className="rounded-[22px] bg-white/6 px-4 py-4 ring-1 ring-white/10">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-violet-200/80">Format</p>
                    <p className="mt-2 text-lg font-semibold">Hybrid Session</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

        <section className="rounded-[32px] border border-violet-100/80 bg-white/92 p-6 shadow-[0_22px_60px_rgba(76,29,149,0.08)] md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Learning & Impact</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {notifyLearnings.map((item) => (
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-slate-800">
      <span className="mb-2.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}

function StatCard({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className={`min-w-[138px] rounded-[26px] px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] ${tone}`}>
      <p className="text-[11px] uppercase tracking-[0.28em] opacity-75">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
