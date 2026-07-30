"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, GlobeIcon, LockIcon, ShieldCheckIcon, ZapIcon } from "./ui/Icons";

const trustSignals = [
  "Encrypted checkout",
  "Manual order review",
  "Private deployment handoff",
  "cPanel-aware setup",
  "Clear billing summary",
  "Support-led onboarding",
];

function TrustMetric({ value, label, detail, icon: Icon }: {
  value: string;
  label: string;
  detail: string;
  icon: typeof ShieldCheckIcon;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 text-left">
      <Icon className="mx-auto mb-3 h-5 w-5 text-orange-500" />
      <span
        className="block text-3xl md:text-4xl font-black text-slate-950 font-heading"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </span>
      <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{detail}</p>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="relative border-y border-slate-200 bg-slate-50 py-16 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 font-heading">
                Security proof
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 font-heading">
                Built for controlled, auditable deployment.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Enterprise buyers see exactly what is selected, reviewed, paid, and handed off.
            </p>
          </div>

          <div className="relative flex overflow-x-hidden w-full max-w-5xl">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-50/80 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-50/80 to-transparent pointer-events-none" />
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {[...trustSignals, ...trustSignals].map((signal, index) => (
                <div
                  key={index}
                  className="flex min-w-[230px] items-center justify-center gap-2 px-8 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 transition-colors duration-500 hover:text-slate-500"
                >
                  <CheckCircleIcon className="h-4 w-4 text-orange-400" />
                  {signal}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-3">
            <TrustMetric value="98/100" label="Trust score" detail="Clear order review, encrypted forms, and specialist handoff." icon={ShieldCheckIcon} />
            <TrustMetric value="4.9/5" label="Buyer confidence" detail="Customer-rated onboarding, support, and setup clarity." icon={GlobeIcon} />
            <TrustMetric value="< 24h" label="Launch support" detail="Deployment follow-up after your payment is confirmed." icon={ZapIcon} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
              <LockIcon className="h-3.5 w-3.5 text-orange-500" />
              Light theme, secure checkout
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-orange-500" />
              No hidden steps after purchase
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
