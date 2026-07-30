import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#fff7ed,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-heading mb-4">Installation Guide</h1>
          <p className="text-lg text-slate-500 mb-10">Deploy Cyref Pro on your VPS in under 3 minutes.</p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">1</span>
                Prerequisites
              </h2>
              <div className="ml-8 space-y-2 text-sm text-slate-600">
                <p>• A Linux VPS running Ubuntu 22.04+, Debian 12+, or CentOS 9+</p>
                <p>• Root or sudo access to the server</p>
                <p>• OpenSSH installed (default on most VPS images)</p>
                <p>• cPanel/WHM access (optional — enables deeper integration)</p>
                <p>• Outbound internet access on port 443</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">2</span>
                Connect to Your Server
              </h2>
              <p className="ml-8 text-sm text-slate-600 mb-3">SSH into your server using your private key or password:</p>
              <pre className="ml-8 bg-slate-950 text-slate-50 rounded-xl p-5 text-sm font-mono overflow-x-auto">ssh root@your-server-ip</pre>
              <p className="ml-8 mt-2 text-sm text-slate-500">Replace <code className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded text-xs font-mono">your-server-ip</code> with your actual VPS IP address.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">3</span>
                Download the Installer
              </h2>
              <p className="ml-8 text-sm text-slate-600 mb-3">Download the Cyref Pro installation script:</p>
              <pre className="ml-8 bg-slate-950 text-slate-50 rounded-xl p-5 text-sm font-mono overflow-x-auto">curl -fsSL https://cyref-pro.swiftvult.com/install.sh -o install.sh</pre>
              <p className="ml-8 mt-2 text-sm text-slate-500">This downloads the signed installer to your current directory.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">4</span>
                Verify the Installer
              </h2>
              <p className="ml-8 text-sm text-slate-600 mb-3">Verify the checksum to ensure the script has not been tampered with:</p>
              <pre className="ml-8 bg-slate-950 text-slate-50 rounded-xl p-5 text-sm font-mono overflow-x-auto">sha256sum install.sh</pre>
              <p className="ml-8 mt-2 text-sm text-slate-500">Expected output: <code className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded text-xs font-mono">a1b2c3d4e5f6...</code> (compare against the checksum listed on our releases page).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">5</span>
                Run the Installer
              </h2>
              <p className="ml-8 text-sm text-slate-600 mb-3">Execute the installer with your license key:</p>
              <pre className="ml-8 bg-slate-950 text-slate-50 rounded-xl p-5 text-sm font-mono overflow-x-auto">bash install.sh --license=auto</pre>
              <p className="ml-8 mt-2 text-sm text-slate-500">The installer will:</p>
              <ul className="ml-8 mt-1 space-y-1 text-sm text-slate-600">
                <li>• Detect your OS and install dependencies</li>
                <li>• Deploy the Cyref Pro agent as a systemd service</li>
                <li>• Configure firewall rules (UFW/iptables)</li>
                <li>• Set up the monitoring dashboard endpoint</li>
                <li>• Activate your license (automatic with the <code className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded text-xs font-mono">--license=auto</code> flag)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">6</span>
                Configure Extensions
              </h2>
              <p className="ml-8 text-sm text-slate-600 mb-3">After installation, configure your purchased extensions:</p>
              <pre className="ml-8 bg-slate-950 text-slate-50 rounded-xl p-5 text-sm font-mono overflow-x-auto">cyref-proctl configure --cpanel-user=root</pre>
              <p className="ml-8 mt-2 text-sm text-slate-500">This links Cyref Pro to your cPanel user for file-level monitoring and malware scanning.</p>
              <p className="ml-8 mt-3 text-sm text-slate-600">Enable individual extensions:</p>
              <pre className="ml-8 mt-2 bg-slate-950 text-slate-50 rounded-xl p-5 text-sm font-mono overflow-x-auto">cyref-proctl enable threat-intel
cyref-proctl enable ddos
cyref-proctl enable waf
cyref-proctl enable malware-scanner
cyref-proctl enable siem</pre>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">7</span>
                Verify Installation
              </h2>
              <p className="ml-8 text-sm text-slate-600 mb-3">Check that everything is running correctly:</p>
              <pre className="ml-8 bg-slate-950 text-slate-50 rounded-xl p-5 text-sm font-mono overflow-x-auto">cyref-proctl status</pre>
              <p className="ml-8 mt-2 text-sm text-slate-500">Expected output:</p>
              <pre className="ml-8 mt-2 bg-slate-900 text-slate-300 rounded-xl p-5 text-sm font-mono overflow-x-auto">Cyref Pro Agent:    active (running)
├─ Threat Intel:    enabled
├─ DDoS Migration:  enabled
├─ WAF Engine:      enabled
├─ Malware Scanner: enabled
├─ SIEM:            enabled
└─ License:         active (lifetime)

Dashboard:         https://cyref-pro.swiftvult.com
Support:           support@cyref-pro.swiftvult.com</pre>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">8</span>
                Access the Dashboard
              </h2>
              <p className="ml-8 text-sm text-slate-600">Open your browser and navigate to the dashboard URL provided in the status output. Log in with your cPanel credentials or the admin account created during installation. From there you can monitor threats, review logs, and manage all extensions in real time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold">9</span>
                Troubleshooting
              </h2>
              <div className="ml-8 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">Installer fails with &quot;permission denied&quot;</p>
                  <p className="text-slate-600">Ensure you are running as root: <code className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded text-xs font-mono">sudo su -</code></p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Agent not starting after install</p>
                  <p className="text-slate-600">Check logs: <code className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded text-xs font-mono">journalctl -u cyref-pro-agent -n 50 --no-pager</code></p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">License activation failed</p>
                  <p className="text-slate-600">Ensure your server has outbound HTTPS access. Contact <a href="mailto:support@cyref-pro.swiftvult.com" className="text-orange-500 hover:text-orange-600">support@cyref-pro.swiftvult.com</a> with your receipt ID for manual activation.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
