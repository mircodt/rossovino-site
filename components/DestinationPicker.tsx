import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, PROPERTY_ORDER } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { Container } from "./Container";
import { StarIcon } from "./icons";

/** Short, evocative tagline per property — shown under the name in the
 *  card. Kept here (instead of in lib/content) because it's UI copy that
 *  only this component uses. */
const TAGLINE: Record<string, string> = {
  "milano-boutique": "Boutique · Villa storica · Milano",
  milano: "2 stelle · Centro città · Milano",
  como: "3 stelle · Immerso nel verde · Como",
};

/**
 * Homepage destination picker — three large, image-led cards that sit
 * directly after the hero so a visitor can choose where to stay before
 * scrolling any further.
 */
export function DestinationPicker() {
  return (
    <section
      aria-label="Scegli la tua destinazione"
      className="bg-[var(--color-bg)] py-14 md:py-20"
    >
      <Container>
        <div className="max-w-2xl mb-10 md:mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vinaccia mb-3">
            Scegli la tua esperienza
          </p>
          <h2 className="font-display font-bold text-vinaccia mb-3 [text-wrap:balance]">
            Dove vuoi soggiornare?
          </h2>
          <p className="text-[var(--color-ink-soft)] text-lg leading-relaxed">
            Tre proprietà, tre città italiane, tre identità. Tocca la card
            della struttura che fa per te e scopri la sua storia.
          </p>
        </div>

        <ul className="grid gap-5 md:gap-6 md:grid-cols-3">
          {PROPERTY_ORDER.map((slug) => {
            const p = PROPERTIES[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  className="group block overflow-hidden rounded-[2px] bg-white border border-sabbia hover:shadow-xl hover:border-vinaccia/30 transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={assetSrc(`/${p.heroImage}`)}
                      alt={p.fullName}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden />
                    {p.stars && (
                      <span
                        className="absolute top-4 left-4 inline-flex items-center gap-1 bg-white/95 text-[var(--color-ink)] font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-[2px]"
                        aria-label={`${p.stars} stelle`}
                      >
                        {Array.from({ length: p.stars }).map((_, i) => (
                          <StarIcon key={i} className="w-2.5 h-2.5 text-sabbia-dark" aria-hidden />
                        ))}
                      </span>
                    )}
                  </div>

                  <div className="p-6 md:p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vinaccia mb-2">
                      {TAGLINE[slug] ?? p.address.addressLocality}
                    </p>
                    <h3 className="font-display text-2xl md:text-[28px] leading-tight text-[var(--color-ink)] mb-3">
                      {p.fullName}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-vinaccia uppercase tracking-wide group-hover:gap-2 transition-all">
                      Scopri
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
