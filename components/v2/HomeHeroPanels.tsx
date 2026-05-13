import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, PROPERTY_ORDER } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { assetSrc } from "@/lib/asset";
import { accentBgClass } from "@/lib/accent";
import { StarIcon } from "@/components/icons";

/** Distinct preview photo per property — chosen to differentiate them
 *  visually even when Milano** + Boutique share their source pool. */
const previewImage: Record<string, string> = {
  "milano-boutique": "/images/boutique/preview.jpg",
  milano: "/images/milano/preview.jpg",
  como: "/images/como/preview.jpg",
};

/**
 * V2 homepage hero: three full-height clickable panels, one per property.
 * Each panel has:
 *  - a distinct preview photo (so Milano** and Boutique don't look identical)
 *  - a heavy accent-color overlay (immediate identity cue)
 *  - a BIG clearly-styled white CTA button at the bottom (so the panels
 *    read unmistakably as interactive — not as decorative tiles)
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
        const bigLabel =
          p.shortName === "Boutique" ? "Villa Biffi" : p.shortName;

        // Foreground color for the CTA button — depends on accent contrast.
        const ctaTextOnWhite =
          p.accent === "vinaccia"
            ? "text-vinaccia"
            : p.accent === "blu"
            ? "text-blu-dark"
            : "text-[#2b2b2b]";

        return (
          <Link
            key={slug}
            href={`/v2/${slug}`}
            className="group relative isolate block min-h-[40svh] lg:min-h-[80svh] overflow-hidden"
          >
            <Image
              src={assetSrc(previewImage[slug])}
              alt={`${p.fullName} — anteprima`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Heavy accent overlay — dominant identity cue */}
            <div
              aria-hidden
              className={`absolute inset-0 ${accentBgClass[p.accent]} mix-blend-multiply opacity-55 group-hover:opacity-40 transition-opacity duration-300`}
            />
            {/* Bottom gradient for text legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.6) 100%)",
              }}
            />

            {/* Content */}
            <div
              className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8 lg:p-10 text-white"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
            >
              {/* TOP: identity chip */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] bg-white/95 text-[var(--color-ink)] px-2.5 py-1.5 rounded-[2px]"
                  style={{ textShadow: "none" }}
                >
                  <span
                    aria-hidden
                    className={`inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle ${accentBgClass[p.accent]}`}
                  />
                  {p.stars ? (
                    <span className="inline-flex items-center gap-1 align-middle">
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

              {/* BOTTOM: name + headline + BIG visible CTA button */}
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] opacity-90 mb-2">
                  {p.shortName === "Boutique"
                    ? "Boutique RossoVino · Milano"
                    : `Hotel RossoVino · ${p.shortName}`}
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-[44px] xl:text-5xl leading-[1.05] [text-wrap:balance] mb-3">
                  {bigLabel}
                </h2>
                <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-md mb-6">
                  {c.hero.subtitle.split(". ")[0]}.
                </p>

                {/* BIG CTA BUTTON — visually unmistakable as interactive */}
                <span
                  className={`inline-flex items-center justify-center gap-2 min-h-12 px-6 bg-white ${ctaTextOnWhite} font-medium uppercase tracking-wide text-sm rounded-[2px] shadow-lg group-hover:shadow-xl group-hover:translate-y-[-1px] transition-all`}
                  style={{ textShadow: "none" }}
                >
                  Scopri {bigLabel}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
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
