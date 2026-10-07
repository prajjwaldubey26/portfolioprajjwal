"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { useToast } from "@/components/toast";

const KEYWORDS = new Set(["double", "return"]);

function highlight(code: string) {
  return code.split("\n").map((line, lineIndex) => {
    if (line.trim().startsWith("//")) {
      return (
        <span key={lineIndex} className="block text-zinc-500">
          {line || " "}
        </span>
      );
    }

    const parts = line.split(/(\s+|[(){}.,;+\-*/])/);
    return (
      <span key={lineIndex} className="block">
        {parts.map((part, index) => {
          if (KEYWORDS.has(part) || part === "Math") {
            return (
              <span key={index} className="text-[#C4B5FD]">
                {part}
              </span>
            );
          }
          if (/^\d/.test(part)) {
            return (
              <span key={index} className="text-[#38BDF8]">
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  });
}

export function SnippetCard() {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const snippet = portfolio.project.snippet;

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      toast("Snippet copied");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast("Could not copy snippet");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C0E16] text-zinc-100">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div>
          <p className="font-mono text-xs text-zinc-300">{snippet.filename}</p>
          <p className="mt-1 text-[11px] text-zinc-500">{snippet.note}</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-3 text-xs"
          aria-label="Copy snippet"
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
        <code>{highlight(snippet.code)}</code>
      </pre>
    </div>
  );
}
