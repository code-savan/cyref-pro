"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheckIcon, ZapIcon, GlobeIcon } from "./ui/Icons";

const logos = [
  "TechCorp", "AgencyX", "EcomStore", "WebHostPro",
  "CyberSec", "GlobalHost", "CloudScale", "NetDefend",
];

function AnimatedStat({ value, suffix, label, icon: Icon }: {
  value: number;
  suffix: string;
  label: string;
  icon: typeof ShieldCheckIcon;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(value);
        clearInterval(interval);
      } else {
        const progress = currentStep / steps;
        setCount(Math.round(easeOutQuart(progress) * value));
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <Icon className="w-5 h-5 text-orange-400 mb-2" />
      <span
        className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-orange-600 font-heading"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="relative border-y border-slate-100 bg-slate-50/80 py-16 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 text-center font-heading">
            Trusted by 5,000+ businesses worldwide
          </h2>

          <div className="relative flex overflow-x-hidden w-full max-w-5xl">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-50/80 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-50/80 to-transparent pointer-events-none" />
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center min-w-[180px] text-lg font-bold text-slate-300 tracking-widest uppercase px-8 hover:text-slate-400 transition-colors duration-500"
                >
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full max-w-2xl">
            <AnimatedStat value={99.9} suffix="%" label="Threat Block Rate" icon={ShieldCheckIcon} />
            <AnimatedStat value={10} suffix="M+" label="Threats Blocked" icon={GlobeIcon} />
            <AnimatedStat value={3} suffix=" min" label="Avg. Setup Time" icon={ZapIcon} />
          </div>
        </div>
      </div>
    </section>
  );
}
