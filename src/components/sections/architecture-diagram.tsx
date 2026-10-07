"use client";

import {
  Cloud,
  CreditCard,
  Database,
  FileText,
  Globe,
  Server,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import type { ArchNode } from "@/types/portfolio";

const ICONS: Record<string, LucideIcon> = {
  user: User,
  cloudfront: Globe,
  react: Cloud,
  api: Server,
  mysql: Database,
  pdf: FileText,
  payments: CreditCard,
  security: ShieldCheck,
};

function Flow() {
  return (
    <>
      <div className="relative mx-auto h-7 w-px overflow-hidden bg-line md:hidden" aria-hidden>
        <span className="absolute inset-x-0 h-3 bg-gradient-to-b from-transparent via-[#FF9900] to-[#38BDF8] motion-safe:animate-packet-y" />
      </div>
      <div className="relative mx-1 hidden h-px min-w-3 flex-1 overflow-hidden bg-line md:block" aria-hidden>
        <span className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#FF9900] to-[#38BDF8] motion-safe:animate-packet" />
      </div>
    </>
  );
}

function NodeButton({
  node,
  active,
  onActive,
}: {
  node: ArchNode;
  active: boolean;
  onActive: (id: string | null) => void;
}) {
  const Icon = ICONS[node.id] ?? Server;
  const tipId = `arch-tip-${node.id}`;

  return (
    <div className="relative md:w-36 md:shrink-0">
      <button
        type="button"
        className={cn(
          "w-full rounded-xl border bg-bg/70 px-3 py-3 text-left",
          node.id === "security" ? "border-dashed border-[#8B5CF6]" : "border-line",
          active && "border-[#FF9900]/70",
        )}
        aria-describedby={active ? tipId : undefined}
        aria-expanded={active}
        onMouseEnter={() => onActive(node.id)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(node.id)}
        onBlur={() => onActive(null)}
        onClick={() => onActive(active ? null : node.id)}
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-fg/5 text-accent-text">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span className="mt-2 block text-sm font-medium">{node.title}</span>
        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-muted">
          {node.subtitle}
        </span>
      </button>
      {active ? (
        <p
          id={tipId}
          role="tooltip"
          className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-line bg-bg px-3 py-2 text-xs leading-relaxed text-muted shadow-glow"
        >
          {node.description}
        </p>
      ) : null}
    </div>
  );
}

export function ArchitectureDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const main = portfolio.project.nodes.filter((node) => node.lane === "main");
  const side = portfolio.project.nodes.filter((node) => node.lane === "side");

  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text">
        {portfolio.project.architectureTitle}
      </p>
      <p className="mt-2 max-w-2xl text-sm text-muted">{portfolio.project.architectureNote}</p>
      <div className="mt-6 flex flex-col md:flex-row md:items-center" aria-label={portfolio.project.architectureTitle}>
        {main.map((node, index) => (
          <div key={node.id} className="contents">
            <NodeButton node={node} active={active === node.id} onActive={setActive} />
            {index < main.length - 1 ? <Flow /> : null}
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {side.map((node) => (
          <NodeButton key={node.id} node={node} active={active === node.id} onActive={setActive} />
        ))}
      </div>
    </div>
  );
}
