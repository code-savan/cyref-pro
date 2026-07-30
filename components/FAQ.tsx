"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "./ui/Icons";

const faqs = [
  {
    question: "What makes the checkout trustworthy?",
    answer:
      "The checkout shows the exact service selection, processing fee, total due, payment network, support contact, and post-payment handoff before you send funds.",
  },
  {
    question: "How does deployment start after payment?",
    answer:
      "After payment review, the Cyref Pro team uses your order details to prepare the deployment handoff and contact you at the email address provided during checkout.",
  },
  {
    question: "Does it work with my existing setup?",
    answer:
      "Cyref Pro is designed around Namecheap VPS and standard cPanel/WHM environments. If your setup is different, contact support before purchase so the team can confirm fit.",
  },
  {
    question: "Can I customize the protection stack?",
    answer:
      "Yes. Start with the core CyberShield Rootkit package and add extensions such as WAF, SIEM, malware scanning, file monitoring, SMTP protection, or the discounted Full Kit.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Checkout and deployment support are available through the listed support email, with priority attention for urgent setup or security incident questions.",
  },
  {
    question: "Are the prices transparent?",
    answer:
      "Yes. The configurator and checkout both show the base package, selected extensions, processing fee, total due today, and the Full Kit savings when applicable.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 font-heading"
          >
            Buyer FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Everything to know before checkout
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
