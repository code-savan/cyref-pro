import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-slate-900 font-heading mb-6">About Cyref Pro</h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Cyref Pro delivers enterprise-grade VPS security for modern infrastructure. Our AI-driven platform
            provides real-time threat detection, automated rootkit prevention, and comprehensive server protection
            — all deployable in under 3 minutes.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Founded by cybersecurity veterans, we believe advanced protection should be accessible to every
            server operator, not just large enterprises with dedicated security teams.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our stack covers everything from DDoS migration and malware scanning to compliance reporting
            and SIEM log management — all from a single, unified dashboard.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
