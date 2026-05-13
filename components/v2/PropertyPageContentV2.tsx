import Image from "next/image";
import { PROPERTIES, type PropertySlug, telHref, whatsappHref } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { assetSrc } from "@/lib/asset";
import { accentBgClass } from "@/lib/accent";
import { PropertyHeroV2 } from "./PropertyHeroV2";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/Container";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PhotoGallery } from "@/components/PhotoGallery";
import {
  BedIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
  WhatsappIcon,
} from "@/components/icons";

/**
 * V2 property page — same content as v1 but the property accent color
 * is much more prominent: value-prop cards, section accents, CTA block.
 */
export function PropertyPageContentV2({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];
  const accent = accentBgClass[p.accent];

  return (
    <>
      <PropertyHeroV2 slug={slug} />

      {/* Value props row — cards FILLED with accent color, big presence */}
      <section className="bg-[var(--color-bg)] py-12 md:py-16">
        <Container>
          <ul className="grid gap-4 md:gap-5 md:grid-cols-3">
            {c.valueProps.map((vp, i) => (
              <li
                key={vp.title}
                className={`${accent} ${p.accent === "sabbia-dark" ? "text-[#2b2b2b]" : "text-white"} p-7 md:p-8 rounded-[2px]`}
              >
                <span className="block font-mono text-[11px] uppercase tracking-[0.22em] opacity-75 mb-3">
                  0{i + 1}
                </span>
                <h3
                  className={`font-display text-2xl mb-2 ${p.accent === "sabbia-dark" ? "text-[#2b2b2b]" : "text-white"}`}
                >
                  {vp.title}
                </h3>
                <p className={`leading-relaxed ${p.accent === "sabbia-dark" ? "text-[#2b2b2b]/85" : "text-white/90"}`}>
                  {vp.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Presentation */}
      <section id="presentazione" className="bg-white py-16 md:py-24">
        <Container>
          <span
            className={`inline-block font-mono text-[11px] uppercase tracking-[0.22em] ${accent} ${p.accent === "sabbia-dark" ? "text-[#2b2b2b]" : "text-white"} px-2.5 py-1 rounded-[2px] mb-4`}
          >
            {p.fullName}
          </span>
          <h2 className="font-display [text-wrap:balance] max-w-3xl">
            {c.presentation.h2}
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              {c.presentation.intro.map((para) => (
                <p key={para} className="text-[var(--color-ink-soft)] text-lg leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-10">
            {c.presentation.sections.map((s) => (
              <article key={s.h3} className={`border-l-4 ${p.accent === "vinaccia" ? "border-vinaccia" : p.accent === "blu" ? "border-blu" : "border-sabbia-dark"} pl-5`}>
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
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Le camere">Comfort e dettaglio</SectionHeading>
              <p className="mt-4 text-[var(--color-ink-soft)] text-lg leading-relaxed">
                {c.rooms.intro}
              </p>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.rooms.comforts.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[var(--color-ink)]">
                    <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${p.accent === "vinaccia" ? "text-vinaccia" : p.accent === "blu" ? "text-blu-dark" : "text-sabbia-dark"}`} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Servizi in struttura">Tutto ciò che serve</SectionHeading>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.services.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[var(--color-ink)]">
                    <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${p.accent === "vinaccia" ? "text-vinaccia" : p.accent === "blu" ? "text-blu-dark" : "text-sabbia-dark"}`} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Rooms photo gallery */}
      <section
        id="camere"
        aria-label={`Le camere di ${p.fullName}`}
        className="bg-white py-16 md:py-24"
      >
        <Container>
          <SectionHeading eyebrow="Le nostre camere">
            Sfoglia le camere
          </SectionHeading>
          <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
            Ogni stanza porta il nome di un vino italiano. Scorri per scoprire le diverse tipologie.
          </p>
          <div className="mt-8">
            <PhotoGallery images={p.roomsGallery} propertyName={`${p.fullName} — camere`} />
          </div>
        </Container>
      </section>

      {/* Position */}
      <section className="bg-white py-12 md:py-16 border-t border-[color:var(--color-border)]">
        <Container>
          <SectionHeading eyebrow="Posizione">{c.position.h2}</SectionHeading>
          <div className="mt-6 max-w-3xl">
            {c.position.paragraphs.map((para) => (
              <p key={para} className="text-[var(--color-ink-soft)] text-lg leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Wide accent-tinted banner */}
      <section className="relative h-[42svh] min-h-[280px] max-h-[480px] overflow-hidden">
        <Image
          src={assetSrc(`/images/${p.slug === "milano-boutique" ? "boutique" : p.slug}/banner.jpg`)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className={`absolute inset-0 ${accent} mix-blend-multiply opacity-45`} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)",
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
                      <span className={`inline-block w-1.5 h-1.5 mt-2 rounded-full ${accent} flex-shrink-0`} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA block in property accent color (replaces v1's vinaccia-uniform block) */}
      <section className={`${accent} ${p.accent === "sabbia-dark" ? "text-[#2b2b2b]" : "text-white"} py-16 md:py-24`}>
        <Container className="text-center">
          <h2 className={`font-display mb-3 [text-wrap:balance] ${p.accent === "sabbia-dark" ? "text-[#2b2b2b]" : "text-white"}`}>
            {c.ctaFinal.title}
          </h2>
          <p className={`max-w-2xl mx-auto mb-8 text-lg leading-relaxed ${p.accent === "sabbia-dark" ? "text-[#2b2b2b]/85" : "text-white/90"}`}>
            {c.ctaFinal.body}
          </p>

          <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto ${p.accent === "sabbia-dark" ? "" : ""}`}>
            <a
              href="#prenota"
              className={`flex items-center justify-center gap-2 min-h-14 px-5 bg-white font-medium uppercase text-sm tracking-wide hover:bg-sabbia transition-colors rounded-[2px] ${p.accent === "vinaccia" ? "text-vinaccia" : p.accent === "blu" ? "text-blu-dark" : "text-[#2b2b2b]"}`}
            >
              <BedIcon className="w-5 h-5" aria-hidden />
              Verifica disponibilità
            </a>
            <a
              href={telHref(p.phone)}
              className={`flex items-center justify-center gap-2 min-h-14 px-5 border font-medium uppercase text-sm tracking-wide transition-colors rounded-[2px] ${p.accent === "sabbia-dark" ? "border-[#2b2b2b]/40 text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white" : "border-white/60 text-white hover:bg-white hover:text-[var(--color-ink)]"}`}
            >
              <PhoneIcon className="w-5 h-5" aria-hidden />
              Chiama ora
            </a>
            <a
              href={whatsappHref(p.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 min-h-14 px-5 border font-medium uppercase text-sm tracking-wide transition-colors rounded-[2px] ${p.accent === "sabbia-dark" ? "border-[#2b2b2b]/40 text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white" : "border-white/60 text-white hover:bg-white hover:text-[var(--color-ink)]"}`}
            >
              <WhatsappIcon className="w-5 h-5" aria-hidden />
              WhatsApp
            </a>
            <a
              href={`mailto:${p.email}`}
              className={`flex items-center justify-center gap-2 min-h-14 px-5 border font-medium uppercase text-sm tracking-wide transition-colors rounded-[2px] ${p.accent === "sabbia-dark" ? "border-[#2b2b2b]/40 text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white" : "border-white/60 text-white hover:bg-white hover:text-[var(--color-ink)]"}`}
            >
              <MailIcon className="w-5 h-5" aria-hidden />
              Email
            </a>
          </div>
        </Container>
      </section>

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
