import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description:
    "Review your Cyref Pro VPS protection stack, exact USDC total, and deployment handoff before payment.",
  alternates: {
    canonical: "/checkout",
  },
  openGraph: {
    title: "Secure Checkout | Cyref Pro",
    description:
      "Transparent checkout for Cyref Pro VPS security plans with exact totals.",
    url: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
