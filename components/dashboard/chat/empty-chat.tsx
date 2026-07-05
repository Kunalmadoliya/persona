"use client";

import { cn } from "@/lib/utils";
import { IconMessageChatbot, IconSparkles } from "@tabler/icons-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface EmptyChatProps {
  onSelectPersona: (persona: "HITESH" | "PIYUSH") => void;
}

const PERSONAS = [
  {
    persona: "HITESH" as const,
    name: "Hitesh Choudhary",
    subtitle: "Hitesh Sir Persona",
    description: "Learn fundamentals through analogies, projects and practical thinking.",
    color: "oklch(0.70 0.15 50)",
    image: "/hiteshsir.webp",
  },
  {
    persona: "PIYUSH" as const,
    name: "Piyush Garg",
    subtitle: "Piyush Sir Persona",
    description: "Learn scalable backend systems, architecture and production engineering.",
    color: "oklch(0.65 0.15 160)",
    image: "/piyushgargSir.webp",
  },
];

export function EmptyChat({ onSelectPersona }: EmptyChatProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10 md:py-16 overflow-y-auto min-h-0">
      <div className="w-full max-w-[800px] space-y-10 animate-fade-in my-auto">
        {/* Welcome */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-6">
            <IconSparkles size={28} className="text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">
            Start a conversation
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
            Choose a mentor and ask anything. Learn the way they teach — through conversations, not lectures.
          </p>
        </div>

        {/* Premium Persona Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {PERSONAS.map((p) => (
            <div
              key={p.persona}
              className={cn(
                "group relative flex flex-col items-center text-center rounded-3xl border border-border/80 bg-card/40 p-8 md:p-10 transition-all duration-500",
                "hover:bg-card/70 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 overflow-hidden"
              )}
            >
              {/* Glass subtle gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center 0%, color-mix(in oklch, ${p.color}, transparent 80%), transparent 70%)`
                }}
              />

              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-border/50 shadow-md shrink-0 transition-transform duration-500 group-hover:scale-105 mb-5 relative z-10">
                <AvatarImage 
                  src={p.image} 
                  alt={p.name} 
                  className="object-cover"
                />
                <AvatarFallback 
                  className="text-lg font-bold"
                  style={{
                    background: `color-mix(in oklch, ${p.color}, transparent 85%)`,
                    color: p.color,
                  }}
                >
                  {p.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col items-center relative z-10 mb-6">
                <p className="text-lg font-semibold tracking-tight">{p.name}</p>
                <p className="text-xs font-medium text-muted-foreground mt-1 mb-3">{p.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                  {p.description}
                </p>
              </div>

              <Button
                onClick={() => onSelectPersona(p.persona)}
                variant="outline"
                className="w-full relative z-10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
              >
                Start Chat
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
