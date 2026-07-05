"use client";

import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { Button } from "@/components/ui/button";
import {
  IconLayoutSidebarLeftExpand,
  IconUser,
  IconTrash,
} from "@tabler/icons-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PERSONA_INFO = {
  HITESH: { 
    name: "Hitesh Choudhary", 
    subtitle: "Hitesh Sir Persona",
    color: "oklch(0.70 0.15 50)", 
    image: "/hiteshsir.webp" 
  },
  PIYUSH: { 
    name: "Piyush Garg", 
    subtitle: "Piyush Sir Persona",
    color: "oklch(0.65 0.15 160)", 
    image: "/piyushgargSir.webp" 
  },
} as const;

interface ChatHeaderProps {
  persona: "HITESH" | "PIYUSH" | null;
  onClearChat?: () => void;
}

export function ChatHeader({ persona, onClearChat }: ChatHeaderProps) {
  const { sidebarOpen, toggleSidebar, setProfileOpen } = useDashboard();
  const info = persona ? PERSONA_INFO[persona] : null;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Sidebar toggle when collapsed */}
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            <IconLayoutSidebarLeftExpand size={18} stroke={1.5} />
          </Button>
        )}

        {info ? (
          <div className="flex items-center gap-3" key={persona}>
            <Avatar className="h-10 w-10 md:h-11 md:w-11 border border-border/60 shadow-sm shrink-0">
              <AvatarImage 
                src={info.image} 
                alt={info.name} 
                className="object-cover animate-fade-in"
              />
              <AvatarFallback 
                className="animate-pulse bg-muted"
              />
            </Avatar>
            <div className="flex flex-col justify-center animate-fade-in">
              <p className="text-[15px] font-semibold tracking-tight">{info.name}</p>
              <p className="text-[12px] text-muted-foreground font-medium mt-0.5">{info.subtitle}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-muted/50 border border-border/30 shrink-0" />
            <div className="flex flex-col gap-1.5">
              <div className="h-4 w-24 bg-muted/50 rounded" />
              <div className="h-3 w-16 bg-muted/50 rounded" />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {onClearChat && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearChat}
            className="text-muted-foreground hover:text-destructive h-8 w-8"
          >
            <IconTrash size={16} stroke={1.5} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setProfileOpen(true)}
          className="text-muted-foreground hover:text-foreground h-8 w-8"
        >
          <IconUser size={16} stroke={1.5} />
        </Button>
      </div>
    </header>
  );
}
