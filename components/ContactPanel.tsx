"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Link as LinkIcon, Mail } from "lucide-react";

const email = "daniel@simmen.co";
const linkedin = "https://www.linkedin.com/in/danielsimmen";

export function ContactPanel() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="contact-panel">
      <div className="contact-copy">
        <h2>Let&apos;s Make It Sharp.</h2>
        <p>
          Available for motion design, visual systems, interactive web work, and brand-led digital projects.
        </p>
      </div>

      <div className="contact-actions" aria-label="Contact options">
        <a className="contact-primary" href={`mailto:${email}`}>
          <Mail size={26} strokeWidth={2.1} />
          <span>{email}</span>
        </a>

        <button className="contact-action" type="button" onClick={copyEmail}>
          {copied ? <Check size={24} strokeWidth={2.3} /> : <Copy size={24} strokeWidth={2.1} />}
          <span>{copied ? "Copied" : "Copy Email"}</span>
        </button>

        <a className="contact-action" href={`mailto:${email}?subject=Project%20Inquiry`}>
          <ArrowUpRight size={24} strokeWidth={2.1} />
          <span>Project Inquiry</span>
        </a>

        <a className="contact-action" href={linkedin} target="_blank" rel="noreferrer">
          <LinkIcon size={24} strokeWidth={2.1} />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
