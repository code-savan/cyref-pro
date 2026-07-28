"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import {
  ShieldAlertIcon,
  FingerprintIcon,
  LockIcon,
  ActivityIcon,
  WrenchIcon,
  LifeBuoyIcon,
} from "./ui/Icons";

const features = [
  {
    name: "Zero-Day Exploit Prevention (WAF)",
    description:
      "Proactively blocks unknown vulnerabilities before patches are even available.",
    icon: ShieldAlertIcon,
  },
  {
    name: "Advanced Phishing Detection",
    description:
      "AI-driven analysis identifies and blocks sophisticated phishing attempts instantly.",
    icon: FingerprintIcon,
  },
  {
    name: "One-Click PCI-DSS Hardening",
    description:
      "Achieve immediate compliance with industry standards through automated server hardening.",
    icon: LockIcon,
  },
  {
    name: "Real-time Traffic Monitoring",
    description:
      "Deep packet inspection and behavioral analysis to stop malicious traffic.",
    icon: ActivityIcon,
  },
  {
    name: "Automated Malware Cleanup",
    description:
      "Automatically quarantines and neutralizes threats without human intervention.",
    icon: WrenchIcon,
  },
  {
    name: "24/7 Emergency Support",
    description:
      "Direct access to our specialized security team whenever you need critical assistance.",
    icon: LifeBuoyIcon,
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col bg-white p-8 rounded-2xl overflow-hidden border border-slate-200 transition-shadow hover:shadow-xl hover:shadow-orange-500/5"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(249, 115, 22, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
          <feature.icon className="h-6 w-6" />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <h3 className="text-lg font-bold text-slate-900 mb-2.5 font-heading">{feature.name}</h3>
          <p className="text-base leading-relaxed text-slate-500">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesGrid() {
  return (
    <section className="relative bg-white py-28 overflow-hidden" id="features">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            Comprehensive Protection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Enterprise-grade security,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              plug-and-play
            </span>{" "}
            simplicity.
          </motion.h2>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={feature.name} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
