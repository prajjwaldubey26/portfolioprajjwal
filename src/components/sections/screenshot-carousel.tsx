"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { buttonStyles } from "@/components/ui/button";

const GRADIENTS = [
  "from-[#2A1808] via-[#6B3A12] to-[#10121A]",
  "from-[#071826] via-[#14344C] to-[#10121A]",
  "from-[#1A1030] via-[#3A2166] to-[#10121A]",
];

export function ScreenshotCarousel() {
  const shots = portfolio.project.screenshots;
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const shot = shots[index];
  if (!shot) return null;

  function go(next: number) {
    setIndex((next + shots.length) % shots.length);
  }

  return (
    <div>
      <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#12141C] shadow-glow"
        onPointerDown={(event) => setStartX(event.clientX)}
        onPointerUp={(event) => {
          if (startX === null) return;
          const delta = event.clientX - startX;
          if (delta > 48) go(index - 1);
          if (delta < -48) go(index + 1);
          setStartX(null);
        }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <p className="mx-auto font-mono text-[11px] text-zinc-400">{shot.label}</p>
        </div>
        <div className="relative aspect-video">
          {shot.src ? (
            <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
          ) : (
            <div className={`grid h-full place-items-center bg-gradient-to-br ${GRADIENTS[index] ?? GRADIENTS[0]}`}>
              <div className="rounded-xl border border-dashed border-white/25 px-4 py-3 text-center">
                <p className="font-display text-lg text-white">{shot.label}</p>
                <p className="mt-1 font-mono text-[11px] text-zinc-300">Screenshot slot</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button type="button" className={buttonStyles("icon")} aria-label="Previous screenshot" onClick={() => go(index - 1)}>
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Screenshots">
          {shots.map((item, dot) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={dot === index}
              aria-label={`Show ${item.label} screenshot`}
              className={`h-2.5 w-2.5 rounded-full ${dot === index ? "bg-accent" : "bg-line"}`}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
        <button type="button" className={buttonStyles("icon")} aria-label="Next screenshot" onClick={() => go(index + 1)}>
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
