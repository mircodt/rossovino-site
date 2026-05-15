import type { PropertySlug } from "@/lib/config";
import { PROPERTIES } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { BookingWidget } from "./BookingWidget";
import { Button } from "./Button";
import { HeroSlideshow } from "./HeroSlideshow";
import { StarIcon } from "./icons";

export function PropertyHero({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];

  return (
    <section className="relative">
      <div className="relative h-[78svh] min-h-[560px] max-h-[820px] overflow-hidden">
        <HeroSlideshow
          slides={p.heroSlides}
          alt={`${p.fullName} — vista principale`}
        />
        {/* Subtle global darkening — keeps the photo present but tames bright areas */}
        <div
          className="absolute inset-0 bg-black/25"
          aria-hidden
        />

        {/* Hero content — text lives inside a solid-tone panel so legibility is
            guaranteed on any image. The panel is the visual focus, the photo
            is the atmospheric backdrop. */}
        <div className="relative z-10 h-full mx-auto w-full max-w-[1200px] px-5 md:px-8 flex flex-col justify-end pb-24 md:pb-28">
          <div
            className="
              max-w-2xl bg-[rgba(20,15,18,0.78)] backdrop-blur-md
              text-white p-6 md:p-10 rounded-[2px]
              border-l-2 border-vinaccia
            "
          >
            <div className="flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-[0.2em] text-sabbia">
              {p.stars && (
                <span className="inline-flex items-center gap-0.5" aria-label={`${p.stars} stelle`}>
                  {Array.from({ length: p.stars }).map((_, i) => (
                    <StarIcon key={i} className="w-3.5 h-3.5" aria-hidden />
                  ))}
                </span>
              )}
              <span>{p.address.addressLocality}</span>
            </div>

            <h1 className="font-display text-white mb-4 [text-wrap:balance]">
              {c.hero.h1}
            </h1>
            <p className="text-base md:text-lg text-white/95 leading-relaxed">
              {c.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#prenota" variant="primary">Verifica disponibilità</Button>
              <Button
                href="#presentazione"
                variant="secondary"
                className="!text-white !border-white/70 hover:!bg-white hover:!text-vinaccia"
              >
                Scopri la struttura
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking widget — overlapping the hero image bottom edge */}
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <BookingWidget property={slug} variant="hero" />
      </div>
    </section>
  );
}
