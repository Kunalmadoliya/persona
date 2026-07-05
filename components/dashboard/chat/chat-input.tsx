"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IconSend2 } from "@tabler/icons-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  isLoading,
  placeholder = "Ask anything…",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        <div className="flex items-end gap-2 rounded-xl border border-border bg-card/50 px-4 py-2 focus-within:ring-1 focus-within:ring-ring transition-shadow">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={placeholder}
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 py-1.5 max-h-40"
          />
          <Button
            size="icon-xs"
            onClick={handleSubmit}
            disabled={!value.trim() || isLoading}
            className="shrink-0 mb-0.5"
          >
            <IconSend2 size={14} stroke={2} />
          </Button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground/60">
          Persona may produce inaccurate information. Verify important details.
        </p>
      </div>
    </div>
  );
}
