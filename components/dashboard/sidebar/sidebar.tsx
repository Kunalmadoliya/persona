"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SidebarSkeleton } from "@/components/shared/skeleton";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { useConversations, useDeleteConversation } from "@/app/hooks";
import type { Conversation } from "@/app/hooks";
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconMessageChatbot,
  IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react";
import { UserButton } from "@clerk/nextjs";
import { useState, useMemo } from "react";

function groupConversations(conversations: Conversation[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const last7 = new Date(today.getTime() - 7 * 86400000);

  const groups: { label: string; items: Conversation[] }[] = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Last 7 Days", items: [] },
    { label: "Older", items: [] },
  ];

  for (const conv of conversations) {
    const d = new Date(conv.updatedAt);
    if (d >= today) groups[0].items.push(conv);
    else if (d >= yesterday) groups[1].items.push(conv);
    else if (d >= last7) groups[2].items.push(conv);
    else groups[3].items.push(conv);
  }

  return groups.filter((g) => g.items.length > 0);
}

function getConversationTitle(conv: Conversation): string {
  if (conv.chatMessages.length > 0 && conv.chatMessages[0].role === "USER") {
    const text = conv.chatMessages[0].tokens;
    return text.length > 40 ? text.slice(0, 40) + "…" : text;
  }
  return conv.persona === "HITESH" ? "Chat with Hitesh" : "Chat with Piyush";
}

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, activeConversationId, setActiveConversationId } =
    useDashboard();
  const { data: conversations, isLoading } = useConversations();
  const deleteConversation = useDeleteConversation();
  const [search, setSearch] = useState("");

  const grouped = useMemo(() => {
    if (!conversations) return [];
    const filtered = search
      ? conversations.filter((c:Conversation) =>
          getConversationTitle(c).toLowerCase().includes(search.toLowerCase())
        )
      : conversations;
    return groupConversations(filtered);
  }, [conversations, search]);

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        sidebarOpen ? "w-[280px]" : "w-0 overflow-hidden opacity-0"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <Logo variant="compact" />
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <IconLayoutSidebarLeftCollapse size={18} stroke={1.5} />
        </Button>
      </div>

      {/* New Chat */}
      <div className="px-3 pb-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setActiveConversationId(null)}
        >
          <IconPlus size={14} stroke={2} />
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <IconSearch
            size={14}
            stroke={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search chats…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full rounded-lg border border-border bg-background/50 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <Separator />

      {/* Conversation List */}
      <ScrollArea className="flex-1 px-2 py-2">
        {isLoading ? (
          <SidebarSkeleton />
        ) : grouped.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <IconMessageChatbot size={24} className="text-muted-foreground/50" />
            <p className="text-xs text-muted-foreground">
              {search ? "No matching chats" : "No conversations yet"}
            </p>
          </div>
        ) : (
          grouped.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
              {group.items.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={cn(
                    "group flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors",
                    activeConversationId === conv.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                >
                  <Badge
                    variant="secondary"
                    className="shrink-0 text-[9px] px-1.5 py-0"
                  >
                    {conv.persona === "HITESH" ? "HC" : "PG"}
                  </Badge>
                  <span className="flex-1 truncate">
                    {getConversationTitle(conv)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation.mutate(conv.id);
                      if (activeConversationId === conv.id) {
                        setActiveConversationId(null);
                      }
                    }}
                    className="hidden shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive group-hover:block"
                  >
                    <IconTrash size={13} stroke={1.5} />
                  </button>
                </button>
              ))}
            </div>
          ))
        )}
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="flex items-center gap-3 p-3">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-7 w-7",
            },
          }}
        />
        <span className="flex-1 text-xs text-muted-foreground truncate">Account</span>
      </div>
    </aside>
  );
}
