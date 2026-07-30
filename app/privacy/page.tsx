import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-slate-900 font-heading mb-6">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>Last updated: January 2026</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Information We Collect</h2>
            <p>We collect information you provide directly, such as your name, email address, and server details when you purchase or use our services.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">How We Use Your Information</h2>
            <p>We use your information to provide, maintain, and improve our security services, process transactions, and communicate with you about your account.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. All connections are encrypted using 256-bit SSL/TLS.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Contact</h2>
            <p>For privacy-related inquiries, contact us at support@cyref-pro.swiftvult.com.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
