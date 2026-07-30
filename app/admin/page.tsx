"use client";

import { useEffect, useState } from "react";

const BASE_PRICE = 999;
const FULL_KIT_PRICE = 1999;
const FULL_KIT_ID = "full-kit";

const extensions = [
  { id: "threat-intel", name: "Threat Intelligence", price: 299 },
  { id: "ddos", name: "DDoS Mitigation", price: 249 },
  { id: "email-smtp", name: "Email & SMTP Protection", price: 199 },
  { id: "malware", name: "Malware Scanner", price: 179 },
  { id: "waf", name: "Web Application Firewall", price: 299 },
  { id: "file-monitor", name: "File Integrity Monitor", price: 149 },
  { id: "database", name: "Database Security", price: 199 },
  { id: "siem", name: "SIEM & Log Management", price: 399 },
  { id: "vuln-scanner", name: "Vulnerability Scanner", price: 199 },
  { id: "compliance", name: "Compliance & Reporting", price: 149 },
];

const STORAGE_KEY = "cybershield_admin_draft";

function loadDraft() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDraft(data: Record<string, unknown>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export default function AdminPage() {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [serverDomain, setServerDomain] = useState("");
  const [cpanelUser, setCpanelUser] = useState("");
  const [selectedExts, setSelectedExts] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setEmail(draft.email ?? "");
      setName(draft.name ?? "");
      setServerDomain(draft.serverDomain ?? "");
      setCpanelUser(draft.cpanelUser ?? "");
      setSelectedExts(draft.selectedExts ?? []);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveDraft({ email, name, serverDomain, cpanelUser, selectedExts });
  }, [email, name, serverDomain, cpanelUser, selectedExts, loaded]);

  const fullKitActive = selectedExts.includes(FULL_KIT_ID);

  const toggleExt = (id: string) => {
    if (id === FULL_KIT_ID) {
      setSelectedExts((prev) => (prev.includes(FULL_KIT_ID) ? [] : [FULL_KIT_ID]));
      return;
    }
    setSelectedExts((prev) => {
      const next = prev.filter((e) => e !== FULL_KIT_ID);
      return next.includes(id) ? next.filter((e) => e !== id) : [...next, id];
    });
  };

  const extList = fullKitActive
    ? extensions
    : extensions.filter((e) => selectedExts.includes(e.id));
  const amount = fullKitActive ? FULL_KIT_PRICE : BASE_PRICE + extensions.filter((e) => selectedExts.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const planName = fullKitActive ? "Full Kit — All 10 Extensions" : "CyberShield Rootkit";

  const handleSend = async () => {
    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          plan: planName,
          amount,
          serverDomain,
          cpanelUser,
          extensions: extList,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        clearDraft();
        setResult({ ok: true, message: `Email sent! ID: ${data.id}` });
      } else {
        setResult({ ok: false, message: data.error || "Failed to send" });
      }
    } catch {
      setResult({ ok: false, message: "Network error" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Admin — Send Confirmation Email</h1>
        <p className="mb-8 text-sm text-slate-500">Manually trigger a confirmation email to a customer.</p>

        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Email *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@example.com" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Extensions</label>
            <p className="mb-3 text-xs text-slate-400">
              {fullKitActive ? "Full Kit selected — all 10 extensions included" : "Base protection ($999) always included. Add extras below."}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {!fullKitActive && (
                <div className="col-span-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-700">
                  <span className="block font-medium">CyberShield Rootkit</span>
                  <span className="text-xs opacity-70">$999 — always included</span>
                </div>
              )}
              {[{ id: FULL_KIT_ID, name: "Full Kit", price: FULL_KIT_PRICE }, ...extensions].map((ext) => {
                const active = selectedExts.includes(ext.id);
                const disabled = ext.id !== FULL_KIT_ID && fullKitActive;
                return (
                  <button
                    key={ext.id}
                    onClick={() => !disabled && toggleExt(ext.id)}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                      disabled ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed" :
                      active ? "border-orange-400 bg-orange-50 text-orange-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block font-medium">{ext.name}</span>
                    <span className="text-xs opacity-70">${ext.price}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Plan: {planName} &middot; ${amount.toLocaleString()}
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Server domain</label>
            <input value={serverDomain} onChange={(e) => setServerDomain(e.target.value)} placeholder="secure.example.com" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">cPanel username</label>
            <input value={cpanelUser} onChange={(e) => setCpanelUser(e.target.value)} placeholder="cpanel_user" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
          </div>

          <button
            onClick={handleSend}
            disabled={!email || !name || sending}
            className="h-12 w-full rounded-lg bg-slate-950 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send confirmation email"}
          </button>

          {result && (
            <div className={`rounded-lg p-4 text-sm font-medium ${result.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {result.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
