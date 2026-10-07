"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import type { MouseEvent } from "react";
import { FaAws, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiDocker, SiLinux, SiOpenjdk, SiReact } from "react-icons/si";
import type { IconType } from "react-icons";
import { portfolio } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/use-typewriter";
import { MagneticLink } from "@/components/magnetic-link";
import { TerminalWindow } from "@/components/sections/terminal-window";
import { buttonStyles } from "@/components/ui/button";
import { useToast } from "@/components/toast";
import { isPlaceholder } from "@/lib/utils";

const BADGES: Record<string, IconType> = {
  AWS: FaAws,
  Docker: SiDocker,
  Linux: SiLinux,
  Java: SiOpenjdk,
  React: SiReact,
};

const BADGE_COLOR: Record<string, string> = {
  AWS: "#FF9900",
  Docker: "#2496ED",
  Linux: "currentColor",
  Java: "#EA2D2E",
  React: "#61DAFB",
};

function SplitText({
  text,
  className,
  letterClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;
}) {
  return (
    <span className={className} aria-hidden>
      {text.split("").map((character, index) => (
        <span key={`${character}-${index}`} className="inline-block overflow-hidden pb-1">
          <motion.span
            className={`inline-block ${letterClassName ?? ""}`}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.55, delay: delay + index * 0.035, ease: [0.22, 1, 0.36, 1] }}
          >
            {character}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const phrase = useTypewriter(portfolio.hero.phrases);
  const toast = useToast();

  async function onEmail() {
    if (isPlaceholder(portfolio.person.email)) {
      toast("Set person.email in src/data/portfolio.ts");
      return;
    }
    try {
      await navigator.clipboard.writeText(portfolio.person.email);
      toast("Email copied");
    } catch {
      toast("Could not copy email");
    }
  }

  function onLinkedIn(event: MouseEvent<HTMLAnchorElement>) {
    if (!isPlaceholder(portfolio.person.linkedin)) return;
    event.preventDefault();
    toast("Set person.linkedin in src/data/portfolio.ts");
  }

  function onX(event: MouseEvent<HTMLAnchorElement>) {
    if (!isPlaceholder(portfolio.person.x)) return;
    event.preventDefault();
    toast("Set person.x in src/data/portfolio.ts");
  }

  return (
    <section id="top" className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#FF9900]/45 shadow-glow sm:hidden">
            <Image
              src={portfolio.person.photo}
              alt={`Portrait of ${portfolio.person.name}`}
              fill
              sizes="64px"
              className="object-cover object-[center_18%]"
              priority
            />
          </div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 font-mono text-[11px] text-ok">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-70 motion-safe:animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-ok" />
            </span>
            {portfolio.hero.status}
          </p>
        </div>

        <h1 aria-label={portfolio.person.name} className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
          <SplitText text={portfolio.person.given} className="block" />
          <span className="mt-1 block overflow-hidden pb-1" aria-hidden>
            <motion.span
              className="gradient-text inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {portfolio.person.family}
            </motion.span>
          </span>
        </h1>

        <p className="sr-only">{portfolio.hero.phrases.join(". ")}</p>
        <p className="mt-6 min-h-8 font-mono text-sm text-accent-text sm:text-base" aria-hidden>
          <span className="text-muted">&gt; </span>
          {phrase}
          <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent motion-safe:animate-pulse" />
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{portfolio.hero.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <MagneticLink href="#project" className={buttonStyles("primary")}>
            {portfolio.hero.primaryCta}
          </MagneticLink>
          <MagneticLink href={portfolio.person.resumeUrl} download className={buttonStyles("secondary")}>
            <Download className="h-4 w-4" aria-hidden />
            {portfolio.hero.secondaryCta}
          </MagneticLink>
          <a
            href={portfolio.person.github}
            className={buttonStyles("icon")}
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={isPlaceholder(portfolio.person.linkedin) ? "#contact" : portfolio.person.linkedin}
            className={buttonStyles("icon")}
            aria-label="LinkedIn profile"
            target={isPlaceholder(portfolio.person.linkedin) ? undefined : "_blank"}
            rel={isPlaceholder(portfolio.person.linkedin) ? undefined : "noopener noreferrer"}
            onClick={onLinkedIn}
          >
            <FaLinkedinIn className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={isPlaceholder(portfolio.person.x) ? "#contact" : portfolio.person.x}
            className={buttonStyles("icon")}
            aria-label="X profile"
            target={isPlaceholder(portfolio.person.x) ? undefined : "_blank"}
            rel={isPlaceholder(portfolio.person.x) ? undefined : "noopener noreferrer"}
            onClick={onX}
          >
            <FaXTwitter className="h-4 w-4" aria-hidden />
          </a>
          <button type="button" className={buttonStyles("icon")} aria-label="Copy email" onClick={onEmail}>
            <Mail className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,153,0,0.18),transparent_62%)] blur-2xl" aria-hidden />
        <div className="mb-4 hidden items-end gap-4 sm:flex">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-[#FF9900]/40 shadow-glow lg:h-52 lg:w-40"
          >
            <Image
              src={portfolio.person.photo}
              alt={`Portrait of ${portfolio.person.name}`}
              fill
              sizes="(min-width: 1024px) 160px, 144px"
              className="object-cover object-[center_18%]"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" aria-hidden />
          </motion.div>
          <ul className="flex flex-1 flex-wrap gap-2 pb-1" aria-hidden>
            {portfolio.hero.badges.map((name, index) => {
              const Icon = BADGES[name];
              if (!Icon) return null;
              return (
                <li
                  key={name}
                  className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs motion-safe:animate-floaty"
                  style={{ animationDelay: `${index * 0.35}s` }}
                >
                  <Icon className="h-3.5 w-3.5" color={BADGE_COLOR[name]} aria-hidden />
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="mb-4 flex flex-wrap gap-2 sm:hidden" aria-hidden>
          {portfolio.hero.badges.map((name, index) => {
            const Icon = BADGES[name];
            if (!Icon) return null;
            return (
              <li
                key={name}
                className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs motion-safe:animate-floaty"
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                <Icon className="h-3.5 w-3.5" color={BADGE_COLOR[name]} aria-hidden />
                {name}
              </li>
            );
          })}
        </ul>
        <TerminalWindow />
      </div>
    </section>
  );
}
