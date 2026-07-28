"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ShieldCheckIcon, LockIcon, ZapIcon } from "./ui/Icons";

const steps = [
  {
    id: "01",
    name: "Buy & Download Plugin",
    description:
      "Purchase your license and download the lightweight CyberShield plugin.",
    icon: LockIcon,
  },
  {
    id: "02",
    name: "Upload via cPanel / WHM",
    description:
      "Simply upload the plugin through your existing hosting control panel.",
    icon: ZapIcon,
  },
  {
    id: "03",
    name: "Activate AI Scan",
    description:
      "One click to activate. The AI immediately begins scanning and securing your server.",
    icon: ShieldCheckIcon,
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  return (
    <section className="bg-slate-50 py-28 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            Simple Setup
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Secure in 3 Simple Steps
          </motion.h2>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 z-0">
              <svg width="100%" height="100%" preserveAspectRatio="none">
                <line x1="0" y1="1" x2="100%" y2="1" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 6" />
                <motion.line
                  x1="0" y1="1" x2="100%" y2="1"
                  stroke="#F97316" strokeWidth="2" strokeDasharray="8 6"
                  style={{ pathLength: smoothProgress }}
                />
              </svg>
            </div>

            {steps.map((step, index) => {
              const stepProgress = useTransform(
                smoothProgress,
                [Math.max(0, (index - 0.5) / 2), index / 2],
                [0, 1]
              );
              const scale = useTransform(stepProgress, [0, 1], [0.85, 1]);
              const opacity = useTransform(stepProgress, [0, 1], [0.4, 1]);

              return (
                <div key={step.id} className="relative flex flex-col items-center text-center z-10">
                  <motion.div
                    style={{ scale, opacity }}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white border-2 border-slate-200 shadow-lg"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-orange-500/15 blur-lg"
                      style={{ opacity: useTransform(stepProgress, [0, 1], [0, 0.6]) }}
                    />
                    <motion.div
                      style={{
                        color: useTransform(
                          stepProgress,
                          [0, 1],
                          ["#94A3B8" as string, "#F97316" as string]
                        ),
                      }}
                    >
                      <step.icon className="h-8 w-8 relative z-10" />
                    </motion.div>
                  </motion.div>

                  <div className="mt-6">
                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-orange-500">
                      Step {step.id}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 font-heading">{step.name}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
