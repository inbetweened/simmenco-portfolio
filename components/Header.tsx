"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoAnimation } from "./LogoAnimation";

type HeaderProps = {
  statement?: string | null;
  email?: string | null;
  linkedin?: string | null;
};

export function Header({ statement, email, linkedin }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const headerStatement =
    statement ?? "A collection of work across print, motion, digital, and everything in between.";
  const emailAddress = email ?? "daniel@simmen.co";
  const linkedinUrl = linkedin ?? "https://www.linkedin.com/in/danielsimmen";

  return (
    <header className={`site-header ${isOpen ? "menu-open" : ""}`}>
      <Link href="/" className="brand-mark" aria-label="DS home" onClick={() => setIsOpen(false)}>
        <LogoAnimation />
      </Link>
      <p className="header-statement">{headerStatement}</p>
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
