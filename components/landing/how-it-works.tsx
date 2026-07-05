import { IconUserScan, IconMessageQuestion, IconRocket } from "@tabler/icons-react";

const steps = [
  {
    number: "01",
    icon: IconUserScan,
    title: "Choose a Persona",
    description:
      "Pick the creator you want to learn from. Each persona reflects their real teaching style.",
  },
  {
    number: "02",
    icon: IconMessageQuestion,
    title: "Ask Anything",
    description:
      "Ask about concepts, roadmaps, project ideas, debugging — no question is too simple or too complex.",
  },
  {
    number: "03",
    icon: IconRocket,
    title: "Learn Faster",
    description:
      "Get answers the way they'd teach it — with analogies, code examples, and the push to build.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            How It Works
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps to start learning
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] md:block">
                    <div className="h-full w-full border-t border-dashed border-border" />
                  </div>
                )}

                {/* Icon container */}
                <div className="relative mb-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 border border-border transition-colors">
                    <Icon size={24} stroke={1.5} className="text-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
