"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { assetSrc } from "@/lib/asset";
import { ChevronIcon, XIcon } from "./icons";

interface Props {
  images: string[];
  /** Used as alt-text base */
  propertyName: string;
}

/**
 * Horizontal photo gallery — drag/swipe to scroll left/right with snap.
 * Includes prev/next arrows on desktop and a click-to-zoom lightbox
 * with keyboard navigation (← → Esc).
 */
export function PhotoGallery({ images, propertyName }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll + Esc/arrow keys while lightbox is open
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight")
        setOpenIdx((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIdx((i) =>
          i === null ? null : (i - 1 + images.length) % images.length,
        );
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIdx, images.length]);

  /** Scroll the strip by one card width in the requested direction. */
  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Pick the rendered card width + the gap (matches gap-3/4 below).
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Strip */}
      <div
        ref={scrollerRef}
        className="
          flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4
          pb-2 -mx-5 px-5 md:-mx-8 md:px-8
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
        aria-label={`Galleria ${propertyName} — scorri per vedere tutte le foto`}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            data-card
            onClick={() => setOpenIdx(i)}
            aria-label={`Apri foto ${i + 1} di ${images.length}`}
            className="
              flex-none snap-start relative
              w-[78%] sm:w-[58%] md:w-[42%] lg:w-[32%] xl:w-[28%]
              aspect-[4/3] overflow-hidden rounded-[2px]
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              group
            "
          >
            <Image
              src={assetSrc(src)}
              alt={`${propertyName} — foto ${i + 1}`}
              fill
              sizes="(max-width: 768px) 78vw, (max-width: 1024px) 42vw, 32vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Prev / Next arrows — desktop only */}
      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Foto precedente"
        className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center bg-white/95 hover:bg-white text-[var(--color-ink)] rounded-full shadow-md transition-colors -translate-x-1/2"
      >
        <ChevronIcon className="w-5 h-5 rotate-90" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Foto successiva"
        className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center bg-white/95 hover:bg-white text-[var(--color-ink)] rounded-full shadow-md transition-colors translate-x-1/2"
      >
        <ChevronIcon className="w-5 h-5 -rotate-90" aria-hidden />
      </button>

      {/* Scroll hint chip — mobile only */}
      <p className="md:hidden text-center text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mt-3">
        ← scorri →
      </p>

      {/* Lightbox */}
      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${openIdx + 1} di ${images.length}`}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
        >
          <button
            type="button"
            onClick={() => setOpenIdx(null)}
            aria-label="Chiudi galleria"
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-white/85 hover:text-white bg-white/10 hover:bg-white/20 rounded-full"
          >
            <XIcon className="w-6 h-6" aria-hidden />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length));
            }}
            aria-label="Foto precedente"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/85 hover:text-white bg-white/10 hover:bg-white/20 rounded-full text-2xl"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((i) => (i === null ? null : (i + 1) % images.length));
            }}
            aria-label="Foto successiva"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/85 hover:text-white bg-white/10 hover:bg-white/20 rounded-full text-2xl"
          >
            ›
          </button>

          <div className="relative w-[92vw] h-[80vh] max-w-6xl" onClick={() => setOpenIdx(null)}>
            <Image
              src={assetSrc(images[openIdx])}
              alt={`${propertyName} — foto ${openIdx + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/85 text-sm font-mono">
            {openIdx + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
