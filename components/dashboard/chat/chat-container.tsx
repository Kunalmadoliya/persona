"use client";

import { useEffect, useCallback } from "react";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { useChat, useCreateConversation } from "@/app/hooks";
import type { ChatMessage } from "@/app/hooks";
import { ChatHeader } from "./chat-header";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { EmptyChat } from "./empty-chat";
import { MessageSkeleton } from "@/components/shared/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function ChatContainer() {
  const { activeConversationId, setActiveConversationId } = useDashboard();
  const createConversation = useCreateConversation();
  const queryClient = useQueryClient();

  // Fetch conversation details when active
  const { data: conversationData, isLoading: isLoadingConversation } = useQuery({
    queryKey: ["conversation", activeConversationId],
    queryFn: async () => {
      if (!activeConversationId) return null;
      const res = await fetch(`/api/conversations/${activeConversationId}`);
      if (!res.ok) throw new Error("Failed to fetch conversation");
      const { data } = await res.json();
      return data;
    },
    enabled: !!activeConversationId,
  });

  const persona = conversationData?.persona ?? null;

  const {
    messages,
    setMessages,
    sendMessage,
    isLoading: isSending,
    error,
    clearMessages,
  } = useChat({
    conversationId: activeConversationId || "",
    initialMessages: [],
  });

  // Load messages when conversation data arrives
  useEffect(() => {
    if (conversationData?.chatMessages) {
      setMessages(conversationData.chatMessages);
    }
  }, [conversationData, setMessages]);

  const handleSelectPersona = useCallback(
    async (selectedPersona: "HITESH" | "PIYUSH") => {
      const newConv = await createConversation.mutateAsync(selectedPersona);
      setActiveConversationId(newConv.id);
    },
    [createConversation, setActiveConversationId]
  );

  const handleSendPrompt = useCallback(
    async (prompt: string, selectedPersona: "HITESH" | "PIYUSH") => {
      const newConv = await createConversation.mutateAsync(selectedPersona);
      setActiveConversationId(newConv.id);
      // Small delay to ensure state updates propagate
      setTimeout(() => {
        sendMessage(prompt);
      }, 100);
    },
    [createConversation, setActiveConversationId, sendMessage]
  );

  const handleSend = useCallback(
    (message: string) => {
      sendMessage(message);
      // Invalidate conversations list so sidebar updates
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    [sendMessage, queryClient]
  );

  const handleClearChat = useCallback(() => {
    clearMessages();
    setActiveConversationId(null);
  }, [clearMessages, setActiveConversationId]);

  // No active conversation — show empty state
  if (!activeConversationId) {
    return (
      <div className="flex flex-1 flex-col">
        <ChatHeader persona={null} />
        <EmptyChat
          onSelectPersona={handleSelectPersona}
          onSendPrompt={handleSendPrompt}
        />
      </div>
    );
  }

  // Loading conversation
  if (isLoadingConversation) {
    return (
      <div className="flex flex-1 flex-col">
        <ChatHeader persona={null} />
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader persona={persona} onClearChat={handleClearChat} />

      {messages.length === 0 && !isSending ? (
        <EmptyChat
          onSelectPersona={handleSelectPersona}
          onSendPrompt={handleSendPrompt}
        />
      ) : (
        <MessageList
          messages={messages}
          isLoading={isSending}
          persona={persona}
        />
      )}

      {error && (
        <div className="px-6 py-2">
          <p className="text-center text-xs text-destructive">{error}</p>
        </div>
      )}

      <ChatInput
        onSend={handleSend}
        isLoading={isSending}
        placeholder={
          persona === "HITESH"
            ? "Ask Hitesh anything…"
            : persona === "PIYUSH"
              ? "Ask Piyush anything…"
              : "Ask anything…"
        }
      />
    </div>
  );
}
