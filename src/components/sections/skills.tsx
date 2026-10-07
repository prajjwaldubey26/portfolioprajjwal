"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { GlassCard } from "@/components/glass-card";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { TechIcon } from "@/components/tech-icon";
import { cn } from "@/lib/utils";
import type { SkillFilter, SkillGroup, SkillTone } from "@/types/portfolio";

const TONE: Record<SkillTone, string> = {
  accent: "hover:border-[#FF9900]/55 hover:shadow-[0_0_36px_-16px_rgba(255,153,0,0.85)]",
  cyan: "hover:border-[#38BDF8]/55 hover:shadow-[0_0_36px_-16px_rgba(56,189,248,0.8)]",
  violet: "hover:border-[#8B5CF6]/55 hover:shadow-[0_0_36px_-16px_rgba(139,92,246,0.8)]",
};

const FILTER_TONE: Record<SkillFilter, SkillTone> = {
  cloud: "accent",
  devops: "cyan",
  backend: "violet",
  frontend: "cyan",
};

export function Skills() {
  const [filter, setFilter] = useState<(typeof portfolio.skillFilters)[number]["id"]>("all");

  const groups = useMemo<SkillGroup[]>(() => {
    if (filter === "all") return portfolio.skillGroups;
    const match = portfolio.skillFilters.find((item) => item.id === filter);
    return [
      {
        id: filter,
        label: match?.label ?? filter,
        tone: FILTER_TONE[filter],
        skills: portfolio.skillGroups.flatMap((group) =>
          group.skills.filter((skill) => skill.filters.includes(filter)),
        ),
      },
    ];
  }, [filter]);

  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" index="02" eyebrow="SKILLS" title="Tools I" highlight="actually use" />
      <LayoutGroup>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter skills">
          {portfolio.skillFilters.map((item) => {
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={cn(
                  "relative min-h-11 rounded-full border px-4 font-mono text-xs tracking-wide",
                  selected ? "border-transparent text-ink" : "border-line text-muted hover:text-fg",
                )}
                onClick={() => setFilter(item.id)}
              >
                {selected ? (
                  <motion.span layoutId="skill-filter" className="absolute inset-0 rounded-full bg-accent" />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 space-y-8" role="tabpanel">
          <AnimatePresence mode="popLayout">
            {groups.map((group) => (
              <motion.div key={group.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{group.label}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {group.skills.map((skill) => (
                    <motion.div key={skill.name} layout>
                      <GlassCard tilt className={cn("h-full p-4", TONE[group.tone])}>
                        <TechIcon name={skill.icon} />
                        <p className="mt-4 text-sm font-medium">{skill.name}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </Section>
  );
}
