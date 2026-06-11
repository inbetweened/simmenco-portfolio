import { PortableText } from "@portabletext/react";
import type {
  CreditsBlock,
  HeroBlock,
  ImageBlock,
  MediaGridBlock,
  PageBlock,
  StatementBlock,
  TextBlock,
  VideoBlock,
} from "@/lib/types";
import { BlockMedia } from "./Media";
import { Carousel } from "./Carousel";

function Hero({ block, title }: { block: HeroBlock; title: string }) {
  const hasMedia = block.video || block.youtube || block.image;
  return (
    <section className={`case-block case-hero-block ${block.fullBleed === false ? "is-contained" : "is-full"}`}>
      {block.heading ? <h2>{block.heading}</h2> : null}
      {hasMedia ? (
        <div className="case-media-frame">
          <BlockMedia
            item={{ _key: block._key, video: block.video, youtube: block.youtube, image: block.image, alt: title }}
            imageWidth={2400}
          />
        </div>
      ) : null}
    </section>
  );
}

function Video({ block }: { block: VideoBlock }) {
  const media = (
    <div className="case-media-frame">
      <BlockMedia
        item={{
          _key: block._key,
          video: block.autoplay === false ? null : block.video,
          youtube: block.youtube,
          caption: block.caption,
        }}
      />
      {block.autoplay === false && block.video ? (
        <video src={block.video} controls playsInline preload="metadata" />
      ) : null}
    </div>
  );

  if (block.layout === "split") {
    return (
      <section className="case-block case-video is-split">
        {media}
        <p className="case-side-text">{block.text}</p>
        {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      </section>
    );
  }

  return (
    <section className={`case-block case-video ${block.layout === "full" ? "is-full" : "is-contained"}`}>
      {media}
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </section>
  );
}

function Text({ block }: { block: TextBlock }) {
  return (
    <section className={`case-block case-text ${block.layout === "wide" ? "is-wide" : "is-narrow"}`}>
      {block.label ? <span className="case-label">{block.label}</span> : null}
      <div className="case-text-body">
        {block.heading ? <h2>{block.heading}</h2> : null}
        {block.body ? <PortableText value={block.body as never} /> : null}
      </div>
    </section>
  );
}

function Statement({ block }: { block: StatementBlock }) {
  if (block.variant === "stat") {
    return (
      <section className={`case-block case-statement is-stat ${block.useAccent ? "use-accent" : ""}`}>
        <strong>{block.statValue}</strong>
        <span>{block.statLabel}</span>
      </section>
    );
  }

  return (
    <section
      className={`case-block case-statement ${block.variant === "quote" ? "is-quote" : "is-transition"} ${block.useAccent ? "use-accent" : ""}`}
    >
      <p>{block.text}</p>
    </section>
  );
}

function MediaGrid({ block }: { block: MediaGridBlock }) {
  const items = block.items ?? [];
  return (
    <section className={`case-block case-grid cols-${block.columns === 3 ? 3 : 2}`}>
      {items.map((item) => (
        <figure key={item._key}>
          <div className="case-media-frame">
            <BlockMedia item={item} imageWidth={1200} />
          </div>
          {item.caption ? <figcaption>{item.caption}</figcaption> : null}
        </figure>
      ))}
    </section>
  );
}

function Image({ block }: { block: ImageBlock }) {
  if (!block.image) return null;
  return (
    <section className={`case-block case-image ${block.layout === "full" ? "is-full" : "is-contained"}`}>
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${block.image}?w=${block.layout === "full" ? 2400 : 1600}&auto=format`}
          alt={block.alt ?? block.caption ?? ""}
          loading="lazy"
        />
        {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      </figure>
    </section>
  );
}

function Credits({ block }: { block: CreditsBlock }) {
  const groups = block.groups ?? [];
  return (
    <section className="case-block case-credits">
      <span className="case-label">Credits</span>
      <div className="case-credit-groups">
        {groups.map((group) => (
          <div className="case-credit-group" key={group._key}>
            <strong>{group.title}</strong>
            <ul>
              {(group.names ?? []).map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BlockRenderer({ block, title }: { block: PageBlock; title: string }) {
  switch (block._type) {
    case "heroBlock":
      return <Hero block={block} title={title} />;
    case "videoBlock":
      return <Video block={block} />;
    case "textBlock":
      return <Text block={block} />;
    case "statementBlock":
      return <Statement block={block} />;
    case "carouselBlock":
      return (
        <section className="case-block case-carousel-block">
          <Carousel items={block.items ?? []} caption={block.caption} />
        </section>
      );
    case "mediaGridBlock":
      return <MediaGrid block={block} />;
    case "imageBlock":
      return <Image block={block} />;
    case "creditsBlock":
      return <Credits block={block} />;
    case "spacerBlock":
      return <div className={`case-block case-spacer is-${block.size ?? "medium"}`} aria-hidden="true" />;
    default:
      return null;
  }
}
