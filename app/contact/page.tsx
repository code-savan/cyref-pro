import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-slate-900 font-heading mb-6">Contact Us</h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Have a question or need help? Reach out to us anytime.
          </p>
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Support</h2>
              <a href="mailto:support@cyref-pro.swiftvult.com" className="text-lg font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                support@cyref-pro.swiftvult.com
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Business Inquiries</h2>
              <a href="mailto:reachcyref@cyref-pro.swiftvult.com" className="text-lg font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                reachcyref@cyref-pro.swiftvult.com
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
