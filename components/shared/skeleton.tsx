import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg bg-muted",
        className
      )}
    />
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-start gap-3">
        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      <div className="flex items-start justify-end gap-3">
        <div className="flex flex-col gap-2 items-end">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full" />
      ))}
    </div>
  );
}
