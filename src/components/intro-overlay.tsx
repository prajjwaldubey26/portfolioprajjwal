"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pd-intro";

export function IntroOverlay() {
  const [show, setShow] = useState(false);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* Private mode can block storage. The intro simply will not persist. */
    }
    setShow(false);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = true;
    }
    if (reduced || seen) return;

    setShow(true);
    const timeout = window.setTimeout(dismiss, 1000);
    return () => window.clearTimeout(timeout);
  }, [dismiss]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[70] grid place-items-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={dismiss}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-line px-4 py-2 text-xs text-muted"
            onClick={dismiss}
          >
            Skip
          </button>
          <div className="text-center" aria-hidden>
            <motion.div
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-[#FF9900]/40 bg-[#FF9900]/10 font-display text-2xl text-[#FF9900]"
            >
              PD
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="mt-6 font-display text-2xl tracking-tight sm:text-3xl"
            >
              PRAJJWAL DUBEY
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
