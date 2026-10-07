import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteShell } from "@/components/site-shell";
import { portfolio } from "@/data/portfolio";
import { personJsonLd } from "@/lib/seo";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const title = "Prajjwal Dubey | Cloud Computing & DevOps";
const description = portfolio.hero.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: { default: title, template: "%s | Prajjwal Dubey" },
  description,
  applicationName: "Prajjwal Dubey",
  authors: [{ name: portfolio.person.name, url: portfolio.person.github }],
  creator: portfolio.person.name,
  keywords: [
    "Prajjwal Dubey",
    "Cloud Computing",
    "DevOps",
    "AWS",
    "Docker",
    "Spring Boot",
    "React",
    "internship",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: portfolio.siteUrl,
    title,
    description,
    siteName: "Prajjwal Dubey",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Prajjwal Dubey — Cloud Computing and DevOps" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = JSON.stringify(personJsonLd()).replace(/</g, "\\u003c");

  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
