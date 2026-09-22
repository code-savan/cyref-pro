type WarningBackupServerInput = {
  name: string;
  email: string;
  serverDomain?: string;
  deactivationTime?: string;
};

export function buildBackupServerWarningEmail({
  name,
  serverDomain,
  deactivationTime = "3:00 PM WAT today",
}: WarningBackupServerInput) {
  const safeName = name || "there";
  const serverLine = serverDomain
    ? `Our monitoring shows your current server (<strong style="color:#0f172a">${serverDomain}</strong>) was turned off.`
    : `Our monitoring shows your current server was turned off.`;

  const subject = `Action required: backup server needed before ${deactivationTime} — deactivation scheduled`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>System Warning — Backup Server Required</title></head>
<body style="margin:0;padding:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.6;color:#334155;background-color:#f8fafc">

  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
    <div style="background:#b91c1c;padding:16px 24px">
      <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#fecaca">System Warning &bull; Action Required</p>
      <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#ffffff">Backup server required</h1>
    </div>

    <div style="padding:24px">
      <p>Hello ${safeName},</p>
      <p>${serverLine}</p>

      <div style="background:#fef2f2;border:1px solid #fecaca;border-left:4px solid #b91c1c;border-radius:8px;padding:16px;margin:16px 0">
        <p style="margin:0;font-size:14px;color:#7f1d1d"><strong>Your Cyref Pro protection tool requires an active backup server to stay online.</strong></p>
        <p style="margin:8px 0 0;font-size:14px;color:#7f1d1d">If no backup server is provided, your instance will be automatically deactivated at <strong>${deactivationTime}</strong>.</p>
      </div>

      <h2 style="font-size:16px;font-weight:700;color:#0f172a;margin:24px 0 8px">What you need to do</h2>
      <ol style="margin:0;padding-left:20px;color:#334155">
        <li style="margin-bottom:8px">Provision or choose a backup server (VPS with cPanel/WHM access).</li>
        <li style="margin-bottom:8px">Reply to this email with your backup server domain/IP and cPanel username — <strong>do not send passwords or private keys by email</strong>.</li>
        <li style="margin-bottom:8px">Our team will migrate your protection stack and confirm once the backup server is active.</li>
      </ol>

      <table style="width:100%;margin-top:16px;border-collapse:collapse">
        <tr><td style="padding:6px 0;font-size:13px;color:#64748b;width:160px">Current server</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#0f172a">${serverDomain || "Unavailable / turned off"}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#64748b">Deactivation at</td><td style="padding:6px 0;font-size:14px;font-weight:700;color:#b91c1c">${deactivationTime}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#64748b">Status</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#b91c1c">Warning — pending deactivation</td></tr>
      </table>

      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />

      <p style="font-size:13px;color:#64748b;margin:0">Need help fast? Contact <a href="mailto:support@cyref-pro.swiftvult.com" style="color:#ea580c">support@cyref-pro.swiftvult.com</a> with your server details and we will guide you.</p>
    </div>

    <div style="background:#f8fafc;padding:16px 24px;border-top:1px solid #e2e8f0">
      <p style="margin:0;font-size:12px;color:#94a3b8">&copy; 2026 Cyref Pro — Automated system warning. Please do not ignore this message.</p>
    </div>
  </div>

</body>
</html>`;

  return { subject, html };
}
