import { useState, useMemo } from 'react';

export type Extension = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const baseProduct = {
  id: 'rootkit',
  name: 'CyberShield Rootkit',
  description: 'Core AI-driven rootkit detection & prevention engine',
  price: 999,
};

export const extensions: Extension[] = [
  { id: 'threat-intel', name: 'AI Threat Intelligence', description: 'Real-time global threat feed integration', price: 600 },
  { id: 'ddos', name: 'DDoS Protection', description: 'Guided DDoS protection setup and traffic hardening', price: 499 },
  { id: 'email-smtp', name: 'Email SMTP Protection', description: 'Outbound SMTP filtering & phishing detection', price: 350 },
  { id: 'malware', name: 'Malware Scanner Pro', description: 'Deep file-system malware analysis', price: 400 },
  { id: 'waf', name: 'Web Application Firewall', description: 'OWASP top-10 rule engine with custom rules', price: 550 },
  { id: 'file-monitor', name: 'Real-Time File Monitor', description: 'Inotify-based integrity checking', price: 350 },
  { id: 'database', name: 'Database Security Suite', description: 'Encryption, audit, and SQLi prevention', price: 500 },
  { id: 'siem', name: 'SIEM & Log Management', description: 'Centralized log aggregation & alerting', price: 750 },
  { id: 'vuln-scanner', name: 'Vulnerability Scanner', description: 'Weekly CVE-based infrastructure scans', price: 300 },
  { id: 'compliance', name: 'Compliance Reports', description: 'PCI-DSS / HIPAA / SOC2 report generation', price: 250 },
  { id: 'full-kit', name: 'Full Kit', description: 'All 10 extensions bundled into one discounted security stack', price: 1999 },
];

const FULL_KIT_PRICE = 1999;

export function usePricing() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);

      if (id === 'full-kit') {
        if (next.has('full-kit')) {
          next.delete('full-kit');
        } else {
          next.clear();
          next.add('full-kit');
        }
      } else if (next.has('full-kit')) {
        next.delete('full-kit');
        next.add(id);
      } else {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      }

      return next;
    });
  };

  const isFullKit = selected.has('full-kit');
  const hasBase = !isFullKit && selected.has(baseProduct.id);

  const selectedExtensions = useMemo(
    () => extensions.filter((e) => selected.has(e.id) && e.id !== 'full-kit'),
    [selected]
  );

  const extensionsTotal = useMemo(
    () => selectedExtensions.reduce((sum, e) => sum + e.price, 0),
    [selectedExtensions]
  );

  const total = isFullKit
    ? FULL_KIT_PRICE
    : (hasBase ? baseProduct.price : 0) + extensionsTotal;

  return {
    selected,
    toggle,
    isFullKit,
    hasBase,
    total,
    breakdown: {
      base: hasBase ? baseProduct.price : 0,
      extensions: selectedExtensions,
      extensionsTotal: isFullKit ? 0 : extensionsTotal,
    },
  };
}
