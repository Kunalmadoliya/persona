import { Logo } from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.62 0.18 264 / 40%) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <Logo />
        {children}
      </div>
    </div>
  );
}