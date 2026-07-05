"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const PERSONAS = [
  {
    id: "HITESH" as const,
    name: "Hitesh Choudhary",
    firstName: "Hitesh",
    subtitle: "Hitesh Sir Persona",
    description: "Explains concepts from first principles. Project-first learning approach.",
    color: "oklch(0.70 0.15 50)",
    image: "/hiteshsir.webp",
  },
  {
    id: "PIYUSH" as const,
    name: "Piyush Garg",
    firstName: "Piyush",
    subtitle: "Piyush Sir Persona",
    description: "Production-ready backend architecture. Real-world engineering mindset.",
    color: "oklch(0.65 0.15 160)",
    image: "/piyushgargSir.webp",
  },
];

export type PersonaId = "HITESH" | "PIYUSH";

interface PersonaSwitcherProps {
  currentPersona: PersonaId;
  onSwitch: (personaId: PersonaId) => void;
  disabled?: boolean;
}

export function PersonaSwitcher({ currentPersona, onSwitch, disabled }: PersonaSwitcherProps) {
  const active = PERSONAS.find((p) => p.id === currentPersona) || PERSONAS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 rounded-full border border-border/80 bg-background px-2.5 py-1.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none"
        )}
      >
        <Avatar className="h-6 w-6 shrink-0 border border-border/50">
          <AvatarImage src={active.image} alt={active.name} className="object-cover" />
          <AvatarFallback 
            className="text-[8px] font-bold"
            style={{
              background: `color-mix(in oklch, ${active.color}, transparent 85%)`,
              color: active.color,
            }}
          >
            {active.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{active.firstName}</span>
        <IconChevronDown size={14} className="text-muted-foreground mr-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        sideOffset={8}
        className="w-[320px] rounded-2xl border-border/80 p-2 shadow-xl animate-in fade-in-80 zoom-in-95"
      >
        <div className="flex flex-col gap-1">
          {PERSONAS.map((persona) => {
            const isActive = currentPersona === persona.id;

            return (
              <DropdownMenuItem
                key={persona.id}
                onClick={() => onSwitch(persona.id)}
                className={cn(
                  "relative flex flex-col items-start gap-3 rounded-xl p-3 outline-none transition-all cursor-pointer",
                  isActive 
                    ? "bg-primary/5 hover:bg-primary/10" 
                    : "hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="h-10 w-10 shrink-0 border border-border/50 shadow-sm">
                    <AvatarImage src={persona.image} alt={persona.name} className="object-cover" />
                    <AvatarFallback className="bg-muted" />
                  </Avatar>
                  
                  <div className="flex flex-col flex-1 text-left">
                    <p className="text-sm font-semibold tracking-tight">{persona.name}</p>
                    <p className="text-[11px] font-medium text-muted-foreground mt-0.5">{persona.subtitle}</p>
                  </div>

                  {isActive && (
                    <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1">
                      <IconCheck size={12} className="text-primary" />
                      <span className="text-[10px] font-semibold text-primary">Current Persona</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {persona.description}
                </p>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
