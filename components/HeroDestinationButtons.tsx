import Image from "next/image";
import Link from "next/link";
import {
  PROPERTIES,
  PROPERTY_ORDER,
  type PropertySlug,
} from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { StarIcon } from "./icons";

const accentBg: Record<string, string> = {
  vinaccia: "bg-vinaccia",
  verde: "bg-verde",
  blu: "bg-blu",
};

/**
 * Client-asked order on desktop (Como → Milano Boutique → Milano Hotel).
 * Mobile keeps the existing PROPERTY_ORDER (Boutique → Milano → Como).
 */
const DESKTOP_ORDER: PropertySlug[] = ["como", "milano-boutique", "milano"];

/**
 * "Scegli la tua destinazione" block, rendered inside the homepage hero.
 *
 * Two layouts:
 *   - Mobile / tablet (< md): three compact white cards with an accent
 *     stripe on the side. Photo background of the hero stays visible
 *     around them.
 *   - Desktop (>= md): three large image-backed hero cards (aspect 3/4)
 *     with a heavy accent color overlay, the property name in bold and
 *     a clear white "Scopri →" button — the V1 "hero panels" pattern.
 */
export function HeroDestinationButtons() {
  return (
    <div className="w-full">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        Scegli la tua destinazione
      </p>

      {/* Mobile / tablet — compact white cards (unchanged) */}
      <ul className="grid grid-cols-1 gap-3 md:hidden">
        {PROPERTY_ORDER.map((slug) => {
          const p = PROPERTIES[slug];
          return (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="group flex items-stretch gap-3 p-3.5 bg-white/95 backdrop-blur-sm border border-white/70 hover:bg-white hover:border-vinaccia hover:shadow-xl transition-all rounded-[2px]"
              >
                <span
                  aria-hidden
                  className={`flex-shrink-0 w-1.5 ${accentBg[p.accent]}`}
                />
                <span className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="block font-display text-lg leading-tight text-[var(--color-ink)] group-hover:text-vinaccia transition-colors">
                    {p.fullName}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-ink-soft)]">
                    {p.stars ? (
                      <span className="inline-flex items-center gap-0.5">
                        {Array.from({ length: p.stars }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-3 h-3 text-sabbia-dark"
                            aria-hidden
                          />
                        ))}
                        <span className="ml-1">{p.stars} stelle</span>
                      </span>
                    ) : (
                      <span>Boutique</span>
                    )}
                    <span aria-hidden>·</span>
                    <span>{p.address.addressLocality}</span>
                  </span>
                </span>
                <span
                  aria-hidden
                  className="self-center text-vinaccia text-xl transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop — large hero cards with photo background, ordered
          Como → Milano Boutique → Milano Hotel as requested */}
      <ul className="hidden md:grid grid-cols-3 gap-4 lg:gap-5">
        {DESKTOP_ORDER.map((slug) => {
          const p = PROPERTIES[slug];
          const ctaTextColor =
            p.accent === "vinaccia"
              ? "text-vinaccia"
              : p.accent === "blu"
              ? "text-blu-dark"
              : "text-verde-dark";
          return (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="group relative isolate block aspect-[3/4] overflow-hidden rounded-[2px]"
              >
                <Image
                  src={assetSrc(`/${p.heroImage}`)}
                  alt={p.fullName}
                  fill
                  sizes="(max-width: 1280px) 33vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Heavy accent overlay — fades a bit on hover so the
                    photo reads more once the user is interested */}
                <div
                  aria-hidden
                  className={`absolute inset-0 ${accentBg[p.accent]} mix-blend-multiply opacity-50 group-hover:opacity-30 transition-opacity duration-300`}
                />
                {/* Bottom gradient for legibility of name + CTA */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                  }}
                />

                {/* Top-left chip — city + stars / boutique badge */}
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-white/95 text-[var(--color-ink)] font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-[2px]">
                  {p.stars ? (
                    <>
                      <span
                        className="inline-flex items-center gap-0.5"
                        aria-label={`${p.stars} stelle`}
                      >
                        {Array.from({ length: p.stars }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-2.5 h-2.5 text-sabbia-dark"
                            aria-hidden
                          />
                        ))}
                      </span>
                      <span>{p.address.addressLocality}</span>
                    </>
                  ) : (
                    <span>Boutique · {p.address.addressLocality}</span>
                  )}
                </span>

                {/* Bottom: property name (BIG, bold) + Scopri CTA */}
                <div className="absolute inset-x-5 bottom-5 z-10 text-white">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-90 mb-2">
                    {p.fullName}
                  </p>
                  <h2
                    className="font-display font-bold text-3xl lg:text-4xl xl:text-[40px] leading-tight mb-4"
                    style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
                  >
                    {p.shortName === "Boutique" ? "Boutique" : p.shortName}
                  </h2>
                  <span
                    className={`inline-flex items-center justify-center gap-1.5 min-h-10 px-4 bg-white ${ctaTextColor} font-medium uppercase tracking-wide text-xs rounded-[2px] shadow-md group-hover:shadow-lg group-hover:translate-y-[-1px] transition-all`}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
