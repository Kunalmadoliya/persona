import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className
      )}
    >
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}
