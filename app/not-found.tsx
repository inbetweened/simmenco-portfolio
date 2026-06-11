import Link from "next/link";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function NotFound() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <main className="page-shell">
      <Header
        statement={settings?.headerStatement}
        email={settings?.email}
        linkedin={settings?.linkedin}
      />
      <section className="not-found">
        <Reveal y={20}>
          <span className="not-found-code">404 — Not Found</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1>This page went missing.</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p>Maybe it moved, maybe it never existed. The work is exactly where it should be.</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="not-found-actions">
            <Link className="work-cta" href="/work">
              <span>View Work</span>
            </Link>
            <Link className="back-link" href="/">
              Back home
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
