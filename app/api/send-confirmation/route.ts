import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, name, plan, amount, serverDomain, cpanelUser, extensions: exts } = await req.json();

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const receiptId = `CYREF-${now.getTime().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const baseItem = `<tr><td style="padding:5px 8px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155">${plan}</td><td style="padding:5px 8px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155;text-align:center">1</td><td style="padding:5px 8px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155;text-align:right">$${amount.toLocaleString()}</td></tr>`;

    const extRows = exts?.length
      ? exts.map((e: { name: string; price: number }) =>
          `<tr><td style="padding:5px 8px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155">${e.name}</td><td style="padding:5px 8px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155;text-align:center">1</td><td style="padding:5px 8px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155;text-align:right">$${e.price.toLocaleString()}</td></tr>`
        ).join("")
      : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Invoice — Cyref Pro</title></head>
<body style="margin:0;padding:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.6;color:#334155">

  <p>Hello ${name},</p>
  <p>Thank you for your purchase. Your Cyref Pro protection stack is being reviewed and will be deployed within 24 hours. Below is your invoice and setup guide.</p>

  <hr style="border:none;border-top:2px solid #0f172a;margin:24px 0" />

  <h2 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 4px">INVOICE</h2>
  <table style="width:100%">
    <tr><td style="font-size:13px;color:#64748b;padding:2px 0">Receipt #</td><td style="font-size:13px;color:#0f172a;font-weight:600;padding:2px 0">${receiptId}</td></tr>
    <tr><td style="font-size:13px;color:#64748b;padding:2px 0">Date</td><td style="font-size:13px;color:#0f172a;font-weight:600;padding:2px 0">${dateStr}</td></tr>
    <tr><td style="font-size:13px;color:#64748b;padding:2px 0">Customer</td><td style="font-size:13px;color:#0f172a;font-weight:600;padding:2px 0">${name} &lt;${email}&gt;</td></tr>
    <tr><td style="font-size:13px;color:#64748b;padding:2px 0">Payment</td><td style="font-size:13px;color:#0f172a;font-weight:600;padding:2px 0">USDT (ERC20)</td></tr>
    <tr><td style="font-size:13px;color:#64748b;padding:2px 0">Status</td><td style="font-size:13px;color:#059669;font-weight:600;padding:2px 0">Paid — pending review</td></tr>
  </table>

  <table style="width:100%;border-collapse:collapse;margin-top:16px">
    <tr><td style="padding:8px;background:#f8fafc;font-size:13px;font-weight:700;color:#0f172a;border-bottom:2px solid #0f172a">Item</td><td style="padding:8px;background:#f8fafc;font-size:13px;font-weight:700;color:#0f172a;border-bottom:2px solid #0f172a;text-align:center">Qty</td><td style="padding:8px;background:#f8fafc;font-size:13px;font-weight:700;color:#0f172a;border-bottom:2px solid #0f172a;text-align:right">Amount</td></tr>
    ${baseItem}
    ${extRows}
    <tr><td colspan="2" style="padding:8px;font-size:14px;font-weight:700;color:#0f172a;text-align:right">Total</td><td style="padding:8px;font-size:14px;font-weight:700;color:#0f172a;text-align:right">$${amount.toLocaleString()}</td></tr>
  </table>

  <hr style="border:none;border-top:2px solid #0f172a;margin:24px 0" />

  <h2 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px">Platform Access</h2>
  <table style="width:100%">
    <tr><td style="padding:3px 0;font-size:14px;color:#64748b;width:140px">Server</td><td style="padding:3px 0;font-size:14px;font-weight:600;color:#0f172a">${serverDomain || "Pending setup"}</td></tr>
    <tr><td style="padding:3px 0;font-size:14px;color:#64748b">cPanel User</td><td style="padding:3px 0;font-size:14px;font-weight:600;color:#0f172a">${cpanelUser || "Pending setup"}</td></tr>
    <tr><td style="padding:3px 0;font-size:14px;color:#64748b">Dashboard</td><td style="padding:3px 0;font-size:14px;font-weight:600;color:#0f172a">cyref-pro.swiftvult.com</td></tr>
  </table>

  <h2 style="font-size:16px;font-weight:700;color:#0f172a;margin:24px 0 8px">Quick Install via SSH</h2>
  <p style="margin:0 0 8px">Connect to your server and run:</p>
  <pre style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px;font-size:13px;font-family:Menlo,monospace;overflow-x:auto">
ssh root@${serverDomain || "your-server-ip"}
curl -fsSL https://cyref-pro.swiftvult.com/install.sh -o install.sh
sha256sum install.sh
bash install.sh --license=auto
cyref-proctl configure --cpanel-user=${cpanelUser || "<your-username>"}
cyref-proctl status</pre>
  <p style="font-size:13px;color:#64748b">Full guide: <a href="https://cyref-pro.swiftvult.com/docs" style="color:#f97316">cyref-pro.swiftvult.com/docs</a></p>

  <h2 style="font-size:16px;font-weight:700;color:#0f172a;margin:24px 0 8px">License</h2>
  <table style="width:100%">
    <tr><td style="padding:3px 0;font-size:14px;color:#64748b;width:140px">Type</td><td style="padding:3px 0;font-size:14px;font-weight:600;color:#0f172a">Lifetime license</td></tr>
    <tr><td style="padding:3px 0;font-size:14px;color:#64748b">Status</td><td style="padding:3px 0;font-size:14px;font-weight:600;color:#0f172a">Active</td></tr>
    <tr><td style="padding:3px 0;font-size:14px;color:#64748b">Renewal</td><td style="padding:3px 0;font-size:14px;font-weight:600;color:#0f172a">None — no renewal required</td></tr>
  </table>

  <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
  <p style="font-size:13px;color:#94a3b8">
    Need help? <a href="mailto:support@cyref-pro.swiftvult.com" style="color:#f97316">support@cyref-pro.swiftvult.com</a>
  </p>
  <p style="font-size:12px;color:#94a3b8">&copy; 2026 Cyref Pro. All rights reserved.</p>
</body>
</html>`;

    const { data, error } = await resend.emails.send({
      from: "Cyref Pro <noreply@cyref-pro.swiftvult.com>",
      to: email,
      subject: `Your Cyref Pro invoice (${receiptId}) — setup instructions inside`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  } catch (err) {
    console.error("Failed to send confirmation:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
