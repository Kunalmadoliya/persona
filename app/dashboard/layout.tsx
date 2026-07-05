import { onBoardUser } from "@/app/utils/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sync Clerk user to database
  await onBoardUser();

  return <DashboardShell>{children}</DashboardShell>;
}
