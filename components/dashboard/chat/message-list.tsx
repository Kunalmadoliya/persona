"use client";

import { useRef, useEffect, useState, UIEvent } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // If user is within 100px of the bottom, we consider them "near bottom"
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    setIsNearBottom(distanceToBottom <= 100);
  };

  useEffect(() => {
    // Only auto-scroll if the user is near the bottom
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isNearBottom]);

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      <div className="mx-auto w-full max-w-3xl py-6 flex-1">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            content={msg.tokens}
            personaInitials={persona ? INITIALS[persona] : "AI"}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
