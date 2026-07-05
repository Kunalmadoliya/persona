export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-6 py-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-[10px] font-bold text-muted-foreground">
        AI
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted/30 px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-pulse-soft" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-pulse-soft" style={{ animationDelay: "200ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-pulse-soft" style={{ animationDelay: "400ms" }} />
      </div>
    </div>
  );
}
