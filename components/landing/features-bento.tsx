import { cn } from "@/lib/utils";
import {
  IconBrain,
  IconMessageChatbot,
  IconBrandYoutube,
  IconBolt,
  IconHistory,
  IconCode,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconMessageChatbot,
    title: "AI Personas",
    description:
      "Each persona captures the voice, teaching style, and mannerisms of real creators. It feels like talking to them.",
    span: "md:col-span-2",
  },
  {
    icon: IconBrain,
    title: "Context Aware",
    description:
      "The AI understands what you're asking and responds with depth — not shallow answers.",
    span: "md:col-span-1",
  },
  {
    icon: IconBrandYoutube,
    title: "YouTube Recommendations",
    description:
      "Automatically finds and recommends the most relevant videos from the creator's channel.",
    span: "md:col-span-1",
  },
  {
    icon: IconBolt,
    title: "Fast Responses",
    description:
      "Built on GPT-4 with optimised prompting. Responses are fast, focused, and useful.",
    span: "md:col-span-1",
  },
  {
    icon: IconHistory,
    title: "Conversation Memory",
    description:
      "Pick up where you left off. Your conversations are saved and organised automatically.",
    span: "md:col-span-1",
  },
  {
    icon: IconCode,
    title: "Developer Focused",
    description:
      "Code blocks, markdown, technical depth — built for developers who want to learn, not just chat.",
    span: "md:col-span-2",
  },
];

export function FeaturesBento() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Features
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to learn faster
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Not another chatbot. A learning experience designed for developers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "group relative rounded-2xl border border-border bg-card/30 p-6 transition-all duration-300",
                  "hover:bg-card/60 hover:border-border/80 hover:-translate-y-0.5",
                  feature.span
                )}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} stroke={1.5} />
                </div>
                <h3 className="text-[15px] font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
