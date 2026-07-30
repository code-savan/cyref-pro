"use client";

import { motion } from "framer-motion";

const integrations = [
  { name: "cPanel", file: "cpanel" },
  { name: "WHM", file: "whm" },
  { name: "Namecheap", file: "namecheap" },
  { name: "Cloudflare", file: "cloudflare" },
  { name: "Let's Encrypt", file: "letsencrypt" },
  { name: "Docker", file: "docker" },
  { name: "Nginx", file: "nginx" },
  { name: "Apache", file: "apache" },
];

export function Integrations() {
  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden" id="integrations">
      <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none opacity-40" />
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-6 text-center font-heading"
          >
            Seamless Integrations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-center mb-14 font-heading"
          >
            Works with your existing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              tech stack
            </span>
          </motion.h2>

          <div className="relative overflow-hidden w-full">
            <style>{`
              @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .marquee-track {
                animation: marquee 30s linear infinite;
              }
            `}</style>
            <div className="flex marquee-track w-max items-center gap-16">
              {[...integrations, ...integrations].map(({ name, file }, i) => (
                <div key={`${name}-${i}`} className="flex items-center justify-center h-8 shrink-0">
                  <img
                    src={`/integrations/${file}.svg`}
                    alt={`${name} logo`}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
