import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhyChoose } from "@/components/WhyChoose";
import { ProblemSolution } from "@/components/ProblemSolution";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Testimonials } from "@/components/Testimonials";
import { Integrations } from "@/components/Integrations";
import { PricingConfigurator } from "@/components/PricingConfigurator";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <TrustBar />
      <WhyChoose />
      <ProblemSolution />
      <FeaturesGrid />
      <Testimonials />
      <Integrations />
      <PricingConfigurator />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
      <Chatbot />
    </main>
  );
}
