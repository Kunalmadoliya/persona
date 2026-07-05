"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IconSend2 } from "@tabler/icons-react";
import { PersonaSwitcher, type PersonaId } from "./persona-switcher";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  currentPersona: PersonaId;
  onSwitchPersona: (personaId: PersonaId) => void;
  autoFocus?: boolean;
}

export function ChatInput({
  onSend,
  isLoading,
  placeholder = "Ask anything…",
  currentPersona,
  onSwitchPersona,
  autoFocus = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus when requested (e.g. after switching persona)
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus, currentPersona]); // re-run if persona changes to ensure focus

  const handleSubmit = useCallback(() => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, isLoading, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  return (
    <div className="border-t border-border px-4 py-3 md:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Mobile Persona Switcher (visible only on small screens) */}
        <div className="md:hidden mb-2 flex justify-end">
          <PersonaSwitcher currentPersona={currentPersona} onSwitch={onSwitchPersona} disabled={isLoading} />
        </div>

        <div className="flex items-end gap-2 rounded-2xl border border-border/80 bg-card/60 px-4 py-2.5 shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={placeholder}
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 py-1.5 max-h-40"
          />
          
          <div className="flex items-center gap-2 shrink-0 pb-0.5">
            {/* Desktop Persona Switcher */}
            <div className="hidden md:block">
              <PersonaSwitcher currentPersona={currentPersona} onSwitch={onSwitchPersona} disabled={isLoading} />
            </div>

            <Button
              size="icon"
              onClick={handleSubmit}
              disabled={!value.trim() || isLoading}
              className={cn(
                "shrink-0 h-9 w-9 rounded-full transition-all",
                value.trim() && !isLoading ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground"
              )}
            >
              <IconSend2 size={16} stroke={2} />
            </Button>
          </div>
        </div>
        <p className="mt-2.5 text-center text-[11px] text-muted-foreground/60 font-medium">
          Persona may produce inaccurate information. Verify important details.
        </p>
      </div>
    </div>
  );
}
