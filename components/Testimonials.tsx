import { SectionHeading } from "./SectionHeading";
import { Container } from "./Container";
import { StarIcon } from "./icons";

interface Testimonial {
  quote: string;
  author: string;
  origin: string;
  source: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Un'accoglienza che non ti aspetti in un hotel a Milano. Il calice di benvenuto è stato il dettaglio perfetto.",
    author: "Laura M.",
    origin: "Firenze",
    source: "Google Reviews",
  },
  {
    quote:
      "La camera Barolo era bellissima. Staff gentilissimo, ci hanno consigliato un ristorante incredibile.",
    author: "Thomas K.",
    origin: "Monaco",
    source: "Booking.com",
  },
  {
    quote:
      "Posizione perfetta per visitare il lago. L'hotel è curato e il giardino è una sorpresa.",
    author: "Sophie R.",
    origin: "Lione",
    source: "Google Reviews",
  },
];

/** Social proof — three review cards using the established home pattern
 *  (mono eyebrow + display heading + cards with top accent border). */
export function Testimonials() {
  return (
    <section aria-label="Cosa dicono i nostri ospiti" className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow="Cosa dicono i nostri ospiti">
          Le voci di chi ha già scelto RossoVino
        </SectionHeading>
        <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
          Recensioni di ospiti che hanno soggiornato nelle nostre tre proprietà
          — Boutique a Milano, Hotel Milano e Hotel Como.
        </p>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.author} className="border-t-2 border-vinaccia pt-6 flex flex-col">
              <div
                className="flex items-center gap-0.5 mb-4 text-vinaccia"
                aria-label="5 stelle su 5"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4" aria-hidden />
                ))}
              </div>
              <blockquote className="text-[var(--color-ink)] leading-relaxed text-lg mb-5 flex-1">
                <span aria-hidden className="font-display text-2xl text-vinaccia leading-none mr-1">
                  &ldquo;
                </span>
                {t.quote}
              </blockquote>
              <footer className="text-sm">
                <p className="font-medium text-[var(--color-ink)]">
                  {t.author} <span className="text-[var(--color-ink-soft)] font-normal">— {t.origin}</span>
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-soft)]">
                  {t.source}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
