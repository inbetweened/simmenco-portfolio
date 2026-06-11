"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@/lib/types";
import { BlockMedia } from "./Media";

export function Carousel({ items, caption }: { items: MediaItem[]; caption?: string | null }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  if (count === 0) return null;

  const go = (direction: number) => {
    setIndex((current) => (current + direction + count) % count);
  };

  const current = items[index];

  return (
    <figure className="case-carousel">
      <div className="case-carousel-frame">
        <BlockMedia item={current} key={current._key} />
      </div>
      <figcaption className="case-carousel-bar">
        <span>{current.caption ?? caption ?? ""}</span>
        <span className="case-carousel-controls">
          <button type="button" aria-label="Previous slide" onClick={() => go(-1)}>
            <ChevronLeft size={20} strokeWidth={2.2} />
          </button>
          <span className="case-carousel-count">
            {index + 1} / {count}
          </span>
          <button type="button" aria-label="Next slide" onClick={() => go(1)}>
            <ChevronRight size={20} strokeWidth={2.2} />
          </button>
        </span>
      </figcaption>
    </figure>
  );
}
