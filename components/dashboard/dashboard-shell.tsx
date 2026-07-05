"use client";

import { DashboardProvider } from "./dashboard-provider";
import { Sidebar } from "./sidebar/sidebar";
import { ProfileSheet } from "./profile/profile-sheet";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {children}
        </main>

        {/* Profile sheet overlay */}
        <ProfileSheet />
      </div>
    </DashboardProvider>
  );
}
