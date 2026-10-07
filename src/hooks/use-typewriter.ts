"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Phase = "type" | "hold" | "delete";

export function useTypewriter(phrases: readonly string[]) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("type");

  useEffect(() => {
    const phrase = phrases[index] ?? "";

    if (reduced) {
      setText(phrase);
      const timeout = window.setTimeout(() => {
        setIndex((current) => (current + 1) % phrases.length);
      }, 2200);
      return () => window.clearTimeout(timeout);
    }

    if (phase === "hold") {
      const timeout = window.setTimeout(() => setPhase("delete"), 1400);
      return () => window.clearTimeout(timeout);
    }

    if (phase === "type") {
      if (text === phrase) {
        setPhase("hold");
        return;
      }
      const timeout = window.setTimeout(() => {
        setText(phrase.slice(0, text.length + 1));
      }, 55);
      return () => window.clearTimeout(timeout);
    }

    if (text.length === 0) {
      setPhase("type");
      setIndex((current) => (current + 1) % phrases.length);
      return;
    }

    const timeout = window.setTimeout(() => {
      setText(text.slice(0, -1));
    }, 28);
    return () => window.clearTimeout(timeout);
  }, [index, phase, phrases, reduced, text]);

  return text;
}
