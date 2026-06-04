import { Header } from "@/components/Header";
import { ContactPanel } from "@/components/ContactPanel";
import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <Header />

      <section className="section motion-studies" id="motion-studies">
        <div className="section-kicker">
          <span>Featured Study</span>
          <span>01</span>
        </div>
        <div className="home-feature">
          <article className="motion-study">
            <video
              className="motion-study-video"
              src="/videos/motion-design-intro-2.mp4"
              autoPlay
              loop
              muted
            playsInline
            preload="metadata"
          />
        </article>
          <Link className="work-cta" href="/work">
            <span>View Work</span>
          </Link>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-kicker">
          <span>Contact</span>
          <span>02</span>
        </div>
        <ContactPanel />
      </section>
    </main>
  );
}
