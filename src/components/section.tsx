"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"section"> & {
  children: ReactNode;
  labelledBy?: string;
};

export function Section({ id, children, className, labelledBy, ...props }: Props) {
  return (
    <motion.section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-24 py-20 sm:py-28", className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </motion.section>
  );
}
