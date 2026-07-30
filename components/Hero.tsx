"use client";

import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  LockIcon,
  ShieldCheckIcon,
} from "./ui/Icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const stats = [
  { value: "98/100", label: "Trust Score" },
  { value: "4.9/5", label: "Customer Rating" },
  { value: "< 24h", label: "Review Window" },
  { value: "24/7", label: "Incident Support" },
];

const safeguards = [
  "Private onboarding",
  "Encrypted checkout",
  "Manual payment review",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-28 pb-20 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none opacity-35" />
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]"
        >
          <div>
            <motion.div variants={itemVariants} className="mb-7 flex">
              <Badge className="rounded-md border-slate-200 bg-white text-slate-700 shadow-none">
                <ShieldCheckIcon className="w-3.5 h-3.5 mr-1.5 inline-flex text-orange-500" />
                Enterprise VPS security handoff
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            >
              Managed protection for high-value VPS infrastructure.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-lg leading-8 text-slate-600"
            >
              Cyref Pro gives cPanel and Namecheap VPS teams a controlled security rollout:
              hardening, malware scanning, file monitoring, WAF layers, and human-reviewed deployment.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Button size="lg" variant="primary" className="group rounded-lg h-12 px-7 text-sm" onClick={() => { window.location.href = "/#pricing"; }}>
                Build protection plan
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-lg h-12 px-7 text-sm" onClick={() => { window.location.href = "/checkout"; }}>
                View secure checkout
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600"
            >
              {safeguards.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircleIcon className="h-4 w-4 text-orange-500" />
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white px-4 py-4">
                  <p className="text-2xl font-black text-slate-950 font-heading">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 overflow-hidden"
          >
            <div className="flex flex-col border-b border-slate-200 bg-slate-950 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold">Security control center</p>
                  <p className="text-xs text-slate-400">Deployment readiness overview</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white">
                <LockIcon className="h-3.5 w-3.5" />
                98/100 trust score
              </div>
            </div>

            <div className="text-left">
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["WAF rules", "Configured"],
                    ["Malware scan", "Queued"],
                    ["File monitor", "Active"],
                    ["Review SLA", "< 24h"],
                  ].map(([label, status]) => (
                    <div key={label} className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-950">{status}</span>
                        <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Enterprise handoff</p>
                <div className="mt-5 space-y-4">
                  {[
                    ["Validated order", "A specialist reviews the payment and deployment context."],
                    ["Controlled access", "No passwords or private keys are requested at checkout."],
                    ["Documented rollout", "Setup details are delivered as a clear handoff."],
                  ].map(([title, body]) => (
                    <div key={title} className="flex gap-3">
                      <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
