import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/config";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hotel RossoVino — Tre proprietà a Milano e Como",
    template: "%s · Hotel RossoVino",
  },
  description:
    "Gruppo Hotel RossoVino: Boutique a Milano in villa storica, Hotel 2 stelle a Milano centro, Hotel 3 stelle a Como nel verde. Ispirati al mondo del vino italiano.",
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "it_IT",
  },
};

export const viewport: Viewport = {
  themeColor: "#8B5963",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${fraunces.variable} ${outfit.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <a className="skip-link" href="#contenuto">
          Vai al contenuto principale
        </a>
        {children}
      </body>
    </html>
  );
}
