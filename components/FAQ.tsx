"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "./ui/Icons";

const faqs = [
  {
    question: "Is my data safe on CyberShield?",
    answer:
      "Yes. We use industry-grade AES-256 encryption, secure servers, and role-based access controls to protect your data at all times. All traffic is monitored through our AI-powered threat detection system.",
  },
  {
    question: "How do I get started?",
    answer:
      "Purchase your license, download the plugin, upload via cPanel/WHM, and activate the AI scan. The entire process takes under 3 minutes with zero technical expertise required.",
  },
  {
    question: "Does it work with my existing setup?",
    answer:
      "CyberShield is built specifically for Namecheap VPS and standard cPanel servers. It integrates seamlessly with your existing hosting environment without conflicts or complicated configuration.",
  },
  {
    question: "Can I customize the security rules?",
    answer:
      "Yes. Our configurable pricing lets you tailor protection to your exact needs. You can adjust website capacity, log retention periods, and choose between automated or manual AI threat response.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 emergency support from our specialized security team. All plans include email support, with priority response times for critical security incidents.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial with full access to all features. No credit card required. You can experience the full power of AI-driven security before making a commitment.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-30" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            Got Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between text-left gap-4 group"
                >
                  <span className="text-base font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-orange-500" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pb-1 text-sm leading-relaxed text-slate-500">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
