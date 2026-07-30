"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageCircleIcon, XIcon } from "./ui/Icons";

type Message = {
  role: "bot" | "user";
  text: string;
};

const quickReplies = [
  "How do I get started?",
  "What threats do you block?",
  "Can I review before payment?",
  "How long does setup take?",
  "Pricing & plans",
];

const botResponses: Record<string, string> = {
  default:
    "Hi! I'm Suzy, your AI security assistant. I can help you with getting started, understanding features, pricing, and more. What would you like to know?",
  "How do I get started?":
    "Getting started is easy! Purchase your license, download the plugin, upload via cPanel/WHM, and activate the AI scan. The entire process takes under 3 minutes. Would you like me to walk you through any specific step?",
  "What threats do you block?":
    "Cyref Pro blocks zero-day exploits, phishing attempts, malware, DDoS attacks, and unauthorized access attempts in real-time. Our AI analyzes traffic patterns to catch threats before they reach your server.",
  "Can I review before payment?":
    "Cyref Pro is sold through transparent annual packages. You can review the full stack, payment total, and deployment handoff before sending payment.",
  "How long does setup take?":
    "Most orders receive a deployment handoff after payment review. The exact setup depends on your VPS, cPanel/WHM access, and selected extensions.",
  "Pricing & plans":
    "Pricing starts with CyberShield Rootkit at $999/year, then you can add extensions or choose the discounted Full Kit. The checkout shows the processing fee and total before payment.",
};

function ChatMessage({ msg }: { msg: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
    >
      {msg.role === "bot" && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 shadow-sm">
          <MessageCircleIcon className="h-4 w-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          msg.role === "bot"
            ? "bg-slate-100 text-slate-700 rounded-tl-sm"
            : "bg-orange-500 text-white rounded-tr-sm"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: botResponses.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    const responseDelay = 800 + (text.length % 6) * 80;

    setTimeout(() => {
      const reply = botResponses[text] || botResponses.default;
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setIsTyping(false);
    }, responseDelay);
  };

  return (
    <>
      {/* Chat bubble trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-shadow"
      >
        <MessageCircleIcon className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <MessageCircleIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Suzy</p>
                  <p className="text-xs text-orange-100">AI Security Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg, i) => (
                <ChatMessage key={i} msg={msg} />
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 shadow-sm">
                    <MessageCircleIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="border-t border-slate-100 px-5 py-3">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-all whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white disabled:opacity-40 hover:bg-orange-600 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M22 2 11 13" />
                    <path d="m22 2-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
