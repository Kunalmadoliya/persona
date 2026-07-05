"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Conversation {
  id: string;
  persona: "HITESH" | "PIYUSH";
  createdAt: string;
  updatedAt: string;
  chatMessages: { tokens: string; role: "USER" | "ASSISTANT" }[];
}

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch("/api/conversations");
      if (!res.ok) throw new Error("Failed to fetch conversations");
      const { data } = await res.json();
      return data;
    },
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (persona: "HITESH" | "PIYUSH") => {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona }),
      });
      if (!res.ok) throw new Error("Failed to create conversation");
      const { data } = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/conversations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete conversation");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
