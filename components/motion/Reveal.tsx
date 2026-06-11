"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate when scrolled into view instead of on mount (for below-the-fold content). */
  inView?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 28, inView = false }: RevealProps) {
  const visible = { opacity: 1, y: 0 };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        {...(inView
          ? { whileInView: visible, viewport: { once: true, margin: "-80px" } }
          : { animate: visible })}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
