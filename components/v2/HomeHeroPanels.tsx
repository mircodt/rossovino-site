import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, PROPERTY_ORDER } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { assetSrc } from "@/lib/asset";
import { accentBgClass } from "@/lib/accent";
import { StarIcon } from "@/components/icons";

/**
 * V2 homepage hero: three full-height clickable panels, one per property.
 * Each panel screams its own identity (photo + strong color overlay).
 * Mobile: stacked vertically. Desktop: side-by-side.
 */
export function HomeHeroPanels() {
  return (
    <section
      aria-label="Le tre proprietà del gruppo RossoVino"
      className="grid grid-cols-1 lg:grid-cols-3 min-h-[80svh]"
    >
      {PROPERTY_ORDER.map((slug) => {
        const p = PROPERTIES[slug];
        const c = CONTENT[slug];
        return (
          <Link
            key={slug}
            href={`/v2/${slug}`}
            className="group relative isolate block min-h-[40svh] lg:min-h-[80svh] overflow-hidden"
          >
            {/* Background image */}
            <Image
              src={assetSrc(`/${p.heroImage}`)}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Heavy accent-color overlay — this is the dominant identity cue */}
            <div
              aria-hidden
              className={`absolute inset-0 ${accentBgClass[p.accent]} mix-blend-multiply opacity-60`}
            />
            {/* Bottom gradient for text legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            {/* Hover: subtle dark veil for emphasis */}
            <div
              aria-hidden
              className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors"
            />

            {/* Content */}
            <div
              className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8 lg:p-10 text-white"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-[2px]">
                  {p.stars ? (
                    <span className="inline-flex items-center gap-1">
                      {Array.from({ length: p.stars }).map((_, i) => (
                        <StarIcon key={i} className="w-3 h-3" aria-hidden />
                      ))}
                      <span className="ml-1">{p.address.addressLocality}</span>
                    </span>
                  ) : (
                    `Boutique · ${p.address.addressLocality}`
                  )}
                </span>
              </div>

              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] opacity-90 mb-2">
                  {p.shortName === "Boutique"
                    ? "Boutique RossoVino"
                    : `Hotel RossoVino · ${p.shortName}`}
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-[40px] leading-[1.05] [text-wrap:balance] mb-3">
                  {/* Big city/property name for instant recognition */}
                  {p.shortName === "Como"
                    ? "Como"
                    : p.shortName === "Milano"
                    ? "Milano"
                    : "Villa Biffi"}
                </h2>
                <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-md mb-5">
                  {c.hero.subtitle.split(". ")[0]}.
                </p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] border-b border-white/70 pb-0.5 group-hover:border-white transition-colors">
                  Scopri la struttura
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
