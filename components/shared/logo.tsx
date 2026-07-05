import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "compact";
  className?: string;
}

export function Logo({ variant = "full", className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 select-none", className)}>
      {/* Icon mark */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z" />
          <path d="M17 10c.7 0 1.37.2 1.94.56" />
          <path d="M6 10a3 3 0 0 0-1.94.56" />
          <path d="M12 18v4" />
          <path d="M8 22h8" />
        </svg>
      </div>

      {/* Wordmark */}
      {variant === "full" && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          Persona
        </span>
      )}
    </Link>
  );
}
