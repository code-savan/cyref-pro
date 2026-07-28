"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { usePricing, Websites, LogRetention, AiResponse } from "@/hooks/usePricing";
import { Button } from "./ui/Button";
import { CheckIcon } from "./ui/Icons";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 1.2, stiffness: 60, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export function PricingConfigurator() {
  const {
    websites, setWebsites,
    logRetention, setLogRetention,
    aiResponse, setAiResponse,
    total, breakdown,
  } = usePricing();

  return (
    <section className="relative py-28 bg-slate-50 overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none opacity-50" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            Simple Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Transparent,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Configurable
            </span>{" "}
            Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Tailor your protection to match your server&apos;s exact requirements without paying for bloat.
          </motion.p>
        </div>

        <div className="mx-auto max-w-5xl bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-xl flex flex-col lg:flex-row gap-12 relative">
          <div className="flex-1 space-y-10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5 font-heading">
                Number of Websites
              </h3>
              <div className="relative flex bg-slate-100 rounded-xl p-1">
                {([1, 5, 25] as Websites[]).map((num) => (
                  <button
                    key={num}
                    onClick={() => setWebsites(num)}
                    className={`relative z-10 flex-1 py-3.5 text-sm font-semibold rounded-lg transition-colors ${
                      websites === num ? "text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {websites === num && (
                      <motion.div
                        layoutId="websites-active"
                        className="absolute inset-0 bg-orange-500 rounded-lg shadow-md"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-20">
                      {num} {num === 1 ? "Site" : "Sites"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5 font-heading">
                Log Retention
              </h3>
              <div className="relative flex bg-slate-100 rounded-xl p-1">
                {(["30days", "90days", "1year"] as LogRetention[]).map((val) => (
                  <button
                    key={val}
                    onClick={() => setLogRetention(val)}
                    className={`relative z-10 flex-1 py-3.5 text-sm font-semibold rounded-lg transition-colors ${
                      logRetention === val ? "text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {logRetention === val && (
                      <motion.div
                        layoutId="logs-active"
                        className="absolute inset-0 bg-orange-500 rounded-lg shadow-md"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-20">
                      {val === "30days" ? "30 Days" : val === "90days" ? "90 Days" : "1 Year"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5 font-heading">
                AI Threat Response
              </h3>
              <div className="relative flex bg-slate-100 rounded-xl p-1">
                {(["automated", "manual"] as AiResponse[]).map((val) => (
                  <button
                    key={val}
                    onClick={() => setAiResponse(val)}
                    className={`relative z-10 flex-1 py-3.5 text-sm font-semibold rounded-lg transition-colors ${
                      aiResponse === val ? "text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {aiResponse === val && (
                      <motion.div
                        layoutId="ai-active"
                        className="absolute inset-0 bg-orange-500 rounded-lg shadow-md"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-20">
                      {val === "automated" ? "Automated" : "Manual Review"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-[400px]">
            <div className="h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white flex flex-col justify-between shadow-2xl shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 rounded-full bg-white/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                </div>

                <p className="text-sm font-medium text-orange-100 uppercase tracking-widest">
                  Total Investment
                </p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-5xl font-extrabold font-heading">
                    $<AnimatedNumber value={total} />
                  </span>
                  <span className="text-base font-medium text-orange-200">/year</span>
                </div>

                <ul className="mt-8 space-y-3 text-sm text-orange-100">
                  <li className="flex justify-between items-center">
                    <span>Base License</span>
                    <span className="text-white font-medium">${breakdown.base}</span>
                  </li>
                  {breakdown.websites > 0 && (
                    <li className="flex justify-between items-center">
                      <span>Website Capacity</span>
                      <span className="text-orange-200">+${breakdown.websites}</span>
                    </li>
                  )}
                  {breakdown.logs > 0 && (
                    <li className="flex justify-between items-center">
                      <span>Log Retention</span>
                      <span className="text-orange-200">+${breakdown.logs}</span>
                    </li>
                  )}
                  {breakdown.ai > 0 && (
                    <li className="flex justify-between items-center">
                      <span>Manual Review</span>
                      <span className="text-orange-200">+${breakdown.ai}</span>
                    </li>
                  )}
                  <li className="flex justify-between pt-5 border-t border-white/20 font-bold text-lg mt-5">
                    <span>Total</span>
                    <span>${total}</span>
                  </li>
                </ul>
              </div>

              <div className="relative z-10 mt-8 space-y-3">
                <Button
                  variant="primary"
                  className="w-full h-14 text-base font-bold rounded-xl bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 shadow-lg"
                >
                  Checkout Securely
                </Button>
                <p className="text-center text-xs text-orange-200 flex items-center justify-center gap-1.5">
                  <CheckIcon className="w-3.5 h-3.5" />
                  256-bit encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
