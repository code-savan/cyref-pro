"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon, ActivityIcon, CheckCircleIcon } from "./ui/Icons";

const highlights = [
  {
    title: "AI Threat Detection",
    description:
      "Our machine learning model analyzes traffic patterns in real-time, identifying and neutralizing zero-day exploits before they breach your server.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Continuous deep packet inspection and behavioral analysis provide complete visibility into every request hitting your VPS, 24/7.",
    icon: ActivityIcon,
  },
  {
    title: "Automated Compliance",
    description:
      "One-click PCI-DSS hardening with automated reporting. Achieve compliance in minutes, not weeks, with pre-configured security frameworks.",
    icon: CheckCircleIcon,
  },
];

export function WhyChoose() {
  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-30" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[600px] bg-orange-500/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            Why CyberShield
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Why businesses choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              CyberShield
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Businesses choose CyberShield because it simplifies the complexity of server security management.
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
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-xl hover:border-orange-200 transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 mb-6">
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
