"use client";

import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { StarIcon, ArrowRightIcon, ZapIcon } from "./ui/Icons";

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
  { value: "70K+", label: "Servers Protected" },
  { value: "99.9%", label: "Threat Block Rate" },
  { value: "< 3 min", label: "Setup Time" },
  { value: "24/7", label: "Security Support" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-36 pb-28 lg:pt-44 lg:pb-36 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none opacity-70" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-500/4 rounded-full blur-[100px] pointer-events-none" />


      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <Badge>
              <ZapIcon className="w-3.5 h-3.5 mr-1.5 inline-flex" />
              AI-Powered Zero-Day Protection
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.05]"
          >
            The Smartest Way to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Secure Your VPS
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-500"
          >
            Real-time zero-day protection, AI threat detection, and advanced firewall—
            installed on your Namecheap VPS in under 3 minutes.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" variant="primary" className="group rounded-2xl h-14 px-10 text-base">
              Get 14 Days Free Trial
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl h-14 px-10 text-base">
              See How It Works
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400"
          >
            <span className="text-slate-500">No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-slate-500">14-day free trial</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-slate-500">Cancel anytime</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-2 text-sm"
          >
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
              ))}
            </div>
            <span className="font-semibold text-slate-800">4.9/5</span>
            <span className="text-slate-400">from 2,400+ reviews</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-12 border-t border-slate-100"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-black text-slate-900 font-heading">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
