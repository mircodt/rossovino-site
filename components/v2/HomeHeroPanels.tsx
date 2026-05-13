import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, PROPERTY_ORDER } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { accentBgClass } from "@/lib/accent";
import { Container } from "@/components/Container";
import { StarIcon } from "@/components/icons";

/** Distinct preview photo per property — so Milano** and Boutique don't
 *  look identical when they share their source pool. */
const previewImage: Record<string, string> = {
  "milano-boutique": "/images/boutique/preview.jpg",
  milano: "/images/milano/preview.jpg",
  como: "/images/como/preview.jpg",
};

/**
 * V2 homepage selector: three compact cards in a grid with breathing
 * room between them. Each card shows only what's essential — photo,
 * property name, city/stars, "Scopri →" button. Designed to read at a
 * glance, not to overwhelm.
 */
export function HomeHeroPanels() {
  return (
    <section
      aria-label="Le tre proprietà del gruppo RossoVino"
      className="bg-[var(--color-bg)] py-8 md:py-12"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {PROPERTY_ORDER.map((slug) => {
            const p = PROPERTIES[slug];
            const shortLabel =
              p.shortName === "Boutique" ? "Boutique" : p.shortName;
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
                className="group relative isolate block aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2px]"
              >
                <Image
                  src={assetSrc(previewImage[slug])}
                  alt={p.fullName}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Accent overlay — identity cue, lighter so the photo reads */}
                <div
                  aria-hidden
                  className={`absolute inset-0 ${accentBgClass[p.accent]} mix-blend-multiply opacity-40 group-hover:opacity-25 transition-opacity duration-300`}
                />
                {/* Bottom gradient for legibility of the label/button */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
                  }}
                />

                {/* Top: tiny eyebrow with city + stars */}
                <span
                  className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-white/95 text-[var(--color-ink)] font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-[2px]"
                >
                  {p.stars ? (
                    <>
                      <span className="inline-flex items-center" aria-label={`${p.stars} stelle`}>
                        {Array.from({ length: p.stars }).map((_, i) => (
                          <StarIcon key={i} className="w-2.5 h-2.5" aria-hidden />
                        ))}
                      </span>
                      <span>{p.address.addressLocality}</span>
                    </>
                  ) : (
                    <span>Boutique · {p.address.addressLocality}</span>
                  )}
                </span>

                {/* Bottom: name + CTA */}
                <div
                  className="absolute inset-x-4 bottom-4 z-10 text-white"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
                >
                  <h2 className="font-display text-3xl md:text-4xl leading-[1.05] mb-3">
                    {shortLabel}
                  </h2>
                  <span
                    className={`inline-flex items-center justify-center gap-1.5 min-h-10 px-4 bg-white ${ctaTextOnWhite} font-medium uppercase tracking-wide text-xs rounded-[2px] shadow-md group-hover:shadow-lg transition-shadow`}
                    style={{ textShadow: "none" }}
                  >
                    Scopri
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
