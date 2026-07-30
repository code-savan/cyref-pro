"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon, ActivityIcon, CheckCircleIcon } from "./ui/Icons";

const highlights = [
  {
    title: "AI-assisted threat triage",
    description:
      "Traffic, file changes, and common exploit patterns are prioritized so your team sees the issues that need action first.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Server visibility without noise",
    description:
      "Monitor firewall events, suspicious file activity, and scan results in a straightforward flow built for busy operators.",
    icon: ActivityIcon,
  },
  {
    title: "Guided hardening reports",
    description:
      "Get practical hardening steps and exportable reports for PCI-DSS, SOC 2, and internal security reviews.",
    icon: CheckCircleIcon,
  },
];

export function WhyChoose() {
  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            Why Cyref Pro
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Why businesses choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Cyref Pro
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Built for teams that need practical VPS protection, clean checkout, and a deployment handoff they can trust.
          </motion.p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-lg border border-slate-200 bg-white p-8 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 mb-6">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-slate-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
