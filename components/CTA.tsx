"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRightIcon } from "./ui/Icons";

export function CTA() {
  return (
    <section className="relative bg-slate-900 py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
            Ready to secure your server?
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            Start protecting your Namecheap VPS with AI-powered security in under 3 minutes.
            No credit card required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 shadow-xl shadow-orange-500/10 rounded-2xl h-14 px-10"
            >
              Start Free Trial
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-2xl h-14 px-10"
            >
              Talk to Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
