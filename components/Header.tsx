"use client";

import { useState } from "react";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "./motion/Reveal";

type HeaderProps = {
  statement?: string | null;
  email?: string | null;
  linkedin?: string | null;
};

export function Header({ statement, email, linkedin }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // statement lags behind the page scroll for a subtle depth cue
  const statementDrift = useTransform(scrollY, [0, 700], [0, 46]);
  const headerStatement =
    statement ?? "A collection of work across print, motion, digital, and everything in between.";
  const emailAddress = email ?? "daniel@simmen.co";
  const linkedinUrl = linkedin ?? "https://www.linkedin.com/in/danielsimmen";

  return (
    <header className={`site-header ${isOpen ? "menu-open" : ""}`}>
      <Link href="/" className="brand-mark" aria-label="Home" onClick={() => setIsOpen(false)}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 21 V10 L12 3.5 L20 10 V21 H14.5 V14.5 H9.5 V21 Z"
            pathLength={100}
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <MotionConfig reducedMotion="user">
        <motion.p
          className="header-statement"
          style={reduceMotion ? undefined : { y: statementDrift }}
        >
          <span className="reveal-mask">
            <motion.span
              className="reveal-line"
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            >
              {headerStatement}
            </motion.span>
          </span>
        </motion.p>
      </MotionConfig>
      <div className="header-actions">
        <Link href="/work" onClick={() => setIsOpen(false)}>
          Work
        </Link>
        <Link href="/#contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>
        <button
          className="icon-button menu-button"
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="menu-line" />
          <span className="menu-line" />
          <span className="menu-line" />
        </button>
      </div>
      {isOpen ? (
        <button
          className="menu-scrim"
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        />
      ) : null}
      <nav className={`menu-panel ${isOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        <div className="menu-links">
          <Link href="/work" onClick={() => setIsOpen(false)}>
            Work
          </Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
        <div className="menu-footer">
          <span>© 2026 Daniel Simmen</span>
          <a href={`mailto:${emailAddress}`}>
            Email
          </a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </nav>
    </header>
  );
}
