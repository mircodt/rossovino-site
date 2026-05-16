import Image from "next/image";
import { PROPERTIES, type PropertySlug } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { accentBgClass } from "@/lib/accent";
import { Container } from "./Container";
import { StarIcon } from "./icons";

interface Props {
  slug: PropertySlug;
  eyebrow: string;
  title: string;
  description?: string;
}

/** Compact hero for sub-pages (camere / servizi / contatti). Smaller than
 *  the landing hero, with a slim image strip and a title block below. */
export function SubPageHero({ slug, eyebrow, title, description }: Props) {
  const p = PROPERTIES[slug];

  return (
    <section className="relative">
      <div className={`h-1.5 ${accentBgClass[p.accent]}`} aria-hidden />

      <div className="relative h-[34svh] min-h-[260px] max-h-[400px] overflow-hidden">
        <Image
          src={assetSrc(`/${p.heroImage}`)}
          alt={`${p.fullName} — ${eyebrow.toLowerCase()}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 h-full mx-auto w-full max-w-[1200px] px-5 md:px-8 flex items-end pb-8 md:pb-12">
          <div className="text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-sabbia mb-2 inline-flex items-center gap-2">
              {eyebrow}
              {p.stars && (
                <span className="inline-flex items-center gap-0.5 ml-1" aria-label={`${p.stars} stelle`}>
                  {Array.from({ length: p.stars }).map((_, i) => (
                    <StarIcon key={i} className="w-3 h-3 text-sabbia" aria-hidden />
                  ))}
                </span>
              )}
            </p>
            <h1 className="font-display text-3xl md:text-5xl text-white [text-wrap:balance]">
              {title}
            </h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-sabbia/90">
              {p.fullName}
            </p>
          </div>
        </div>
      </div>

      {description && (
        <div className="bg-white py-8 md:py-10 border-b border-[color:var(--color-border)]">
          <Container>
            <p className="text-[var(--color-ink-soft)] text-lg leading-relaxed max-w-3xl">
              {description}
            </p>
          </Container>
        </div>
      )}
    </section>
  );
}
