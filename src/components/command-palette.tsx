"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { scrollToId } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

export function CommandPalette() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(
    () => [
      { id: "about", label: "about", hint: "About", run: () => scrollToId("about") },
      { id: "skills", label: "skills", hint: "Skills", run: () => scrollToId("skills") },
      { id: "project", label: "project", hint: "Flagship project", run: () => scrollToId("project") },
      { id: "roadmap", label: "roadmap", hint: "Cloud journey", run: () => scrollToId("journey") },
      { id: "education", label: "education", hint: "Education", run: () => scrollToId("education") },
      { id: "certs", label: "certs", hint: "Certifications", run: () => scrollToId("certifications") },
      { id: "contact", label: "contact", hint: "Contact", run: () => scrollToId("contact") },
      {
        id: "resume",
        label: "resume",
        hint: "Download resume",
        run: () => {
          window.location.assign(portfolio.person.resumeUrl);
        },
      },
      {
        id: "theme",
        label: "theme",
        hint: "Toggle light / dark",
        run: () => setTheme(theme === "light" ? "dark" : "light"),
      },
      { id: "home", label: "home", hint: "Back to top", run: () => scrollToId("top") },
    ],
    [setTheme, theme],
  );

  const filtered = commands.filter((command) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return command.label.includes(needle) || command.hint.toLowerCase().includes(needle);
  });

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      const metaK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (metaK) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }

      if (event.key === "`" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        if (typing && !open) return;
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = original;
      previousFocus.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query, open]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function run(command: Command | undefined) {
    if (!command) return;
    close();
    command.run();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-start bg-ink/60 px-4 pt-[15vh] backdrop-blur-sm" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-glow"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span className="font-mono text-accent-text" aria-hidden>
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="about, skills, project, contact, resume"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="Command"
            aria-controls="command-list"
            aria-activedescendant={filtered[cursor] ? `command-${filtered[cursor].id}` : undefined}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setCursor((current) => Math.min(filtered.length - 1, current + 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setCursor((current) => Math.max(0, current - 1));
              } else if (event.key === "Enter") {
                event.preventDefault();
                run(filtered[cursor]);
              } else if (event.key === "Escape") {
                event.preventDefault();
                close();
              }
            }}
          />
        </div>
        <ul id="command-list" role="listbox" aria-label="Commands" className="max-h-72 overflow-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-4 text-sm text-muted">No matching command.</li>
          ) : (
            filtered.map((command, index) => (
              <li key={command.id} id={`command-${command.id}`} role="option" aria-selected={index === cursor}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${
                    index === cursor ? "bg-fg/10" : ""
                  }`}
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => run(command)}
                >
                  <span className="font-mono text-accent-text">{command.label}</span>
                  <span className="text-muted">{command.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
