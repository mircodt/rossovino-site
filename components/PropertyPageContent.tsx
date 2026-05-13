import Image from "next/image";
import { PROPERTIES, type PropertySlug } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { accentBgClass } from "@/lib/accent";
import { CONTENT } from "@/lib/content";
import { PropertyHero } from "./PropertyHero";
import { ValuePropsRow } from "./ValuePropsRow";
import { SectionHeading } from "./SectionHeading";
import { Container } from "./Container";
import { FaqAccordion } from "./FaqAccordion";
import { ContactBlock } from "./ContactBlock";
import { PhotoGallery } from "./PhotoGallery";
import { CheckIcon } from "./icons";

/**
 * Composes the full property page from copy/config. Used by /milano,
 * /milano-boutique and /como — they only need to provide a slug.
 */
export function PropertyPageContent({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];

  return (
    <>
      {/* Thick accent band — first cue of which property the visitor is on */}
      <div className={`h-2 ${accentBgClass[p.accent]}`} aria-hidden />

      <PropertyHero slug={slug} />

      <ValuePropsRow items={c.valueProps} accent={p.accent} />

      {/* Presentation */}
      <section id="presentazione" className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow={p.fullName}>{c.presentation.h2}</SectionHeading>
          <div className="mt-8 grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 prose max-w-none">
              {c.presentation.intro.map((para) => (
                <p key={para} className="text-[var(--color-ink-soft)] text-lg leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-10">
            {c.presentation.sections.map((s) => (
              <article key={s.h3}>
                <h3 className="font-display text-2xl text-[var(--color-ink)] mb-3">{s.h3}</h3>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery — full photo grid for the property */}
      <section
        id="galleria"
        aria-label={`Galleria fotografica ${p.fullName}`}
        className="bg-[var(--color-bg)] py-14 md:py-20"
      >
        <Container>
          <SectionHeading eyebrow="Galleria">
            La struttura in {p.gallery.length} scatti
          </SectionHeading>
          <div className="mt-8">
            <PhotoGallery images={p.gallery} propertyName={p.fullName} />
          </div>
        </Container>
      </section>

      {/* Rooms + Services */}
      <section className="bg-[var(--color-bg)] py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Le camere">Comfort e dettaglio</SectionHeading>
              <p className="mt-4 text-[var(--color-ink-soft)] text-lg leading-relaxed">
                {c.rooms.intro}
              </p>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.rooms.comforts.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[var(--color-ink)]"
                  >
                    <CheckIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-0.5" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Servizi in struttura">Tutto ciò che serve</SectionHeading>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.services.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[var(--color-ink)]"
                  >
                    <CheckIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-0.5" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Position */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Posizione">{c.position.h2}</SectionHeading>
          <div className="mt-6 max-w-3xl">
            {c.position.paragraphs.map((para) => (
              <p key={para} className="text-[var(--color-ink-soft)] text-lg leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
          {/* Map placeholder — replace with embed when address confirmed. */}
          <p className="mt-6 text-sm text-[var(--color-ink-soft)] italic">
            Mappa e indirizzo esatto: da confermare (vedi <code className="font-mono">lib/config.ts</code>).
          </p>
        </Container>
      </section>

      {/* Wide atmospheric banner */}
      <section aria-hidden className="relative h-[40svh] min-h-[280px] max-h-[480px] overflow-hidden">
        <Image
          src={assetSrc(`/images/${p.slug === "milano-boutique" ? "boutique" : p.slug}/banner.jpg`)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </section>

      {/* Sustainability */}
      <section className="bg-verde-light/40 py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Sostenibilità">Scelte concrete, ogni giorno</SectionHeading>
          <p className="mt-4 text-[var(--color-ink-soft)] text-lg leading-relaxed max-w-3xl">
            {c.sustainability.intro}
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.sustainability.groups.map((group) => (
              <article key={group.title}>
                <h3 className="font-display text-xl text-[var(--color-ink)] mb-3">
                  {group.title}
                </h3>
                <ul className="space-y-2 text-[var(--color-ink-soft)]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 mt-2 rounded-full bg-verde-dark flex-shrink-0" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ContactBlock slug={slug} />

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="FAQ">Domande frequenti</SectionHeading>
          <div className="mt-8">
            <FaqAccordion items={c.faq} />
          </div>
        </Container>
      </section>
    </>
  );
}
