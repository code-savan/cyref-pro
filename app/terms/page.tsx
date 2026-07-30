import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-slate-900 font-heading mb-6">Terms of Service</h1>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>Last updated: January 2026</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Acceptance of Terms</h2>
            <p>By accessing or using Cyref Pro services, you agree to be bound by these terms. If you do not agree, do not use our services.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Service Description</h2>
            <p>Cyref Pro provides VPS security tools including rootkit detection, malware scanning, firewall protection, and related services.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Payment Terms</h2>
            <p>Services are billed annually in advance. All payments are final and non-refundable unless otherwise specified.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Limitation of Liability</h2>
            <p>Cyref Pro shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Contact</h2>
            <p>For questions about these terms, contact us at support@cyref-pro.swiftvult.com.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
