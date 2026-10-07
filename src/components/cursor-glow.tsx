"use client";

import { useEffect, useRef } from "react";

/** Desktop-only glow. Stays behind content so text contrast is unchanged. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
      if (ref.current) {
        ref.current.style.transform = `translate3d(${event.clientX - 144}px, ${event.clientY - 144}px, 0)`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-0 h-72 w-72 rounded-full blur-3xl"
      style={{
        transform: "translate3d(-999px, -999px, 0)",
        background:
          "radial-gradient(circle, rgba(255,153,0,0.28), rgba(56,189,248,0.12) 42%, transparent 70%)",
      }}
    />
  );
}
