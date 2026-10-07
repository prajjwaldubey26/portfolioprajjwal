"use client";

import { Check, Clock } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export function Journey() {
  return (
    <Section id="journey" labelledBy="journey-title">
      <SectionHeading id="journey-title" index="04" eyebrow="ROADMAP" title="Cloud" highlight="journey" />
      <ol className="relative mt-10 grid gap-8 md:grid-cols-3 lg:grid-cols-6">
        {portfolio.roadmap.map((item, index) => {
          const done = item.status === "completed";
          return (
            <li key={item.id} className="relative md:pt-8">
              {index < portfolio.roadmap.length - 1 ? (
                <span
                  className="absolute left-[7px] top-4 h-[calc(100%+1rem)] w-px bg-line md:left-4 md:right-0 md:top-3 md:h-px md:w-auto"
                  aria-hidden
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 grid h-4 w-4 place-items-center rounded-full border",
                  done ? "border-accent bg-accent text-ink" : "border-dashed border-muted bg-bg text-muted",
                )}
                aria-hidden
              >
                {done ? <Check className="h-2.5 w-2.5" /> : <Clock className="h-2.5 w-2.5" />}
              </span>
              <p className="mt-3 font-display text-base font-semibold">{item.title}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
                {done ? "Completed" : "Upcoming"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
