"use client";

import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePricing, baseProduct, extensions, type Extension } from "@/hooks/usePricing";
import { ShieldCheckIcon, ZapIcon } from "./ui/Icons";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 1.2, stiffness: 60, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

const iconPaths: Record<string, string[]> = {
  "threat-intel": ["M22 12h-4l-3 9L9 3l-3 9H2"],
  ddos: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M12 8v4", "M12 16h.01"],
  "email-smtp": ["M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2z", "M22 7l-10 7L2 7"],
  malware: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "m9 12 2 2 4-4"],
  waf: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  "file-monitor": ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  database: ["M4 6c0 1.1 4 2 8 2s8-.9 8-2M4 6v4c0 1.1 4 2 8 2s8-.9 8-2V6M4 12v4c0 1.1 4 2 8 2s8-.9 8-2v-4"],
  siem: ["M18 20V10M12 20V4M6 20v-6"],
  "vuln-scanner": ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 6v6", "M12 16h.01"],
  compliance: ["M9 12l2 2 4-4M7.86 2h8.28L22 5.86v8.28L16.14 20H7.86L2 14.14V5.86L7.86 2z"],
  "full-kit": ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M12 8v4", "M12 16h.01", "M9 12l2 2 4-4"],
};

function ExtIcon({ id }: { id: string }) {
  const paths = iconPaths[id] || iconPaths.waf;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onClick={onChange}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(); } }}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 cursor-pointer ${
        checked ? "bg-orange-500" : "bg-slate-200"
      }`}
    >
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 left-0 h-5 w-5 rounded-full bg-white shadow-sm"
      />
    </div>
  );
}

function PricingCard({ ext, selected, onToggle, bestValue }: { ext: Extension; selected: boolean; onToggle: () => void; bestValue?: boolean }) {
  return (
    <motion.button
      layout
      onClick={onToggle}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full rounded-lg border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-orange-300 bg-orange-50 shadow-sm shadow-orange-500/5"
          : "border-slate-200 bg-white hover:border-orange-200 hover:shadow-sm"
      }`}
    >
      {bestValue && (
        <div className="absolute -top-3 right-3 z-50 px-3 py-1 bg-orange-500 rounded-md shadow-lg shadow-orange-500/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
            <ZapIcon className="h-2.5 w-2.5" />
            Best Value
          </span>
        </div>
      )}
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
            selected ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"
          }`}
        >
          <ExtIcon id={ext.id} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className={`text-sm font-semibold ${selected ? "text-slate-900" : "text-slate-700"}`}>
              {ext.name}
            </p>
            <p className={`text-sm font-bold shrink-0 ${selected ? "text-orange-600" : "text-slate-400"}`}>
              ${ext.price}
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{ext.description}</p>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <Toggle checked={selected} onChange={onToggle} />
      </div>
    </motion.button>
  );
}

export function PricingConfigurator() {
  const router = useRouter();
  const { selected, toggle, total, isFullKit, showBase } = usePricing();
  const count = selected.size;
  const pricingRef = useRef<HTMLElement>(null);
  const [showPricingBar, setShowPricingBar] = useState(false);

  useEffect(() => {
    const node = pricingRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowPricingBar(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={pricingRef} className="relative bg-white py-28 overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#fff7ed,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 pb-28">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            Transparent Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Build a plan with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              no hidden steps
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Start with CyberShield Rootkit, add the protection layers you need, and review the exact total before checkout.
          </motion.p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Base product */}
          {showBase && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-lg border border-orange-300 bg-orange-50 p-6 mb-8 flex items-center gap-5"
            >
              <div className="absolute -top-2.5 left-6 px-3 py-0.5 bg-orange-500 rounded-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Required</span>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                <ShieldCheckIcon className="h-7 w-7" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-slate-900">{baseProduct.name}</p>
                <p className="text-sm text-slate-500 mt-0.5">{baseProduct.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-extrabold text-slate-900">${baseProduct.price}</p>
                <p className="text-xs text-slate-400">/year</p>
              </div>
            </motion.div>
          )}

          {/* Extensions grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {extensions.map((ext, i) => (
              <motion.div
                key={ext.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <PricingCard ext={ext} selected={selected.has(ext.id)} onToggle={() => toggle(ext.id)} bestValue={ext.id === 'full-kit'} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating bottom bar */}
      <AnimatePresence>
        {showPricingBar && (
          <motion.div
            layout
            id="pricing-bar"
            initial={{ y: 96, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 96, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-900/10"
          >
            <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between gap-6">
              <div className="flex items-center gap-4 min-w-0">
                <div className="hidden sm:flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                    {isFullKit ? 'Full Kit' : baseProduct.name}
                  </span>
                </div>
                {count > 0 && (
                  <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{count}</span>
                    <span>extension{count !== 1 ? "s" : ""}</span>
                  </div>
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={count}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
                      $<AnimatedNumber value={total} />
                    </span>
                    <span className="text-sm text-slate-400">/year</span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.button
                onClick={() => {
                  const ids = Array.from(selected).join(",");
                  router.push(`/checkout?ext=${ids}`);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800 transition"
              >
                Review Secure Checkout
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
