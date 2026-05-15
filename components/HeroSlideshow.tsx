"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { assetSrc } from "@/lib/asset";

interface Props {
  /** 2-N images cycled in order. */
  slides: string[];
  /** Used as alt-text. */
  alt: string;
  /** Ms between auto-advance. Default 3000. */
  interval?: number;
}

/**
 * Cross-fading hero slideshow. All images are mounted at once (each absolute,
 * full-size) and opacity is animated so transitions stay smooth even with
 * heavy hero photos.
 */
export function HeroSlideshow({ slides, alt, interval = 3000 }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <>
      {slides.map((src, i) => (
        <Image
          key={src}
          src={assetSrc(src)}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
