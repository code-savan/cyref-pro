import { ShieldIcon, GlobeIcon } from "./ui/Icons";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Integrations"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <ShieldIcon className="h-7 w-7 text-orange-500" />
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                CyberShield
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier security solution for Namecheap VPS and standard cPanel servers.
              Real-time AI protection, installed in under 3 minutes.
            </p>
            <div className="mt-6 flex items-center gap-4 text-slate-500">
              <GlobeIcon className="h-5 w-5 hover:text-orange-400 transition-colors cursor-pointer" />
              <span className="text-xs text-slate-600">English (US)</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white font-heading">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2026 CyberShield. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
