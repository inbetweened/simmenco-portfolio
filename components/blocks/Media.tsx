import type { MediaItem } from "@/lib/types";

/** Renders one media item (video file, YouTube embed, or image). */
export function BlockMedia({ item, imageWidth = 1600 }: { item: MediaItem; imageWidth?: number }) {
  if (item.video) {
    return <video src={item.video} autoPlay muted loop playsInline preload="metadata" />;
  }

  if (item.youtube) {
    return (
      <iframe
        src={item.youtube}
        title={item.caption ?? "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  if (item.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`${item.image}?w=${imageWidth}&auto=format`} alt={item.alt ?? item.caption ?? ""} loading="lazy" />
    );
  }

  return null;
}
