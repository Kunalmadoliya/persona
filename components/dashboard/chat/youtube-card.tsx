import { cn } from "@/lib/utils";

interface YouTubeCardProps {
  title: string;
  videoId: string;
  thumbnailUrl?: string;
}

export function YouTubeCard({ title, videoId, thumbnailUrl }: YouTubeCardProps) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const thumb =
    thumbnailUrl || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex gap-3 rounded-xl border border-border bg-card/50 p-3 transition-all duration-200",
        "hover:bg-card/80 hover:border-border/80 hover:-translate-y-0.5"
      )}
    >
      <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
        <img
          src={thumb}
          alt={title}
          className="h-full w-full object-cover"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            className="drop-shadow-lg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <p className="text-[13px] font-medium leading-snug line-clamp-2 group-hover:text-foreground transition-colors">
          {title}
        </p>
        <p className="text-[11px] text-muted-foreground">YouTube · Watch video</p>
      </div>
    </a>
  );
}
