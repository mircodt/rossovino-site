"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { assetSrc } from "@/lib/asset";
import { XIcon } from "./icons";

interface Props {
  images: string[];
  /** Used as alt-text base */
  propertyName: string;
}

/**
 * Photo gallery — responsive masonry-like grid with click-to-zoom lightbox.
 * - Mobile (< sm): 2 columns
 * - Tablet (sm-lg): 3 columns
 * - Desktop (lg+): 3-4 columns with mixed aspect ratios for visual rhythm
 */
export function PhotoGallery({ images, propertyName }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Close on Escape + lock body scroll while lightbox is open
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? null : (i + 1) % images.length));
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

  return (
    <>
      {/* Pattern of varied aspect ratios so the grid breathes. */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {images.map((src, i) => {
          // Vary aspect ratio for a more organic gallery feel.
          const aspect =
            i % 5 === 0
              ? "aspect-[4/5]"
              : i % 3 === 0
              ? "aspect-[4/3]"
              : "aspect-square";
          // First image takes more space on desktop (hero-ish)
          const span =
            i === 0 ? "lg:row-span-2 lg:col-span-2 aspect-[4/3] lg:aspect-square" : aspect;
          return (
            <button
              key={src}
              type="button"
              onClick={() => setOpenIdx(i)}
              aria-label={`${propertyName} — apri foto ${i + 1} di ${images.length}`}
              className={`relative ${span} overflow-hidden rounded-[2px] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              <Image
                src={assetSrc(src)}
                alt={`${propertyName} — foto ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>

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

          {/* Prev */}
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
          {/* Next */}
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

          {/* Image (relative wrapper) */}
          <div
            className="relative w-[92vw] h-[80vh] max-w-6xl"
            onClick={() => setOpenIdx(null)}
          >
            <Image
              src={assetSrc(images[openIdx])}
              alt={`${propertyName} — foto ${openIdx + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/85 text-sm font-mono">
            {openIdx + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
