import { Header } from "@/components/Header";
import { ContactPanel } from "@/components/ContactPanel";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function Home() {
  const settings = await getSiteSettings();
  const featuredVideo = settings?.featuredVideo ?? "/videos/motion-design-intro-2.mp4";

  return (
    <main className="page-shell">
      <Header
        statement={settings?.headerStatement}
        email={settings?.email}
        linkedin={settings?.linkedin}
      />

      <section className="section motion-studies" id="motion-studies">
        <div className="section-kicker">
          <span>Featured Study</span>
          <span>01</span>
        </div>
        <div className="home-feature">
          <Reveal delay={0.18} y={40}>
            <article className="motion-study">
              <video
                className="motion-study-video"
                src={featuredVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </article>
          </Reveal>
          <Reveal delay={0.32}>
            <Link className="work-cta" href="/work">
              <span>View Work</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" id="contact">
        <Reveal inView y={20}>
          <div className="section-kicker">
            <span>Contact</span>
            <span>02</span>
          </div>
        </Reveal>
        <Reveal inView delay={0.1}>
          <ContactPanel
            heading={settings?.contactHeading}
            body={settings?.contactBody}
            email={settings?.email}
            linkedin={settings?.linkedin}
          />
        </Reveal>
      </section>
    </main>
  );
}
