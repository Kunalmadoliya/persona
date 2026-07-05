"use client";

import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import type { ChatMessage } from "@/app/hooks";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  persona: "HITESH" | "PIYUSH" | null;
}

const INITIALS: Record<string, string> = {
  HITESH: "HC",
  PIYUSH: "PG",
};

export function MessageList({ messages, isLoading, persona }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto max-w-3xl py-6">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            content={msg.tokens}
            personaInitials={persona ? INITIALS[persona] : "AI"}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
