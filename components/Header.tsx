"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoAnimation } from "./LogoAnimation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`site-header ${isOpen ? "menu-open" : ""}`}>
      <Link href="/" className="brand-mark" aria-label="DS home" onClick={() => setIsOpen(false)}>
        <LogoAnimation />
      </Link>
      <p className="header-statement">
        A collection of work across print, motion, digital, and everything in between.
      </p>
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
          <span>(c) 2026 Daniel Simmen</span>
          <a href="mailto:daniel@simmen.co">
            Email
          </a>
          <a href="https://www.linkedin.com/in/danielsimmen" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </nav>
    </header>
  );
}
