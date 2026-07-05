"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.62 0.18 264 / 40%) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center gap-6">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
          Powered by AI conversations
        </div>

        {/* Main headline */}
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
          Learn from your favourite{" "}
          <span className="text-gradient">developers.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg font-medium text-foreground/80 sm:text-xl">
          Not tutorials. Conversations.
        </p>

        {/* Description */}
        <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
          Have real conversations with AI versions of the creators you already learn from.
          Ask questions, get mentored, and understand concepts the way they teach.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link href="/sign-in">
            <Button size="lg" className="min-w-[160px]">
              Start Chatting
            </Button>
          </Link>
          <a href="#personas">
            <Button variant="outline" size="lg" className="min-w-[160px]">
              Explore Personas
            </Button>
          </a>
        </div>
      </div>

      {/* Chat preview mockup */}
      <div className="relative z-10 mt-16 w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="glass-strong rounded-2xl p-1">
          <div className="rounded-xl bg-card/80 p-6 space-y-4">
            {/* Mock header */}
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                HC
              </div>
              <div>
                <p className="text-sm font-medium">Hitesh Choudhary</p>
                <p className="text-xs text-muted-foreground">AI Persona</p>
              </div>
            </div>

            {/* Mock messages */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-md bg-primary/15 px-4 py-2.5 text-sm max-w-[75%]">
                  How should I start learning Next.js?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-muted/50 px-4 py-2.5 text-sm max-w-[85%] leading-relaxed">
                  Dekho bhai, Next.js seekhna hai toh pehle React ke fundamentals strong karo. Phir ek chhota project bana ke dekho — that&apos;s the best way to learn. Tutorials dekhte mat raho, haath gande karo! 🚀
                </div>
              </div>
            </div>

            {/* Mock input */}
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 px-4 py-3">
              <span className="text-sm text-muted-foreground">Ask anything...</span>
              <div className="ml-auto h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
