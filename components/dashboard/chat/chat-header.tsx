"use client";

import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconLayoutSidebarLeftExpand,
  IconUser,
  IconTrash,
  IconDots,
} from "@tabler/icons-react";

const PERSONA_INFO = {
  HITESH: { name: "Hitesh Choudhary", initials: "HC", color: "oklch(0.70 0.15 50)" },
  PIYUSH: { name: "Piyush Garg", initials: "PG", color: "oklch(0.65 0.15 160)" },
} as const;

interface ChatHeaderProps {
  persona: "HITESH" | "PIYUSH" | null;
  onClearChat?: () => void;
}

export function ChatHeader({ persona, onClearChat }: ChatHeaderProps) {
  const { sidebarOpen, toggleSidebar, setProfileOpen } = useDashboard();
  const info = persona ? PERSONA_INFO[persona] : null;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
      <div className="flex items-center gap-3">
        {/* Sidebar toggle when collapsed */}
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground"
          >
            <IconLayoutSidebarLeftExpand size={18} stroke={1.5} />
          </Button>
        )}

        {info ? (
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold"
              style={{
                background: `color-mix(in oklch, ${info.color}, transparent 85%)`,
                color: info.color,
              }}
            >
              {info.initials}
            </div>
            <div>
              <p className="text-sm font-medium leading-none">{info.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">AI Persona</p>
            </div>
          </div>
        ) : (
          <p className="text-sm font-medium text-muted-foreground">New Chat</p>
        )}
      </div>

      <div className="flex items-center gap-1">
        {onClearChat && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClearChat}
            className="text-muted-foreground hover:text-destructive"
          >
            <IconTrash size={15} stroke={1.5} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => setProfileOpen(true)}
          className="text-muted-foreground hover:text-foreground"
        >
          <IconUser size={15} stroke={1.5} />
        </Button>
      </div>
    </header>
  );
}
