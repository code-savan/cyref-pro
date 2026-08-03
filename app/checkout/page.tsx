"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { baseProduct, extensions } from "@/hooks/usePricing";
import {
  ActivityIcon,
  ArrowRightIcon,
  ClockIcon,
  CheckCircleIcon,
  CheckIcon,
  CopyIcon,
  GlobeIcon,
  LockIcon,
  ServerIcon,
  ShieldCheckIcon,
  XIcon,
  ZapIcon,
} from "@/components/ui/Icons";

const FEE_RATE = 0.025;
const FULL_KIT_ID = "full-kit";
const USDT_WALLET = "0xEB84a0e913393E6AcE713f3ecC660dEFCa8886d1";
const PAYMENT_DURATION = 30 * 60;

type CheckoutDraft = {
  name?: string;
  email?: string;
  company?: string;
  serverDomain?: string;
  cpanelUser?: string;
  selected?: string[];
};

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
  "full-kit": ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
};

function readCheckoutDraft(): CheckoutDraft {
  if (typeof window === "undefined") return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const fromParams: CheckoutDraft = {};
    if (params.get("name")) fromParams.name = params.get("name")!;
    if (params.get("email")) fromParams.email = params.get("email")!;
    if (params.get("company")) fromParams.company = params.get("company")!;
    if (params.get("server")) fromParams.serverDomain = params.get("server")!;
    if (params.get("cpanel")) fromParams.cpanelUser = params.get("cpanel")!;
    if (params.get("ext")) fromParams.selected = params.get("ext")!.split(",").filter(Boolean);
    if (Object.keys(fromParams).length) return fromParams;

    const saved = window.localStorage.getItem("cybershield_checkout");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function ExtIcon({ id }: { id: string }) {
  const paths = iconPaths[id] || iconPaths.waf;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      {paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-950">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onInput={(event) => onChange(event.currentTarget.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-orange-500/10"
      />
    </label>
  );
}

function CheckoutSection({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 py-8 last:border-b-0">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-950 font-heading">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-slate-200 ${className ?? ""}`} />;
}

function PaymentModal({ total, onClose, onConfirmed }: { total: number; onClose: () => void; onConfirmed: () => void }) {
  const [ready, setReady] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PAYMENT_DURATION);
  const [copied, setCopied] = useState(false);
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [paymentCountdown, setPaymentCountdown] = useState(15);

  useEffect(() => {
    const readyTimer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (paymentEnabled) return;
    const t = setInterval(() => {
      setPaymentCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          setPaymentEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [paymentEnabled]);

  useEffect(() => {
    if (!ready) return;
    if (timeLeft <= 0) {
      onConfirmed();
      return;
    }
    const timer = setInterval(() => setTimeLeft((current) => current - 1), 1000);
    return () => clearInterval(timer);
  }, [ready, timeLeft, onConfirmed]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 12 }}
        className="w-full max-w-[760px] overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {!ready ? (
          <div className="p-6 space-y-6">
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="h-8 w-64" />
            <div className="grid gap-6 md:grid-cols-[220px_1fr] items-stretch">
              <SkeletonBlock className="min-h-[260px] w-full" />
              <div className="space-y-4">
                <SkeletonBlock className="h-24 w-full" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <SkeletonBlock className="h-20 w-full" />
                  <SkeletonBlock className="h-20 w-full" />
                </div>
                <SkeletonBlock className="h-14 w-full" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-5 border-b border-slate-200 p-6">
              <div>
                <p className="text-sm font-semibold text-slate-500">USDT (ERC20) payment</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 font-heading">Complete Payment</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  Send exactly <strong className="text-slate-950">${total.toLocaleString()} USDT</strong> to the address below.
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                aria-label="Close payment modal"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr] items-stretch">
              <div className="flex flex-col items-center rounded-lg pt-4">
                <p className="text-lg font-bold text-slate-950">Scan code</p>
                <p className="mt-1 text-xs text-slate-400">Pay with USDT (ERC20)</p>
                <div className="my-4 h-px w-full bg-slate-200" />
                <img
                  src="/scan.jpeg"
                    alt="USDT Wallet QR Code"
                  className="h-48 w-48 rounded-2xl object-contain"
                />
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-950">Wallet address</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(USDT_WALLET);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-orange-200 hover:text-orange-600"
                    >
                      <CopyIcon className="h-3.5 w-3.5" />
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="break-all rounded-md bg-slate-50 p-3 font-mono text-sm text-slate-700">{USDT_WALLET}</p>
                  <p className="mt-2 text-xs text-red-500">
                    Only send USD Coin (ERC20) assets to this address. Other assets will be lost forever.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Payment window</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950 font-heading tabular-nums">
                      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">Total due</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-orange-600 font-heading tabular-nums">
                      ${total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirming || !paymentEnabled) return;
                    setConfirming(true);
                    setTimeout(() => onConfirmed(), 5000);
                  }}
                  disabled={confirming || !paymentEnabled}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {confirming ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Processing...
                    </>
                  ) : paymentEnabled ? (
                    <>
                      I sent the payment
                      <ArrowRightIcon className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <ClockIcon className="h-4 w-4" />
                      Wait {paymentCountdown}s
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState(() => readCheckoutDraft().email ?? "");
  const [name, setName] = useState(() => readCheckoutDraft().name ?? "");
  const [company, setCompany] = useState(() => readCheckoutDraft().company ?? "");
  const [serverDomain, setServerDomain] = useState(() => readCheckoutDraft().serverDomain ?? "");
  const [cpanelUser, setCpanelUser] = useState(() => readCheckoutDraft().cpanelUser ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(() => {
    const raw = searchParams.get("ext");
    if (raw) return new Set(raw.split(",").filter(Boolean));
    return new Set(readCheckoutDraft().selected ?? []);
  });
  const prevSelections = useRef<Set<string>>(new Set());

  const fullKitActive = selected.has(FULL_KIT_ID);

  useEffect(() => {
    const data = { name, email, company, serverDomain, cpanelUser, selected: Array.from(selected) };
    window.localStorage.setItem("cybershield_checkout", JSON.stringify(data));
  }, [name, email, company, serverDomain, cpanelUser, selected]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      if (id === FULL_KIT_ID) {
        if (prev.has(FULL_KIT_ID)) {
          prevSelections.current.delete(FULL_KIT_ID);
          return new Set(prevSelections.current);
        }

        prevSelections.current = new Set(prev);
        return new Set([FULL_KIT_ID]);
      }

      if (prev.has(FULL_KIT_ID)) return prev;

      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectedExtensions = useMemo(() => extensions.filter((extension) => selected.has(extension.id)), [selected]);
  const visibleSummaryExtensions = fullKitActive ? extensions.filter((extension) => extension.id !== FULL_KIT_ID) : selectedExtensions;
  const basesSelected = selected.has(baseProduct.id);

  const total = useMemo(
    () =>
      fullKitActive
        ? 1999
        : (basesSelected ? baseProduct.price : 0) +
          extensions.filter((extension) => selected.has(extension.id)).reduce((sum, extension) => sum + extension.price, 0),
    [fullKitActive, basesSelected, selected]
  );

  const fee = useMemo(() => Math.round(total * FEE_RATE), [total]);
  const totalWithFee = total + fee;

  const savings = useMemo(() => {
    if (!fullKitActive) return 0;
    const allPrices = extensions.filter((extension) => extension.id !== FULL_KIT_ID).reduce((sum, extension) => sum + extension.price, 0);
    const fullKit = extensions.find((extension) => extension.id === FULL_KIT_ID)?.price || 0;
    return allPrices - fullKit;
  }, [fullKitActive]);

  const detailsComplete = name.trim() && email.trim() && company.trim();

  if (submitted) {
    const receiptId = `CYREF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const planName = fullKitActive ? "Full Kit — All 10 Extensions" : selected.has(baseProduct.id) ? baseProduct.name : selectedExtensions.map((e) => e.name).join(", ") || "Custom stack";
    const extNames = fullKitActive
      ? extensions.filter((e) => e.id !== FULL_KIT_ID).map((e) => e.name)
      : (selected.has(baseProduct.id) ? [baseProduct.name] : []).concat(selectedExtensions.map((e) => e.name));

    return (
      <div className="relative min-h-screen bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#fff7ed,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-100 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                <CheckIcon className="h-7 w-7" />
              </div>
              <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 font-heading">Payment received</h1>
              <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Our team will review the payment and send your deployment details and credentials within 24 hours to{" "}
                <strong className="text-slate-700">{email}</strong>.
              </p>
              <p className="mt-3 text-xs text-slate-400 max-w-sm mx-auto">
                You&apos;ll also receive a confirmation email with your invoice, platform access details, SSH setup guide, and license information.
              </p>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Receipt</span>
                <span className="text-xs font-mono font-semibold text-slate-400">{receiptId}</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-500">Plan</span>
                  <span className="text-sm font-semibold text-slate-900">{planName}</span>
                </div>
                {extNames.length > 0 && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-slate-500">Extensions</span>
                    <span className="text-sm text-slate-700 text-right max-w-[280px]">{extNames.join(", ")}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-500">Customer</span>
                  <span className="text-sm font-semibold text-slate-900">{name}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-500">Email</span>
                  <span className="text-sm text-slate-700">{email}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-500">Server</span>
                  <span className="text-sm font-mono text-slate-700">{serverDomain || "—"}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <span className="text-base font-bold text-slate-900 font-heading">Total paid</span>
                <span className="text-xl font-extrabold text-orange-600 font-heading tabular-nums">${totalWithFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50 rounded-b-2xl p-6 text-center">
              <p className="text-xs text-slate-400">
                Need help?{" "}
                <a href="mailto:support@cyref-pro.swiftvult.com" className="text-orange-500 hover:text-orange-600 font-semibold">
                  support@cyref-pro.swiftvult.com
                </a>
              </p>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
              Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => router.push("/")} className="flex items-center gap-3 text-left">
            <Image src="/logo.png" width={80} height={80} className="h-9 w-9" alt="Cyref Pro logo" />
            <span className="text-base font-bold tracking-tight text-slate-950 font-heading">Cyref Pro</span>
          </button>

          <div className="hidden items-center gap-2 text-sm font-semibold text-slate-500 sm:flex">
            <LockIcon className="h-4 w-4 text-orange-500" />
            Secure checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 pb-28 lg:px-8 lg:py-12">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>Checkout</span>
          <span className="text-slate-300">›</span>
          <span>Payment</span>
          <span className="text-slate-300">›</span>
          <span className="font-semibold text-slate-950">Confirm</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-slate-950 font-heading sm:text-5xl">Review and confirm</h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
                Confirm the deployment details and choose how much protection you want on this VPS security booking.
              </p>
            </div>

            <CheckoutSection
              title="Payment method"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <button className="flex items-center gap-4 rounded-lg border-2 border-slate-950 bg-white p-4 text-left shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-50 text-orange-600">
                    <ZapIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-950">USDT (ERC20)</span>
                  </span>
                </button>
                <button className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left text-slate-400" disabled>
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
                    <LockIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">Card payment</span>
                    <span className="mt-0.5 block text-xs">Coming soon</span>
                  </span>
                </button>
              </div>
            </CheckoutSection>

            <CheckoutSection title="Your details">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" required value={name} onChange={setName} placeholder="Alex Morgan" />
                <Field label="Email address" required type="email" value={email} onChange={setEmail} placeholder="alex@example.com" />
                <div className="sm:col-span-2">
                  <Field label="Company" required value={company} onChange={setCompany} placeholder="Acme Hosting LLC" />
                </div>
              </div>
            </CheckoutSection>

            <CheckoutSection title="Server details">
              <div className="mb-5 flex gap-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm leading-relaxed text-orange-900">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                <p>Only enter basic deployment context. Do not enter passwords, private keys, API tokens, or production credentials.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Server domain or hostname" value={serverDomain} onChange={setServerDomain} placeholder="secure.example.com" />
                <Field label="cPanel / WHM username" value={cpanelUser} onChange={setCpanelUser} placeholder="cpanel_user" />
              </div>
            </CheckoutSection>

            <CheckoutSection
              title="Services"
              action={
                <span className="text-sm font-semibold text-slate-500">
                  {fullKitActive ? "Full Kit selected" : `${selected.size + (basesSelected ? 1 : 0)} package${selected.size + (basesSelected ? 1 : 0) !== 1 ? "s" : ""} selected`}
                </span>
              }
            >
              <div className="rounded-lg border border-slate-200">
                <button
                  onClick={() => !fullKitActive && toggle(baseProduct.id)}
                  className={`flex w-full items-start justify-between gap-4 border-b border-slate-200 p-4 text-left transition ${
                    fullKitActive ? "bg-slate-50 opacity-45" : basesSelected ? "bg-orange-50" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-md ${basesSelected && !fullKitActive ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                      <ShieldCheckIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-950">{baseProduct.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{baseProduct.description}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <p className="font-bold text-slate-950">${baseProduct.price}</p>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full ${basesSelected && !fullKitActive ? "bg-orange-500 text-white" : "border border-slate-300 text-transparent"}`}>
                      <CheckIcon className="h-3 w-3" />
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => toggle(FULL_KIT_ID)}
                  className={`flex w-full items-start justify-between gap-4 border-b border-slate-200 p-4 text-left transition ${
                    fullKitActive ? "bg-orange-50" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-md ${fullKitActive ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                      <ZapIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-950">Full Kit</p>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-600">Best value</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">All 10 extensions bundled into one discounted security stack.</p>
                      {savings > 0 && <p className="mt-1 text-xs font-semibold text-orange-600">Save ${savings.toLocaleString()}</p>}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <p className="font-bold text-slate-950">$1,999</p>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full ${fullKitActive ? "bg-orange-500 text-white" : "border border-slate-300 text-transparent"}`}>
                      <CheckIcon className="h-3 w-3" />
                    </span>
                  </div>
                </button>

                {extensions
                  .filter((extension) => extension.id !== FULL_KIT_ID)
                  .map((extension) => {
                    const active = selected.has(extension.id);
                    const disabled = fullKitActive;
                    return (
                      <button
                        key={extension.id}
                        onClick={() => !disabled && toggle(extension.id)}
                        className={`flex w-full items-start justify-between gap-4 border-b border-slate-200 p-4 text-left transition last:border-b-0 ${
                          disabled ? "bg-slate-50 opacity-45" : active ? "bg-orange-50" : "bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex gap-3">
                          <span className={`flex h-10 w-10 items-center justify-center rounded-md ${active && !disabled ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                            <ExtIcon id={extension.id} />
                          </span>
                          <div>
                            <p className="font-semibold text-slate-950">{extension.name}</p>
                            <p className="mt-1 text-sm text-slate-500">{extension.description}</p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <p className="font-bold text-slate-950">${extension.price}</p>
                          <span className={`flex h-5 w-5 items-center justify-center rounded-full ${active && !disabled ? "bg-orange-500 text-white" : "border border-slate-300 text-transparent"}`}>
                            <CheckIcon className="h-3 w-3" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </CheckoutSection>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Share checkout</p>
                  <p className="text-xs text-slate-400 mt-0.5">Send a pre-filled link to your team</p>
                </div>
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (name) params.set("name", name);
                    if (email) params.set("email", email);
                    if (company) params.set("company", company);
                    if (serverDomain) params.set("server", serverDomain);
                    if (cpanelUser) params.set("cpanel", cpanelUser);
                    if (selected.size) params.set("ext", Array.from(selected).join(","));
                    const url = `${window.location.origin}/checkout?${params.toString()}`;
                    navigator.clipboard.writeText(url);
                    setCopiedShareLink(true);
                    setTimeout(() => setCopiedShareLink(false), 2000);
                  }}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                  {copiedShareLink ? "Copied!" : "Copy link"}
                </button>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-8">
            <div className="rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.06]">
              <div className="border-b border-slate-200 p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <ShieldCheckIcon className="h-7 w-7" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-950 font-heading">Cyref Pro Security</h2>
                <button className="mt-3 text-sm font-semibold text-slate-950 underline underline-offset-4" onClick={() => router.push("/#pricing")}>
                  Choose a different stack
                </button>
              </div>

              <div className="border-b border-slate-200 p-6">
                <div className="mb-5 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <ServerIcon className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-950">VPS review</p>
                      <p className="text-xs text-slate-500">Remote handoff</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ActivityIcon className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Priority</p>
                      <p className="text-xs text-slate-500">Standard queue</p>
                    </div>
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold tracking-tight text-slate-950 font-heading">Services</h3>
                <div className="space-y-4">
                  {fullKitActive ? (
                    <div className="border-l-4 border-orange-300 pl-4">
                      <div className="flex justify-between gap-4">
                        <p className="font-semibold text-slate-950">Full Kit</p>
                        <p className="font-bold text-slate-950">$1,999</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">All 10 extensions included</p>
                    </div>
                  ) : (
                    <>
                      {basesSelected && (
                        <div className="border-l-4 border-orange-300 pl-4">
                          <div className="flex justify-between gap-4">
                            <p className="font-semibold text-slate-950">{baseProduct.name}</p>
                            <p className="font-bold text-slate-950">${baseProduct.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">Core package</p>
                        </div>
                      )}
                      {visibleSummaryExtensions.length === 0 && !basesSelected ? (
                        <p className="text-sm text-slate-400">No packages selected.</p>
                      ) : (
                        visibleSummaryExtensions.map((extension) => (
                          <div key={extension.id} className="border-l-4 border-orange-200 pl-4">
                            <div className="flex justify-between gap-4">
                              <p className="font-semibold text-slate-950">{extension.name}</p>
                              <p className="font-bold text-slate-950">${extension.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-slate-500">Add-on protection</p>
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Processing fee</span>
                    <span>${fee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="text-base font-bold text-slate-950">Total to pay</span>
                    <motion.span
                      key={totalWithFee}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-bold text-slate-950 font-heading"
                    >
                      ${totalWithFee.toLocaleString()}
                    </motion.span>
                  </div>
                </div>

                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={!detailsComplete}
                  className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm and pay
                  <ArrowRightIcon className="h-4 w-4" />
                </button>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "Encrypted", Icon: LockIcon },
                    { label: "No passwords", Icon: ShieldCheckIcon },
                    { label: "Reviewed", Icon: GlobeIcon },
                  ].map(({ label, Icon }) => (
                    <div key={label} className="rounded-lg bg-slate-50 px-2 py-3">
                      <Icon className="mx-auto h-4 w-4 text-orange-500" />
                      <p className="mt-1 text-[10px] font-semibold text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 p-4 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total to pay</p>
            <p className="text-xl font-bold text-slate-950 font-heading">${totalWithFee.toLocaleString()}</p>
          </div>
          <button
            onClick={() => setShowPaymentModal(true)}
            disabled={!detailsComplete}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay now
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal
            total={totalWithFee}
            onClose={() => setShowPaymentModal(false)}
            onConfirmed={() => setSubmitted(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-white">
          <div className="h-8 w-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
