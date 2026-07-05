"use client";

import { useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  role: "USER" | "ASSISTANT";
  tokens: string;
  createdAt: string;
}

interface UseChatOptions {
  conversationId: string;
  initialMessages?: ChatMessage[];
}

export function useChat({ conversationId, initialMessages = [] }: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isLoading) return;

      setError(null);
      setIsLoading(true);

      // Optimistically add user message
      const tempUserMsg: ChatMessage = {
        id: `temp-${Date.now()}`,
        role: "USER",
        tokens: message.trim(),
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, tempUserMsg]);

      try {
        const res = await fetch(
          `/api/conversations/${conversationId}/messages`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message.trim() }),
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to send message");
        }

        const { data } = await res.json();

        // Replace temp user message and add assistant response
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== tempUserMsg.id),
          data.userMessage,
          data.assistantMessage,
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        // Remove the optimistic message on error
        setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id));
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    setMessages,
    sendMessage,
    isLoading,
    error,
    clearMessages,
  };
}
