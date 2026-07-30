import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-slate-900 font-heading mb-6">Cookie Policy</h1>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>Last updated: January 2026</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">What Are Cookies</h2>
            <p>Cookies are small text files stored on your device to improve your browsing experience and enable core functionality.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">How We Use Cookies</h2>
            <p>We use essential cookies for authentication and security. Analytics cookies help us understand how our site is used to improve your experience.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Your Choices</h2>
            <p>You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8">Contact</h2>
            <p>For questions about our cookie usage, contact us at support@cyref-pro.swiftvult.com.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
