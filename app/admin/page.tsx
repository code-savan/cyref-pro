"use client";

import { useState } from "react";

const extensions = [
  { id: "full-kit", name: "Full Kit", price: 1999 },
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

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("CyberShield Rootkit");
  const [amount, setAmount] = useState("");
  const [serverDomain, setServerDomain] = useState("");
  const [cpanelUser, setCpanelUser] = useState("");
  const [selectedExts, setSelectedExts] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const toggleExt = (id: string) => {
    if (id === "full-kit") {
      setSelectedExts((prev) => (prev.includes("full-kit") ? [] : ["full-kit"]));
      return;
    }
    setSelectedExts((prev) => {
      const next = prev.filter((e) => e !== "full-kit");
      return next.includes(id) ? next.filter((e) => e !== id) : [...next, id];
    });
  };

  const handleSend = async () => {
    setSending(true);
    setResult(null);

    const extList = selectedExts.includes("full-kit")
      ? extensions.filter((e) => e.id !== "full-kit")
      : extensions.filter((e) => selectedExts.includes(e.id));

    try {
      const res = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          plan: selectedExts.includes("full-kit") ? "Full Kit — All 10 Extensions" : plan,
          amount: Number(amount),
          serverDomain,
          cpanelUser,
          extensions: extList,
        }),
      });

      const data = await res.json();
      if (res.ok) {
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
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Plan</label>
            <select value={plan} onChange={(e) => setPlan(e.target.value)} className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400">
              <option>CyberShield Rootkit</option>
              <option>Full Kit — All 10 Extensions</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Amount ($) *</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1024" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Extensions</label>
            <div className="grid grid-cols-2 gap-2">
              {extensions.map((ext) => {
                const active = selectedExts.includes(ext.id);
                return (
                  <button
                    key={ext.id}
                    onClick={() => toggleExt(ext.id)}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                      active ? "border-orange-400 bg-orange-50 text-orange-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block font-medium">{ext.name}</span>
                    <span className="text-xs opacity-70">${ext.price}</span>
                  </button>
                );
              })}
            </div>
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
            disabled={!email || !name || !amount || sending}
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
