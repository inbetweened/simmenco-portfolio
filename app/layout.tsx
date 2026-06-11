import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { SanityLive } from "@/lib/sanity/live";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);

  return {
    title: settings?.seoTitle ?? "Daniel Simmen Portfolio",
    description:
      settings?.seoDescription ?? "A motion-led portfolio for design, systems, and digital craft.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <body>
        {children}
        <SanityLive />
        {isDraftMode ? (
          <>
            <VisualEditing />
            <a className="exit-draft" href="/api/draft-mode/disable">
              Exit draft mode
            </a>
          </>
        ) : null}
      </body>
    </html>
  );
}
