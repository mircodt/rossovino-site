"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { assetSrc } from "@/lib/asset";
import { XIcon } from "./icons";

interface Props {
  room: {
    name: string;
    description?: string;
    photos: string[];
  };
  /** Used for alt-text */
  propertyName: string;
}

/**
 * "Stanza completa" gallery — shows every photo of a single room so the
 * visitor sees exactly what a stay looks like. Layout:
 *
 * - A large hero photo on the left (the room's signature shot)
 * - A 2- or 3-column grid of secondary shots on the right
 * - Click any photo to open the lightbox
 *
 * Mobile: collapses to a single-column stack with the hero on top.
 */
export function RoomExample({ room, propertyName }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const photos = room.photos;
  const altBase = `${propertyName} — camera ${room.name}`;

  // Lightbox keyboard nav + body scroll lock
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight")
        setOpenIdx((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpenIdx((i) =>
          i === null ? null : (i - 1 + photos.length) % photos.length,
        );
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIdx, photos.length]);

  // First photo gets the big hero treatment; the rest go in a grid.
  const [hero, ...rest] = photos;

  return (
    <div>
      {/* Layout: 1 col on mobile, 2 cols on lg (hero left, grid right) */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3 md:gap-4">
        {/* Hero photo */}
        <button
          type="button"
          onClick={() => setOpenIdx(0)}
          aria-label={`Apri foto 1 di ${photos.length}`}
          className="group relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Image
            src={assetSrc(hero)}
            alt={altBase}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </button>

        {/* Grid of remaining photos */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 content-start">
          {rest.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpenIdx(idx + 1)}
              aria-label={`Apri foto ${idx + 2} di ${photos.length}`}
              className="group relative aspect-square overflow-hidden rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Image
                src={assetSrc(src)}
                alt={`${altBase} — dettaglio ${idx + 2}`}
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${openIdx + 1} di ${photos.length}`}
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
              setOpenIdx((i) =>
                i === null ? null : (i - 1 + photos.length) % photos.length,
              );
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
              setOpenIdx((i) => (i === null ? null : (i + 1) % photos.length));
            }}
            aria-label="Foto successiva"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/85 hover:text-white bg-white/10 hover:bg-white/20 rounded-full text-2xl"
          >
            ›
          </button>

          <div
            className="relative w-[92vw] h-[80vh] max-w-6xl"
            onClick={() => setOpenIdx(null)}
          >
            <Image
              src={assetSrc(photos[openIdx])}
              alt={`${altBase} — ${openIdx + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/85 text-sm font-mono">
            {openIdx + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  );
}
