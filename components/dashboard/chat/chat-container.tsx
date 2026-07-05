"use client";

import { useEffect, useCallback, useState } from "react";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { useChat, useCreateConversation } from "@/app/hooks";
import type { ChatMessage } from "@/app/hooks";
import { ChatHeader } from "./chat-header";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { EmptyChat } from "./empty-chat";
import { MessageSkeleton } from "@/components/shared/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type PersonaId, PERSONAS } from "./persona-switcher";
import { IconLoader2 } from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

  const activePersonaId = (conversationData?.persona as PersonaId) || "HITESH";

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

  const [pendingPersonaSwitch, setPendingPersonaSwitch] = useState<PersonaId | null>(null);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const executePersonaSwitch = useCallback(async (personaId: PersonaId) => {
    setIsSwitching(true);
    try {
      const newConv = await createConversation.mutateAsync(personaId);
      
      // Optimistically seed the cache so the subsequent GET is instant
      queryClient.setQueryData(["conversation", newConv.id], {
        ...newConv,
        chatMessages: [],
      });

      setActiveConversationId(newConv.id);
      clearMessages();
      setShouldFocusInput(true);
      
      // Reset focus flag after a tiny delay
      setTimeout(() => setShouldFocusInput(false), 100);

      const targetPersona = PERSONAS.find(p => p.id === personaId);
      toast.success(`Switched to ${targetPersona?.subtitle}`);
    } catch (e) {
      toast.error("Failed to switch persona");
    } finally {
      setIsSwitching(false);
    }
  }, [createConversation, queryClient, setActiveConversationId, clearMessages]);

  const handleSwitchPersonaRequest = useCallback((personaId: PersonaId) => {
    if (personaId === activePersonaId) return;

    if (messages.length === 0) {
      // Empty chat, switch instantly
      executePersonaSwitch(personaId);
    } else {
      // Has messages, request confirmation
      setPendingPersonaSwitch(personaId);
    }
  }, [activePersonaId, messages.length, executePersonaSwitch]);

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

  const targetPersonaForModal = PERSONAS.find(p => p.id === pendingPersonaSwitch);

  return (
    <>
      <div className="flex flex-1 flex-col relative h-full min-h-0 overflow-hidden">
        <ChatHeader persona={conversationData?.persona ?? null} onClearChat={handleClearChat} />

        {isSwitching ? (
          <div className="flex flex-1 flex-col items-center justify-center animate-fade-in">
            <IconLoader2 size={24} className="animate-spin text-muted-foreground/60 mb-3" />
            <p className="text-[13px] font-medium text-muted-foreground">Creating conversation...</p>
          </div>
        ) : !activeConversationId ? (
          <EmptyChat onSelectPersona={executePersonaSwitch} />
        ) : isLoadingConversation ? (
          <MessageSkeleton />
        ) : (
          <MessageList
            messages={messages}
            isLoading={isSending}
            persona={conversationData.persona}
          />
        )}

        {error && (
          <div className="px-6 py-2">
            <p className="text-center text-xs text-destructive">{error}</p>
          </div>
        )}

        <ChatInput
          onSend={handleSend}
          isLoading={isSending || isSwitching}
          currentPersona={activePersonaId}
          onSwitchPersona={handleSwitchPersonaRequest}
          autoFocus={shouldFocusInput}
          placeholder={
            activePersonaId === "HITESH"
              ? "Ask Hitesh anything…"
              : "Ask Piyush anything…"
          }
        />
      </div>

      <AlertDialog 
        open={pendingPersonaSwitch !== null} 
        onOpenChange={(open) => !open && setPendingPersonaSwitch(null)}
      >
        <AlertDialogContent className="max-w-md rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-heading">Start a new conversation?</AlertDialogTitle>
            <AlertDialogDescription className="text-base mt-2 leading-relaxed">
              Switching to <span className="font-semibold text-foreground">{targetPersonaForModal?.subtitle}</span> will start a fresh conversation. 
              <br/><br/>
              Your current conversation will remain available in History.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-2 sm:gap-0">
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (pendingPersonaSwitch) {
                  executePersonaSwitch(pendingPersonaSwitch);
                  setPendingPersonaSwitch(null);
                }
              }}
              className="rounded-xl"
            >
              Start New Chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
