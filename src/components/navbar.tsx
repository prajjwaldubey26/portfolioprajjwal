"use client";

import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { portfolio } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const active = useActiveSection();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dark = !mounted || theme !== "light";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    setTheme(dark ? "light" : "dark");
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled ? "border-line bg-bg/75 backdrop-blur-xl" : "border-transparent bg-bg/40 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight" aria-label="Prajjwal Dubey, back to top">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#FF9900]/40 bg-[#FF9900]/10 text-[#FF9900]">
            PD
          </span>
        </a>

        <LayoutGroup>
          <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
            {portfolio.nav.map((item) => {
              const current = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "nav-link px-1 py-2 text-sm",
                    current ? "nav-link-active text-fg" : "text-muted",
                  )}
                >
                  {item.label}
                  {current ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent"
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={buttonStyles("icon")}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
          </button>
          <a href={portfolio.person.resumeUrl} download className={cn(buttonStyles("primary"), "hidden sm:inline-flex")}>
            Download Resume
          </a>
          <button
            type="button"
            className={cn(buttonStyles("icon"), "md:hidden")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-bg/95 px-5 py-4 backdrop-blur-xl md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {portfolio.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="block rounded-lg px-3 py-3 text-sm"
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={portfolio.person.resumeUrl} download className={cn(buttonStyles("primary"), "mt-3 w-full")} onClick={() => setOpen(false)}>
            Download Resume
          </a>
        </nav>
      ) : null}
    </header>
  );
}
