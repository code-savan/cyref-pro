"use client";

import { useEffect, useState } from "react";
import { baseProduct, extensions } from "@/hooks/usePricing";

const FULL_KIT_ID = "full-kit";
const FULL_KIT_PRICE = extensions.find((e) => e.id === FULL_KIT_ID)?.price ?? 1999;
const EXTENSION_LIST = extensions.filter((e) => e.id !== FULL_KIT_ID);

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
  const [template, setTemplate] = useState<"confirmation" | "warning">(() => loadDraft()?.template ?? "confirmation");
  const [email, setEmail] = useState(() => loadDraft()?.email ?? "");
  const [name, setName] = useState(() => loadDraft()?.name ?? "");
  const [serverDomain, setServerDomain] = useState(() => loadDraft()?.serverDomain ?? "");
  const [cpanelUser, setCpanelUser] = useState(() => loadDraft()?.cpanelUser ?? "");
  const [deactivationTime, setDeactivationTime] = useState(() => loadDraft()?.deactivationTime ?? "3:00 PM WAT today");
  const [selectedExts, setSelectedExts] = useState<string[]>(() => loadDraft()?.selectedExts ?? []);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    saveDraft({ template, email, name, serverDomain, cpanelUser, deactivationTime, selectedExts });
  }, [template, email, name, serverDomain, cpanelUser, deactivationTime, selectedExts]);

  const fullKitActive = selectedExts.includes(FULL_KIT_ID);
  const baseSelected = selectedExts.includes(baseProduct.id);

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
    ? EXTENSION_LIST
    : EXTENSION_LIST.filter((e) => selectedExts.includes(e.id));
  const amount = fullKitActive
    ? FULL_KIT_PRICE
    : (baseSelected ? baseProduct.price : 0) + EXTENSION_LIST.filter((e) => selectedExts.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const planName = fullKitActive ? "Full Kit — All 10 Extensions" : baseSelected ? baseProduct.name : "Custom stack";

  const handleSend = async () => {
    setSending(true);
    setResult(null);

    try {
      if (template === "warning") {
        const res = await fetch("/api/send-warning", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            serverDomain,
            deactivationTime,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          clearDraft();
          setResult({ ok: true, message: `Warning email sent! ID: ${data.id}` });
        } else {
          setResult({ ok: false, message: data.error || "Failed to send" });
        }
        return;
      }

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
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Admin — Send Email</h1>
        <p className="mb-8 text-sm text-slate-500">Select a template and manually send it to any email address.</p>

        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Template *</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as "confirmation" | "warning")}
              className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none focus:border-slate-400"
            >
              <option value="confirmation">Confirmation — Invoice + setup instructions</option>
              <option value="warning">Warning — Backup server required (deactivation at 3pm WAT)</option>
            </select>
            {template === "warning" && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800">
                System warning: the tool requires a backup server. Current server was turned off and will be deactivated at{" "}
                <strong>{deactivationTime || "3:00 PM WAT today"}</strong>.
              </div>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Email *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@example.com" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
          </div>

          {template === "confirmation" ? (
          <>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Packages</label>
            <p className="mb-3 text-xs text-slate-400">
              {fullKitActive ? "Full Kit selected — all 10 extensions included" : "Select the packages purchased. Base rootkit is optional."}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => !fullKitActive && toggleExt(baseProduct.id)}
                className={`col-span-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                  fullKitActive ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed" :
                  baseSelected ? "border-orange-400 bg-orange-50 text-orange-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="block font-medium">{baseProduct.name}</span>
                <span className="text-xs opacity-70">${baseProduct.price}</span>
              </button>
              {[{ id: FULL_KIT_ID, name: "Full Kit", price: FULL_KIT_PRICE }, ...EXTENSION_LIST].map((ext) => {
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
          </>
          ) : (
          <>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Current server (turned off)</label>
            <input value={serverDomain} onChange={(e) => setServerDomain(e.target.value)} placeholder="secure.example.com" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Deactivation time *</label>
            <input value={deactivationTime} onChange={(e) => setDeactivationTime(e.target.value)} placeholder="3:00 PM WAT today" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-slate-400" />
            <p className="mt-1.5 text-xs text-slate-400">Shown in the subject line and email body as the deactivation deadline.</p>
          </div>
          </>
          )}

          <button
            onClick={handleSend}
            disabled={!email || !name || sending || (template === "warning" && !deactivationTime)}
            className="h-12 w-full rounded-lg bg-slate-950 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : template === "warning" ? "Send warning email" : "Send confirmation email"}
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
