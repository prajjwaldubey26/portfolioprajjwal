"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { portfolio } from "@/data/portfolio";
import { useCountUp } from "@/hooks/use-count-up";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import type { Stat } from "@/types/portfolio";

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const value = useCountUp(stat.value, inView, reduced);

  return (
    <motion.li ref={ref} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
      <p className="font-display text-4xl font-semibold tabular-nums tracking-tight">
        {value}
        {stat.suffix ? <span className="text-2xl text-accent-text">{stat.suffix}</span> : null}
      </p>
      <p className="mt-1 text-sm text-muted">{stat.label}</p>
    </motion.li>
  );
}

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" index="01" eyebrow="ABOUT" title="A short" highlight="version" />
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {portfolio.about.lines.join(" ")}
      </p>
      <motion.ul
        className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {portfolio.about.stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </motion.ul>
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {portfolio.about.focusLabel}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {portfolio.about.focus.map((chip) => (
          <li key={chip} className="rounded-full border border-line bg-card px-3 py-1 font-mono text-xs">
            {chip}
          </li>
        ))}
      </ul>
    </Section>
  );
}
