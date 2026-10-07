"use client";

import type { ReactNode } from "react";
import { CommandPalette } from "@/components/command-palette";
import { CursorGlow } from "@/components/cursor-glow";
import { Footer } from "@/components/footer";
import { IntroOverlay } from "@/components/intro-overlay";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <div className="bg-grid pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="spotlight pointer-events-none fixed inset-0 z-0" aria-hidden />
      <CursorGlow />
      <ScrollProgress />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="relative z-10">
        {children}
      </main>
      <Footer />
      <IntroOverlay />
      <CommandPalette />
    </div>
  );
}
