import Link from "next/link";
import { PROPERTIES, type PropertySlug } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { BedIcon, CheckIcon, MapPinIcon } from "./icons";

const NEARBY_TIPS: Record<PropertySlug, { title: string; body: string }[]> = {
  "milano-boutique": [
    {
      title: "Duomo & Galleria",
      body: "A pochi minuti dal cuore di Milano: Duomo, Galleria Vittorio Emanuele e Quadrilatero della Moda raggiungibili a piedi o con due fermate di metro.",
    },
    {
      title: "Aperitivo locale",
      body: "Il nostro staff ti consiglia cocktail bar di quartiere lontani dalle rotte turistiche, dove la Milano dei milanesi si ritrova al tramonto.",
    },
    {
      title: "Settimana del Design",
      body: "Durante Salone e Fuorisalone organizziamo navette e consigliamo gli eventi più interessanti nei quartieri di Brera, Tortona, Isola.",
    },
  ],
  milano: [
    {
      title: "Stazione Centrale & aeroporti",
      body: "Hub di trasporti a portata di mano: collegamenti diretti per Linate, Malpensa e Bergamo Orio al Serio in meno di un'ora.",
    },
    {
      title: "Fiera e business district",
      body: "MiCo, Fiera Milano City e Porta Nuova ben collegate con la metropolitana. Spazi di lavoro disponibili in hotel su richiesta.",
    },
    {
      title: "Navigli & vita notturna",
      body: "I quartieri di Navigli, Brera e Isola sono le tappe consigliate per una serata milanese autentica.",
    },
  ],
  como: [
    {
      title: "Il lago a 10 minuti",
      body: "Il bus che ferma davanti all'hotel porta in centro Como in pochi minuti. Da lì gli imbarcaderi per Bellagio, Cernobbio e Varenna.",
    },
    {
      title: "Funicolare di Brunate",
      body: "Salita panoramica per la vista sul lago e sulle Alpi. La funicolare parte dal centro storico di Como.",
    },
    {
      title: "Basilica di Sant'Abbondio",
      body: "Pochi passi dall'hotel — una delle più importanti chiese romaniche d'Italia, da non perdere se ti piace l'arte medievale.",
    },
  ],
};

export function ServicesPageContent({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];

  return (
    <>
      {/* Full services list */}
      <section className="bg-white py-12 md:py-20">
        <Container>
          <SectionHeading eyebrow="In struttura">
            Tutto ciò che serve, e qualcosa in più
          </SectionHeading>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {c.services.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[var(--color-ink)] bg-sabbia-light/50 border border-sabbia/30 px-4 py-3 rounded-[2px]"
              >
                <CheckIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Sustainability summary on services page too — relevant context */}
      <section className="bg-verde-light/30 py-12 md:py-20">
        <Container>
          <SectionHeading eyebrow="Sostenibilità">
            Scelte concrete, ogni giorno
          </SectionHeading>
          <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-3xl leading-relaxed">
            {c.sustainability.intro}
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.sustainability.groups.map((g) => (
              <article key={g.title}>
                <h3 className="font-display text-xl text-[var(--color-ink)] mb-3">
                  {g.title}
                </h3>
                <ul className="space-y-2 text-[var(--color-ink-soft)]">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span
                        className="inline-block w-1.5 h-1.5 mt-2 rounded-full bg-verde-dark flex-shrink-0"
                        aria-hidden
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Nearby / what to do */}
      <section className="bg-[var(--color-bg)] py-12 md:py-20">
        <Container>
          <SectionHeading eyebrow="Dintorni & consigli locali">
            Cosa fare in zona
          </SectionHeading>
          <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-3xl leading-relaxed">
            {c.position.paragraphs[0]}
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {NEARBY_TIPS[slug].map((tip) => (
              <li
                key={tip.title}
                className="bg-white border border-sabbia p-5 md:p-6 rounded-[2px]"
              >
                <MapPinIcon className="w-5 h-5 text-vinaccia mb-3" aria-hidden />
                <h3 className="font-display text-xl text-[var(--color-ink)] mb-2">
                  {tip.title}
                </h3>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">{tip.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-vinaccia text-white py-14 md:py-20">
        <Container className="text-center">
          <h2 className="font-display text-white mb-3 [text-wrap:balance]">
            Pronto a prenotare?
          </h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
            Verifica la disponibilità per le tue date in tempo reale.
          </p>
          <Link
            href={`/${slug}#prenota`}
            className="inline-flex items-center justify-center gap-2 min-h-12 px-6 bg-white text-vinaccia font-medium uppercase tracking-wide text-sm rounded-[2px] hover:bg-sabbia transition-colors"
          >
            <BedIcon className="w-5 h-5" aria-hidden />
            Verifica disponibilità
          </Link>
        </Container>
      </section>
    </>
  );
}
