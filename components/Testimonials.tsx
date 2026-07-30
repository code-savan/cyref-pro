"use client";

import { motion } from "framer-motion";
import { StarIcon } from "./ui/Icons";

const testimonials = [
  {
    quote:
      "The checkout was clear, the handoff was structured, and we knew exactly what the team needed before touching our production VPS.",
    author: "Shon Taite",
    role: "Head of Security",
    company: "Grainor",
    rating: 5,
    avatar: "/testimonials/shon.jpg",
  },
  {
    quote:
      "Cyref Pro helped us turn scattered firewall and malware tasks into one practical deployment plan. The trust score section was what got finance comfortable.",
    author: "Sarah Chen",
    role: "Engineering Lead",
    company: "CloudScale",
    rating: 5,
    avatar: "/testimonials/sarah.jpg",
  },
  {
    quote:
      "We needed cPanel-aware security without a giant enterprise platform. The extension model let us start lean and add only what mattered.",
    author: "Mark Demon",
    role: "CTO",
    company: "RevBoost",
    rating: 5,
    avatar: "/testimonials/mark.jpg",
  },
  {
    quote:
      "The reporting and support notes gave us a cleaner audit trail. It felt like a real security handoff, not just a download link.",
    author: "Jessica Park",
    role: "Security Director",
    company: "FinSecure",
    rating: 5,
    avatar: "/testimonials/jessica.jpg",
  },
];

function TestimonialCard({
  testimonial,
  index,
  featured,
}: {
  testimonial: typeof testimonials[0];
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-lg border bg-white p-8 transition-all duration-300 ${
        featured
          ? "border-orange-200 shadow-lg shadow-orange-500/5 md:col-span-2 md:row-span-1"
          : "border-slate-200 shadow-sm hover:shadow-lg hover:border-orange-200"
      }`}
    >
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <StarIcon key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
        ))}
      </div>

      <blockquote className={`leading-relaxed text-slate-600 ${featured ? "text-lg" : "text-base"}`}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-12 h-12 rounded-full object-cover bg-slate-200 ring-2 ring-slate-100"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement("div");
              fallback.className =
                "w-12 h-12 rounded-full bg-orange-100 text-orange-600 text-sm font-bold flex items-center justify-center";
              fallback.textContent = testimonial.author
                .split(" ")
                .map((n) => n[0])
                .join("");
              parent.insertBefore(fallback, target);
            }
          }}
        />
        <div>
          <p className="text-sm font-semibold text-slate-900">{testimonial.author}</p>
          <p className="text-xs text-slate-500">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
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
            Customer Confidence
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading"
          >
            Trusted by operators who need{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              proof before purchase
            </span>{" "}
          </motion.h2>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.author}
              testimonial={t}
              index={i}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
