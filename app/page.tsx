import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { PersonaShowcase } from "@/components/landing/persona-showcase";
import { FeaturesBento } from "@/components/landing/features-bento";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <LandingNavbar />
      <main>
        <Hero />
        <PersonaShowcase />
        <FeaturesBento />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
