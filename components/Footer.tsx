import Image from "next/image";
import { GlobeIcon } from "./ui/Icons";

const internalLinks: Record<string, string> = {
  About: "/about",
  Contact: "/contact",
  "Privacy Policy": "/privacy",
  "Terms of Service": "/terms",
  "Cookie Policy": "/cookies",
};

const footerLinks = {
  Company: ["About", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image src={"/logo.png"}  width={100} height={100} className="w-[40px]" alt="logo"/>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                Cyref Pro
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-sm">
              Managed VPS security with clear pricing, trust-first checkout, and deployment support for cPanel environments.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-500">
              <a href="mailto:support@cyref-pro.swiftvult.com" className="block hover:text-orange-400 transition-colors">
                support@cyref-pro.swiftvult.com
              </a>
              <a href="mailto:reachcyref@cyref-pro.swiftvult.com" className="block hover:text-orange-400 transition-colors">
                reachcyref@cyref-pro.swiftvult.com
              </a>
            </div>
            <div className="mt-4 flex items-center gap-4 text-slate-500">
              <GlobeIcon className="h-5 w-5 hover:text-orange-400 transition-colors cursor-pointer" />
              <span className="text-xs text-slate-500">English (US)</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-900 font-heading">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <FooterLink href={internalLinks[link] || "#"}>{link}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2026 Cyref Pro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="/privacy" className="hover:text-orange-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-orange-400 transition-colors">Terms</a>
            <a href="/cookies" className="hover:text-orange-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
