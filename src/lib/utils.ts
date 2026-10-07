import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True when a portfolio.ts value is still a bracketed placeholder such as "[City]". */
export function isPlaceholder(value: string): boolean {
  return /^\[[\s\S]+\]$/.test(value.trim());
}

export function scrollToId(id: string) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}
