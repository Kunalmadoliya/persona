"use client";

import { cn } from "@/lib/utils";
import { YouTubeCard } from "./youtube-card";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useState, useCallback, useMemo } from "react";

interface MessageBubbleProps {
  role: "USER" | "ASSISTANT";
  content: string;
  personaInitials?: string;
}

// Parse YouTube links from text: [Title](https://youtube.com/watch?v=ID)
// or raw https://youtube.com/watch?v=ID or https://youtu.be/ID
function extractYouTubeVideos(text: string) {
  const regex =
    /(?:\[([^\]]+)\]\()?https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)\)?/g;
  const videos: { title: string; videoId: string; fullMatch: string }[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    videos.push({
      title: match[1] || "Watch Video",
      videoId: match[2],
      fullMatch: match[0],
    });
  }
  return videos;
}

// Simple code block parser
function parseContent(text: string) {
  const parts: { type: "text" | "code"; content: string; language?: string }[] =
    [];
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    parts.push({
      type: "code",
      content: match[2].trim(),
      language: match[1] || "text",
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }

  return parts;
}

function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="my-3 rounded-xl border border-border bg-background/80 overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-[11px] text-muted-foreground font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <IconCheck size={12} /> Copied
            </>
          ) : (
            <>
              <IconCopy size={12} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TextContent({ text }: { text: string }) {
  // Bold: **text**
  // Inline code: `text`
  // Bullet points: lines starting with - or *
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;

        // Heading lines
        if (line.startsWith("### ")) {
          return (
            <p key={i} className="font-semibold text-foreground mt-3 mb-1">
              {line.replace("### ", "")}
            </p>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <p key={i} className="font-semibold text-foreground text-base mt-3 mb-1">
              {line.replace("## ", "")}
            </p>
          );
        }

        // Bullet points
        if (line.match(/^\s*[-*]\s/)) {
          const content = line.replace(/^\s*[-*]\s/, "");
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="text-muted-foreground mt-1.5 shrink-0">•</span>
              <span>{formatInline(content)}</span>
            </div>
          );
        }

        // Numbered lists
        if (line.match(/^\s*\d+\.\s/)) {
          const match = line.match(/^\s*(\d+)\.\s(.*)/);
          if (match) {
            return (
              <div key={i} className="flex gap-2 pl-1">
                <span className="text-muted-foreground shrink-0">{match[1]}.</span>
                <span>{formatInline(match[2])}</span>
              </div>
            );
          }
        }

        return <p key={i}>{formatInline(line)}</p>;
      })}
    </>
  );
}

function formatInline(text: string): React.ReactNode {
  // Split by **bold**, `code`, and plain text
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1.5 py-0.5 text-[12px] font-mono text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function MessageBubble({
  role,
  content,
  personaInitials = "AI",
}: MessageBubbleProps) {
  const isUser = role === "USER";
  const videos = useMemo(() => (isUser ? [] : extractYouTubeVideos(content)), [content, isUser]);
  const parsed = useMemo(() => parseContent(content), [content]);

  return (
    <div
      className={cn(
        "flex gap-3 px-4 md:px-6 py-3 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-[10px] font-bold text-muted-foreground mt-0.5">
          {personaInitials}
        </div>
      )}

      <div
        className={cn(
          "text-[14px] leading-relaxed",
          isUser
            ? "max-w-[75%] rounded-2xl rounded-br-md bg-primary/15 px-4 py-2.5 text-foreground"
            : "max-w-[85%] space-y-1"
        )}
      >
        {parsed.map((part, i) =>
          part.type === "code" ? (
            <CodeBlock key={i} code={part.content} language={part.language || "text"} />
          ) : (
            <TextContent key={i} text={part.content} />
          )
        )}

        {/* YouTube recommendation cards */}
        {videos.length > 0 && (
          <div className="mt-3 space-y-2">
            {videos.map((video) => (
              <YouTubeCard
                key={video.videoId}
                title={video.title}
                videoId={video.videoId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
