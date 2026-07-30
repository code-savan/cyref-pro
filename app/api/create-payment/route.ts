import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const baseUrl = process.env.PAYRAM_BASE_URL?.replace(/\/+$/, "");
  const apiKey = process.env.PAYRAM_API_KEY;

  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      {
        error:
          "PayRam not configured. Set PAYRAM_BASE_URL and PAYRAM_API_KEY in .env.local. " +
          "Deploy your own PayRam instance first: https://payram.com",
      },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { amount, customer_email } = body;

    const response = await fetch(`${baseUrl}/api/v1/payment`, {
      method: "POST",
      headers: {
        "API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerEmail: customer_email,
        customerID: customer_email,
        amountInUSD: Number(amount),
      }),
    });

    const raw = await response.text();

    if (!response.ok) {
      console.error("PayRam API error:", response.status, raw);
      return NextResponse.json(
        { error: "Payment provider error. Please try again." },
        { status: 502 }
      );
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from payment provider" },
        { status: 502 }
      );
    }

    const paymentUrl = (data.url as string) || (data.host as string);

    if (!paymentUrl) {
      console.error("PayRam: no payment URL in response", JSON.stringify(data));
      return NextResponse.json(
        { error: "Payment created but no checkout URL returned." },
        { status: 502 }
      );
    }

    return NextResponse.json({ payment_url: paymentUrl });
  } catch (err) {
    console.error("Payment creation failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
