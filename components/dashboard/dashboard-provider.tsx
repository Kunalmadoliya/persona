"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface DashboardContextValue {
  // Sidebar
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;

  // Active conversation
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  // Profile sheet
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((p) => !p), []);
  const toggleMobileSidebar = useCallback(() => setMobileSidebarOpen((p) => !p), []);
  const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);

  return (
    <DashboardContext.Provider
      value={{
        sidebarOpen,
        mobileSidebarOpen,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar,
        activeConversationId,
        setActiveConversationId,
        profileOpen,
        setProfileOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
