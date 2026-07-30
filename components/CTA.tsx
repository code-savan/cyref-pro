"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRightIcon } from "./ui/Icons";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50 py-24">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Deployment-ready security</p>
            <h2 className="mt-3 max-w-3xl text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 font-heading">
              Move from exposed VPS to reviewed protection stack.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 max-w-2xl">
              Build the stack, review the exact checkout, and receive a clear handoff from the Cyref Pro team.
            </p>
          </div>
          <div className="flex w-full flex-col sm:w-auto sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              size="lg"
              className="rounded-lg h-12 px-7 cursor-pointer bg-orange-500 hover:bg-orange-600"
              onClick={() => { window.location.href = "/#pricing"; }}
            >
              Build plan
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg h-12 px-7 cursor-pointer border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              onClick={() => { window.location.href = "/contact"; }}
            >
              Talk to Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
