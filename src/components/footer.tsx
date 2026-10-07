"use client";

import { ArrowUp, Cloud } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { buttonStyles } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted">{portfolio.footer.credit}</p>
        <div className="flex flex-wrap items-center gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 font-mono text-[11px] text-muted">
            <Cloud className="h-3.5 w-3.5 text-accent-text" aria-hidden />
            {portfolio.footer.hostBadge}
          </p>
          <p className="font-mono text-[11px] text-muted">Press ` for commands</p>
          <button
            type="button"
            className={buttonStyles("icon")}
            aria-label="Back to top"
            onClick={() => scrollToId("top")}
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
