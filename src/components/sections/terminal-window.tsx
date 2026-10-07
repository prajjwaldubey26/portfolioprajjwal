"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

function renderLine(line: string) {
  if (line.startsWith("✔")) {
    return <span className="text-[#6EE7B7]">{line}</span>;
  }
  if (line.startsWith("$")) {
    return (
      <>
        <span className="text-[#FF9900]">$</span>
        {line.slice(1)}
      </>
    );
  }
  return line;
}

export function TerminalWindow() {
  const lines = portfolio.hero.terminal;
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (reduced) {
      setTyped([...lines]);
      setCurrent("");
      return;
    }

    const line = lines[lineIndex] ?? "";

    if (hold) {
      const timeout = window.setTimeout(() => {
        setTyped([]);
        setCurrent("");
        setLineIndex(0);
        setHold(false);
      }, 1600);
      return () => window.clearTimeout(timeout);
    }

    if (current === line) {
      const timeout = window.setTimeout(() => {
        setTyped((previous) => [...previous, line]);
        setCurrent("");
        if (lineIndex >= lines.length - 1) setHold(true);
        else setLineIndex((index) => index + 1);
      }, 420);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setCurrent(line.slice(0, current.length + 1));
    }, 26);
    return () => window.clearTimeout(timeout);
  }, [current, hold, lineIndex, lines, reduced]);

  const completed = reduced ? lines : typed;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#10121A] shadow-glow"
      role="img"
      aria-label="Decorative terminal typing aws, docker, and git commands"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-[11px] text-zinc-400">bash — demo</span>
      </div>
      <div className="min-h-40 space-y-2 px-4 py-4 font-mono text-sm text-zinc-100" aria-hidden>
        {completed.map((line) => (
          <p key={line}>{renderLine(line)}</p>
        ))}
        {!reduced && !hold ? (
          <p>
            {renderLine(current)}
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[#FF9900] motion-safe:animate-pulse" />
          </p>
        ) : null}
      </div>
    </div>
  );
}
