import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const personas = [
  {
    name: "Hitesh Choudhary",
    initials: "HC",
    role: "AI Mentor",
    description:
      "Full stack development, JavaScript, React, Python, DevOps — taught in Hinglish with real-world analogies and a focus on building projects.",
    sampleQuestion: "Sir, React Context API kab use karna chahiye aur kab Redux?",
    sampleAnswer:
      "Dekho bhai, agar tumhara app chhota hai aur state simple hai, toh Context API bilkul kaafi hai. Redux tab use karo jab state complex ho jaye. Jab tak haath gande nahi karoge, tab tak samajh nahi aayega — ek project bana ke try karo!",
    accentColor: "oklch(0.70 0.15 50)",
    image: "/hiteshsir.webp",
  },
  {
    name: "Piyush Garg",
    initials: "PG",
    role: "AI Mentor",
    description:
      "Backend engineering, System Design, Node.js, DevOps, and real-world production architecture — clear, structured, and deeply technical.",
    sampleQuestion: "How do you design a scalable notification system?",
    sampleAnswer:
      "Great question! Start with a message queue like Kafka or RabbitMQ. You need a producer-consumer pattern — decouple the notification generation from delivery. Add a priority queue for urgent notifications and batch the rest.",
    accentColor: "oklch(0.65 0.15 160)",
    image: "/piyushgargSir.webp",
  },
];

export function PersonaShowcase() {
  return (
    <section id="personas" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Meet Your Mentors
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Talk to the people you learn from
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Each persona captures the teaching style, language, and philosophy of real creators.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {personas.map((persona) => (
            <article
              key={persona.name}
              className={cn(
                "group relative rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300",
                "hover:border-border/80 hover:bg-card/80 hover:shadow-lg hover:shadow-black/5",
                "hover:-translate-y-0.5"
              )}
            >
              {/* Top glow on hover */}
              <div
                className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${persona.accentColor}, transparent)`,
                }}
              />

              {/* Persona identity */}
              <div className="flex items-center gap-3.5 mb-5">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-border/50 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <AvatarImage 
                    src={persona.image} 
                    alt={persona.name} 
                    className="object-cover animate-fade-in"
                  />
                  <AvatarFallback 
                    className="text-xs font-bold"
                    style={{
                      background: `color-mix(in oklch, ${persona.accentColor}, transparent 85%)`,
                      color: persona.accentColor,
                    }}
                  >
                    {persona.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[15px] font-semibold tracking-tight">{persona.name}</h3>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{persona.role}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {persona.description}
              </p>

              {/* Sample conversation */}
              <div className="rounded-xl bg-background/60 border border-border/50 p-4 space-y-3">
                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-br-md bg-primary/10 px-3.5 py-2 text-[13px]">
                    {persona.sampleQuestion}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-muted/40 px-3.5 py-2 text-[13px] leading-relaxed max-w-[92%]">
                    {persona.sampleAnswer}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <Badge variant="secondary" className="text-[11px]">
                  AI Persona
                </Badge>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Start conversation →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
