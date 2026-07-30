import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cyref-pro.swiftvult.com"),
  title: {
    default: "Cyref Pro | Managed VPS Security for cPanel Teams",
    template: "%s | Cyref Pro",
  },
  description:
    "Build a trusted VPS protection plan with AI-assisted firewall, malware scanning, file monitoring, compliance reports, and guided cPanel deployment support.",
  applicationName: "Cyref Pro",
  keywords: [
    "VPS security",
    "cPanel security",
    "Namecheap VPS protection",
    "web application firewall",
    "malware scanner",
    "server hardening",
    "SIEM log management",
    "PCI-DSS reports",
    "Cyref Pro",
  ],
  authors: [{ name: "Cyref Pro" }],
  creator: "Cyref Pro",
  publisher: "Cyref Pro",
  category: "Cybersecurity",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Cyref Pro | Managed VPS Security for cPanel Teams",
    description:
      "Build a trusted VPS protection plan with transparent checkout, high-trust proof, and guided deployment support.",
    url: "https://cyref-pro.swiftvult.com",
    siteName: "Cyref Pro",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyref Pro | Managed VPS Security for cPanel Teams",
    description:
      "AI-assisted firewall, malware scanning, file monitoring, and guided cPanel deployment support.",
    images: ["/icon.png"],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="bg-white text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
