"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import { Grid2X2, List, X } from "lucide-react";
import { workFilters, type WorkFilter, type WorkItem } from "@/lib/types";
import { EASE } from "./motion/Reveal";
import { RivePreview } from "./RivePreview";

const MotionLink = motion.create(Link);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE, delay: index * 0.055 },
  }),
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.24, ease: "easeOut" } },
};

const toolbarVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const toolbarItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function ArchiveVideo({
  previewEnd,
  previewStart = 0,
  shouldPlay,
  src,
}: {
  previewEnd?: number;
  previewStart?: number;
  shouldPlay: boolean;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setPreviewStart = () => {
      if (video.currentTime < previewStart || (previewEnd && video.currentTime >= previewEnd)) {
        video.currentTime = previewStart;
      }
    };

    setPreviewStart();
    video.addEventListener("loadedmetadata", setPreviewStart);

    return () => {
      video.removeEventListener("loadedmetadata", setPreviewStart);
    };
  }, [previewEnd, previewStart]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !previewEnd) return;

    const loopPreviewSegment = () => {
      if (video.currentTime >= previewEnd) {
        video.currentTime = previewStart;
        if (shouldPlay) {
          void video.play().catch(() => {
            video.pause();
          });
        }
      }
    };

    video.addEventListener("timeupdate", loopPreviewSegment);

    return () => {
      video.removeEventListener("timeupdate", loopPreviewSegment);
    };
  }, [previewEnd, previewStart, shouldPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldPlay) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (previewStart && video.currentTime < previewStart) {
            video.currentTime = previewStart;
          }
          void video.play().catch(() => {
            video.pause();
          });
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [shouldPlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop={!previewEnd}
      muted
      playsInline
      preload="metadata"
    />
  );
}

function WorkMedia({ item, shouldPlay }: { item: WorkItem; shouldPlay: boolean }) {
  if (item.youtube) {
    return (
      <iframe
        src={item.youtube}
        title={item.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  if (item.video) {
    return (
      <ArchiveVideo
        previewEnd={item.previewEnd}
        previewStart={item.previewStart}
        shouldPlay={shouldPlay}
        src={item.video}
      />
    );
  }

  if (item.rive) {
    return (
      <RivePreview
        src={item.rive}
        artboard={item.artboard}
        stateMachine={item.stateMachine}
      />
    );
  }

  return <span>{item.code}</span>;
}

export function WorkIndex({ items }: { items: WorkItem[] }) {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("Everything");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeVideo, setActiveVideo] = useState<WorkItem | null>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const filteredItems = useMemo(() => {
    if (activeFilter === "Everything") return items;
    return items.filter((item) => item.tags.includes(activeFilter));
  }, [activeFilter, items]);

  // Modal keyboard nav: Esc closes, arrows or A/D jump prev/next (wraps around)
  useEffect(() => {
    if (!activeVideo) return;

    const playable = filteredItems.filter((item) => item.video || item.youtube);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
        return;
      }

      const key = event.key.toLowerCase();
      const direction =
        event.key === "ArrowRight" || key === "d" ? 1 : event.key === "ArrowLeft" || key === "a" ? -1 : 0;
      if (!direction) return;

      const index = playable.findIndex((item) => item.slug === activeVideo.slug);
      if (index === -1) return;

      event.preventDefault();
      setActiveVideo(playable[(index + direction + playable.length) % playable.length]);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeVideo, filteredItems]);

  return (
    <MotionConfig reducedMotion="user">
    <section className="work-archive">
      <motion.div
        className="archive-toolbar"
        variants={toolbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="filter-row" aria-label="Work filters">
          {workFilters.map((filter) => (
            <motion.button
              className={filter === activeFilter ? "is-active" : ""}
              key={filter}
              type="button"
              variants={toolbarItemVariants}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        <motion.div className="view-toggle" aria-label="View mode" variants={toolbarItemVariants}>
          <button
            className={view === "list" ? "is-active" : ""}
            type="button"
            aria-label="List view"
            onClick={() => setView("list")}
          >
            <List size={26} strokeWidth={2.5} />
          </button>
          <button
            className={view === "grid" ? "is-active" : ""}
            type="button"
            aria-label="Grid view"
            onClick={() => setView("grid")}
          >
            <Grid2X2 size={22} strokeWidth={2.5} />
          </button>
        </motion.div>
      </motion.div>

      {filteredItems.length > 0 ? (
        <div className={`archive-grid ${view === "list" ? "is-list" : ""}`}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const motionProps = {
                layout: true,
                variants: cardVariants,
                initial: "hidden" as const,
                animate: "visible" as const,
                exit: "exit" as const,
                custom: index,
                transition: { layout: { duration: 0.55, ease: EASE } },
              };

              const content = (
                <>
                  <div className="archive-media" style={{ "--accent": item.accent } as React.CSSProperties}>
                    <WorkMedia item={item} shouldPlay={item.autoplayPreview === true || activePreview === item.slug} />
                  </div>
                  <div className="archive-meta">
                    <span>{item.eyebrow}</span>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </>
              );

              if (item.video || item.youtube) {
                return (
                  <motion.button
                    className="archive-card archive-card-button"
                    key={item.slug}
                    type="button"
                    {...motionProps}
                    onBlur={() => setActivePreview(null)}
                    onClick={() => setActiveVideo(item)}
                    onFocus={() => setActivePreview(item.slug)}
                    onMouseEnter={() => setActivePreview(item.slug)}
                    onMouseLeave={() => setActivePreview(null)}
                  >
                    {content}
                  </motion.button>
                );
              }

              if (item.href) {
                return (
                  <MotionLink className="archive-card" href={item.href} key={item.slug} {...motionProps}>
                    {content}
                  </MotionLink>
                );
              }

              return (
                <motion.article className="archive-card" key={item.slug} {...motionProps}>
                  {content}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          className="archive-empty"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <p>No work in {activeFilter} yet.</p>
        </motion.div>
      )}

      {activeVideo && (activeVideo.video || activeVideo.youtube) ? (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.title} video player`}
        >
          <button className="video-modal-backdrop" type="button" aria-label="Close video" onClick={() => setActiveVideo(null)} />
          <div className="video-player-shell">
            <button className="video-close" type="button" aria-label="Close video" onClick={() => setActiveVideo(null)}>
              <X size={34} strokeWidth={1.8} />
            </button>
            {activeVideo.youtube ? (
              <iframe
                key={activeVideo.slug}
                src={activeVideo.youtube}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video key={activeVideo.slug} src={activeVideo.video} controls autoPlay playsInline />
            )}
            <div className="video-caption">
              <span>{activeVideo.eyebrow}</span>
              <strong>{activeVideo.title}</strong>
              <span className="video-hint">← → or A / D to browse · Esc to close</span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
    </MotionConfig>
  );
}
