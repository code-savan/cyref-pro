"use client";

import { XCircleIcon, CheckCircleIcon } from "./ui/Icons";
import { motion } from "framer-motion";

const problems = [
  "Default cPanel settings left exposed to automated scans",
  "Firewall rules scattered across plugins and hosting tools",
  "Malware checks that only run after something feels wrong",
  "Unclear ownership when an incident needs fast action",
  "Checkout flows that do not explain what happens after payment",
];

const solutions = [
  "Guided hardening built around VPS and cPanel workflows",
  "Layered firewall, scan, and file-monitoring options",
  "Clear deployment notes delivered after order review",
  "Specialist support for urgent setup and incident questions",
  "Transparent pricing, exact payment totals, and trust badges",
];

export function ProblemSolution() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            See the Difference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Security that feels{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              calm and clear
            </span>
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-6xl mx-auto">
          <div className="w-full lg:w-1/2">
            <div className="h-full rounded-lg border border-slate-200 bg-white p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                <div className="p-2.5 rounded-lg bg-red-50 text-red-500">
                  <XCircleIcon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight font-heading">
                  Without Cyref Pro
                </h3>
              </div>
              <ul className="space-y-5">
                {problems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 text-slate-600"
                  >
                    <XCircleIcon className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="h-full rounded-lg border border-orange-300 bg-white p-8 lg:p-10 shadow-lg shadow-orange-500/5 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-orange-100">
                <div className="p-2.5 rounded-lg bg-orange-50 text-orange-500">
                  <CheckCircleIcon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-heading">
                  With Cyref Pro
                </h3>
              </div>
              <ul className="space-y-5">
                {solutions.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 text-slate-700 font-medium"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
