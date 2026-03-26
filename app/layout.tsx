import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rachel Fernandes | AI/ML Developer Portfolio",
  description:
    "Portfolio of Rachel Fernandes, a developer building thoughtful AI systems, recommendation experiences, and polished interfaces.",
  keywords: [
    "Rachel Fernandes",
    "Portfolio",
    "Next.js",
    "AI",
    "ML",
    "Developer",
    "Framer Motion",
  ],
  openGraph: {
    title: "Rachel Fernandes | AI/ML Developer Portfolio",
    description:
      "Thoughtful AI systems, design-aware interfaces, and projects that try to be genuinely useful.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
