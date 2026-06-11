import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);

  return {
    title: settings?.seoTitle ?? "Daniel Simmen Portfolio",
    description:
      settings?.seoDescription ?? "A motion-led portfolio for design, systems, and digital craft.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
