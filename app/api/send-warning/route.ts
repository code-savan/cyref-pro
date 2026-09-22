import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildBackupServerWarningEmail } from "@/lib/email-templates";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const { email, name, serverDomain, deactivationTime } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
    }

    const { subject, html } = buildBackupServerWarningEmail({
      name,
      email,
      serverDomain,
      deactivationTime: deactivationTime || "3:00 PM WAT today",
    });

    const { data, error } = await resend.emails.send({
      from: "Cyref Pro <noreply@cyref-pro.swiftvult.com>",
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  } catch (err) {
    console.error("Failed to send warning:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
