"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Grid2X2, List, X } from "lucide-react";
import { workFilters, type WorkFilter, type WorkItem } from "@/lib/types";
import { RivePreview } from "./RivePreview";

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

  return (
    <section className="work-archive">
      <div className="archive-toolbar">
        <div className="filter-row" aria-label="Work filters">
          {workFilters.map((filter) => (
            <button
              className={filter === activeFilter ? "is-active" : ""}
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="view-toggle" aria-label="View mode">
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
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className={`archive-grid ${view === "list" ? "is-list" : ""}`}>
          {filteredItems.map((item) => {
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
              <button
                className="archive-card archive-card-button"
                key={item.slug}
                type="button"
                onBlur={() => setActivePreview(null)}
                onClick={() => setActiveVideo(item)}
                onFocus={() => setActivePreview(item.slug)}
                onMouseEnter={() => setActivePreview(item.slug)}
                onMouseLeave={() => setActivePreview(null)}
              >
                {content}
              </button>
            );
          }

          if (item.href) {
            return (
              <Link className="archive-card" href={item.href} key={item.slug}>
                  {content}
                </Link>
              );
            }

            return (
              <article className="archive-card" key={item.slug}>
                {content}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="archive-empty">
          <p>No work in {activeFilter} yet.</p>
        </div>
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
                src={activeVideo.youtube}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video src={activeVideo.video} controls autoPlay playsInline />
            )}
            <div className="video-caption">
              <span>{activeVideo.eyebrow}</span>
              <strong>{activeVideo.title}</strong>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
