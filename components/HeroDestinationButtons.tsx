import Link from "next/link";
import { PROPERTIES, PROPERTY_ORDER } from "@/lib/config";
import { StarIcon } from "./icons";

const accentBg: Record<string, string> = {
  vinaccia: "bg-vinaccia",
  "sabbia-dark": "bg-sabbia-dark",
  blu: "bg-blu",
};

/**
 * 3 destination cards rendered immediately under the hero (above the booking
 * widget). Same look as the cards in the mobile drawer — vertical accent
 * stripe + property name + city/stars row + arrow.
 *
 * Visible already in the first mobile viewport so the visitor can pick a
 * destination without scrolling. On desktop they line up in 3 columns.
 */
export function HeroDestinationButtons() {
  return (
    <section aria-label="Scegli la tua destinazione" className="bg-[var(--color-bg)] pt-6 pb-2 md:pt-8 md:pb-4">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vinaccia mb-3 text-center md:text-left">
          Scegli la tua destinazione
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {PROPERTY_ORDER.map((slug) => {
            const p = PROPERTIES[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  className="group flex items-stretch gap-3 p-3.5 bg-white border border-sabbia hover:border-vinaccia hover:shadow-md transition-all rounded-[2px]"
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
                            <StarIcon key={i} className="w-3 h-3 text-sabbia-dark" aria-hidden />
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
      </div>
    </section>
  );
}
