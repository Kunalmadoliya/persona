import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo variant="compact" />
        <p className="text-xs text-muted-foreground">
          Built with care for developers who want to learn through conversations.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Persona
        </p>
      </div>
    </footer>
  );
}
