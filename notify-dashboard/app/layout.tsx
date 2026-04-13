import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notify Dashboard",
  description: "Student notice dashboard with CRUD management, filtering, and category-based announcements."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
