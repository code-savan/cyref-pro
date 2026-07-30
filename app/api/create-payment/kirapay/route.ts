import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.KIRAPAY_API_KEY;
  const receiver = process.env.KIRAPAY_RECEIVER;
  const chainId = process.env.KIRAPAY_CHAIN_ID || "137";
  const tokenAddress = process.env.KIRAPAY_TOKEN_ADDRESS || null;

  if (!apiKey) {
    return NextResponse.json(
      { error: "KiraPay not configured. Set KIRAPAY_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  if (!receiver) {
    return NextResponse.json(
      { error: "KiraPay receiver wallet not configured. Set KIRAPAY_RECEIVER in .env.local" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { amount, customer_email, description } = body;

    const response = await fetch("https://api.kira-pay.com/api/link/generate", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenOut: {
          chainId,
          ...(tokenAddress ? { address: tokenAddress } : {}),
        },
        receiver,
        originalPrice: Number(amount),
        fiatCurrency: "USD",
        name: description || "Cyref Pro Protection Plan",
        customOrderId: customer_email,
        type: "single_use",
      }),
    });

    const raw = await response.text();

    if (!response.ok) {
      console.error("KiraPay API error:", response.status, raw);
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

    const nested = data.data as Record<string, unknown> | undefined;
    const paymentUrl = (data.url as string) || (nested?.url as string);

    if (!paymentUrl) {
      console.error("KiraPay: no payment URL in response", JSON.stringify(data));
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
