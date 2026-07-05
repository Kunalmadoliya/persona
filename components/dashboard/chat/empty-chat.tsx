"use client";

import { cn } from "@/lib/utils";
import {
  IconMessageChatbot,
  IconBulb,
  IconSparkles,
  IconCode,
} from "@tabler/icons-react";

interface EmptyChatProps {
  onSelectPersona: (persona: "HITESH" | "PIYUSH") => void;
  onSendPrompt: (prompt: string, persona: "HITESH" | "PIYUSH") => void;
}

const SUGGESTIONS = [
  {
    text: "How should I structure a full-stack project?",
    persona: "HITESH" as const,
  },
  {
    text: "Explain Docker to me like I'm a beginner",
    persona: "HITESH" as const,
  },
  {
    text: "How do I design a scalable REST API?",
    persona: "PIYUSH" as const,
  },
  {
    text: "What's the best way to learn system design?",
    persona: "PIYUSH" as const,
  },
];

export function EmptyChat({ onSelectPersona, onSendPrompt }: EmptyChatProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6 animate-fade-in">
        {/* Welcome */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <IconSparkles size={24} className="text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            Start a conversation
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Choose a mentor and ask anything. Learn the way they teach — through conversations, not lectures.
          </p>
        </div>

        {/* Persona selector */}
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                persona: "HITESH" as const,
                name: "Hitesh Choudhary",
                initials: "HC",
                desc: "Full stack, Hinglish, project-based",
                color: "oklch(0.70 0.15 50)",
              },
              {
                persona: "PIYUSH" as const,
                name: "Piyush Garg",
                initials: "PG",
                desc: "Backend, System Design, production-ready",
                color: "oklch(0.65 0.15 160)",
              },
            ] as const
          ).map((p) => (
            <button
              key={p.persona}
              onClick={() => onSelectPersona(p.persona)}
              className={cn(
                "group flex items-center gap-3 rounded-xl border border-border bg-card/30 p-4 text-left transition-all duration-200",
                "hover:bg-card/60 hover:border-border/80 hover:-translate-y-0.5"
              )}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                style={{
                  background: `color-mix(in oklch, ${p.color}, transparent 85%)`,
                  color: p.color,
                }}
              >
                {p.initials}
              </div>
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{p.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Suggested prompts */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 text-center">
            Try asking
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.text}
                onClick={() => onSendPrompt(s.text, s.persona)}
                className={cn(
                  "flex items-start gap-2.5 rounded-xl border border-border bg-card/20 px-4 py-3 text-left text-[13px] transition-all duration-200",
                  "hover:bg-card/50 hover:border-border/80"
                )}
              >
                <IconBulb size={14} className="shrink-0 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-foreground/90">{s.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {s.persona === "HITESH" ? "Hitesh Choudhary" : "Piyush Garg"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
