import { DashboardShell } from "@/components/dashboard-shell";
import { getNotices } from "@/lib/notices";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const notices = await getNotices();

  return <DashboardShell initialNotices={notices} />;
}
