import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Container } from "./Container";
import { StarIcon } from "./icons";
import { PROPERTIES, type PropertySlug } from "@/lib/config";

interface PropertyReview {
  slug: PropertySlug;
  /** Average Google rating, REPLACE with real value from Google My Business */
  rating: number;
  /** Total reviews count, REPLACE */
  reviewCount: number;
  quote: string;
  author: string;
  origin: string;
}

// REPLACE: dati Google My Business reali (rating + count + recensioni vere)
// Ordine fissato Como → Boutique → Milano per coerenza con il resto del sito.
const REVIEWS: PropertyReview[] = [
  {
    slug: "como",
    rating: 4.6,
    reviewCount: 247,
    quote:
      "Posizione perfetta per visitare il lago. L'hotel è curato e il giardino è una sorpresa.",
    author: "Sophie R.",
    origin: "Lione",
  },
  {
    slug: "milano-boutique",
    rating: 4.7,
    reviewCount: 184,
    quote:
      "Un'accoglienza che non ti aspetti in un hotel a Milano. Il calice di benvenuto è stato il dettaglio perfetto.",
    author: "Laura M.",
    origin: "Firenze",
  },
  {
    slug: "milano",
    rating: 4.5,
    reviewCount: 312,
    quote:
      "La camera Barolo era bellissima. Staff gentilissimo, ci hanno consigliato un ristorante incredibile.",
    author: "Thomas K.",
    origin: "Monaco",
  },
];

const accentBg: Record<string, string> = {
  vinaccia: "bg-vinaccia",
  verde: "bg-verde",
  blu: "bg-blu",
};

/** One review card per property + the average Google rating for that
 *  property. Cards link to the property page so each review acts as a
 *  CTA toward booking the right hotel. */
export function Testimonials() {
  return (
    <section aria-label="Cosa dicono i nostri ospiti" className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow="Cosa dicono i nostri ospiti">
          Le voci di chi ha già scelto RossoVino
        </SectionHeading>
        <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
          Una recensione per ciascuna delle nostre tre strutture, con la valutazione
          media verificata su Google.
        </p>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {REVIEWS.map((r) => {
            const p = PROPERTIES[r.slug];
            return (
              <li key={r.slug} className="border-t-2 border-vinaccia pt-6 flex flex-col">
                {/* Property + Google rating header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-2 ${accentBg[p.accent]} text-white text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-[2px]`}
                  >
                    {p.shortName}
                  </span>
                  <div className="text-right">
                    <div
                      className="flex items-center gap-0.5 text-vinaccia justify-end"
                      aria-label={`${r.rating} stelle su 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-3.5 h-3.5 ${i < Math.round(r.rating) ? "" : "opacity-25"}`}
                          aria-hidden
                        />
                      ))}
                      <span className="ml-1.5 font-mono text-sm text-[var(--color-ink)] font-medium">
                        {r.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-soft)] mt-0.5">
                      {r.reviewCount} recensioni · Google
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-[var(--color-ink)] leading-relaxed text-lg mb-5 flex-1">
                  <span aria-hidden className="font-display text-2xl text-vinaccia leading-none mr-1">
                    &ldquo;
                  </span>
                  {r.quote}
                </blockquote>

                {/* Author + property link */}
                <footer className="text-sm">
                  <p className="font-medium text-[var(--color-ink)]">
                    {r.author}{" "}
                    <span className="text-[var(--color-ink-soft)] font-normal">
                      — {r.origin}
                    </span>
                  </p>
                  <Link
                    href={`/${r.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-vinaccia font-mono text-[11px] uppercase tracking-wider hover:gap-2 transition-all"
                  >
                    Scopri {p.shortName}
                    <span aria-hidden>→</span>
                  </Link>
                </footer>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
