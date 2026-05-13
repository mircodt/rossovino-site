import Image from "next/image";
import type { PropertySlug } from "@/lib/config";
import { PROPERTIES } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { assetSrc } from "@/lib/asset";
import { accentBgClass } from "@/lib/accent";
import { BookingWidgetV2 } from "./BookingWidgetV2";
import { Button } from "@/components/Button";
import { StarIcon } from "@/components/icons";

/**
 * V2 hero: bigger, louder identity. A thick accent band at the very top
 * + a big colored chip with the property name + a heavy color overlay on
 * the hero photo. The visitor should see Como/Milano/Boutique colors
 * before reading any copy.
 */
export function PropertyHeroV2({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];
  const bigLabel =
    p.shortName === "Boutique" ? "Villa Biffi" : p.shortName.toUpperCase();

  return (
    <section className="relative">
      {/* Thick accent band — first visual cue of property identity */}
      <div className={`h-1.5 ${accentBgClass[p.accent]}`} aria-hidden />

      <div className="relative h-[80svh] min-h-[560px] max-h-[800px] overflow-hidden">
        <Image
          src={assetSrc(`/${p.heroImage}`)}
          alt={`${p.fullName} — vista principale`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* HEAVY accent overlay — this is the dominant identity cue */}
        <div
          aria-hidden
          className={`absolute inset-0 ${accentBgClass[p.accent]} mix-blend-multiply opacity-55`}
        />

        {/* Bottom gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full mx-auto w-full max-w-[1200px] px-5 md:px-8 flex flex-col justify-between py-10 md:py-14">
          {/* TOP: identity chip */}
          <div className="flex items-center justify-between">
            <span
              className="inline-flex items-center gap-2 bg-white/95 text-[var(--color-ink)] font-mono text-xs uppercase tracking-[0.22em] px-3 py-1.5 rounded-[2px]"
            >
              <span
                aria-hidden
                className={`block w-2 h-2 rounded-full ${accentBgClass[p.accent]}`}
              />
              {p.fullName}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-white/95 font-mono text-xs uppercase tracking-[0.18em]"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
            >
              {p.stars && (
                <span className="inline-flex items-center gap-0.5 mr-2" aria-label={`${p.stars} stelle`}>
                  {Array.from({ length: p.stars }).map((_, i) => (
                    <StarIcon key={i} className="w-3.5 h-3.5" aria-hidden />
                  ))}
                </span>
              )}
              <span>{p.address.addressLocality}</span>
            </span>
          </div>

          {/* BOTTOM: big city/property word + H1 + subtitle + CTAs */}
          <div
            className="text-white max-w-3xl"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
          >
            {/* GIANT city/property word — instant recognition */}
            <p className="font-display font-semibold leading-[0.95] mb-4 text-[clamp(64px,12vw,160px)] opacity-95 [text-wrap:nowrap]">
              {bigLabel}
            </p>

            <h1 className="font-display text-white mb-4 text-2xl md:text-3xl lg:text-4xl [text-wrap:balance]">
              {c.hero.h1}
            </h1>
            <p className="text-base md:text-lg text-white/95 max-w-2xl leading-relaxed">
              {c.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href="#prenota"
                variant="primary"
                className={`${accentBgClass[p.accent]} hover:opacity-90`}
              >
                Verifica disponibilità
              </Button>
              <Button
                href="#presentazione"
                variant="secondary"
                className="!text-white !border-white/70 hover:!bg-white hover:!text-[var(--color-ink)]"
              >
                Scopri la struttura
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking widget — overlapping the hero bottom edge */}
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <BookingWidgetV2 property={slug} variant="hero" />
      </div>
    </section>
  );
}
