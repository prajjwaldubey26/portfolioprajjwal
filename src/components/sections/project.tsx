"use client";

import { CreditCard, FileText, ListChecks, ScanSearch, ShieldCheck, Container } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { ScreenshotCarousel } from "@/components/sections/screenshot-carousel";
import { SnippetCard } from "@/components/sections/snippet-card";
import { GlassCard } from "@/components/glass-card";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { buttonStyles } from "@/components/ui/button";
import type { FeatureIcon } from "@/types/portfolio";
import { FaGithub } from "react-icons/fa";

const FEATURE_ICONS: Record<FeatureIcon, LucideIcon> = {
  pdf: FileText,
  quiz: ListChecks,
  scan: ScanSearch,
  shield: ShieldCheck,
  docker: Container,
  pay: CreditCard,
};

const METHOD_COLOR: Record<string, string> = {
  GET: "text-[#6EE7B7]",
  POST: "text-[#38BDF8]",
  PUT: "text-[#FF9900]",
  DELETE: "text-[#FB7185]",
};

export function Project() {
  return (
    <Section id="project" labelledBy="project-title">
      <SectionHeading id="project-title" index="03" eyebrow="PROJECT" title="Flagship" highlight="build" />
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{portfolio.project.name}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{portfolio.project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {portfolio.project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line bg-card px-3 py-1 font-mono text-[11px]">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={portfolio.project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles("secondary")}
        >
          <FaGithub className="h-4 w-4" aria-hidden />
          GitHub
        </a>
      </div>

      <div className="mt-8">
        <ArchitectureDiagram />
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.project.features.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon];
          return (
            <li key={feature.title}>
              <GlassCard tilt className="h-full p-4">
                <Icon className="h-5 w-5 text-accent-text" aria-hidden />
                <h4 className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{feature.title}</h4>
                <p className="mt-2 font-display text-lg font-medium leading-snug">{feature.text}</p>
              </GlassCard>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C0E16] text-zinc-100">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="font-mono text-xs text-zinc-300">12-endpoint REST API</p>
            <p className="mt-1 text-[11px] text-zinc-500">{portfolio.project.endpointNote}</p>
          </div>
          <ul className="space-y-2 p-4 font-mono text-sm">
            {portfolio.project.endpoints.map((endpoint) => (
              <li key={endpoint.path} className="flex gap-3">
                <span className={METHOD_COLOR[endpoint.method]}>{endpoint.method}</span>
                <span>{endpoint.path}</span>
              </li>
            ))}
          </ul>
        </div>
        <SnippetCard />
      </div>

      <div className="mt-6">
        <ScreenshotCarousel />
      </div>
    </Section>
  );
}
