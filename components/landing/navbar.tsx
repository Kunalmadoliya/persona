"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#personas"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Personas
          </a>
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
