import {
  PROPERTIES,
  type PropertySlug,
  hasContact,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappIcon,
} from "./icons";

const HOW_TO_REACH: Record<PropertySlug, { mode: string; body: string }[]> = {
  "milano-boutique": [
    {
      mode: "In auto",
      body: "Parcheggio privato gratuito in hotel — un valore raro nel centro di Milano.",
    },
    {
      mode: "In treno",
      body: "Stazione Centrale o Cadorna — taxi o metro fino in zona, raggiungibili in 10–15 minuti.",
    },
    {
      mode: "In aereo",
      body: "Linate è il più vicino (~20 min in taxi). Da Malpensa, taxi o Malpensa Express fino alla Centrale.",
    },
  ],
  milano: [
    {
      mode: "In auto",
      body: "Parcheggio privato gratuito per i nostri ospiti.",
    },
    {
      mode: "In treno",
      body: "Stazione Centrale ben collegata, in pochi minuti di metro o taxi sei in hotel.",
    },
    {
      mode: "In aereo",
      body: "Linate per voli nazionali, Malpensa per i lunghi raggi. Bergamo Orio al Serio per i low-cost.",
    },
  ],
  como: [
    {
      mode: "In auto",
      body: "Uscita autostrada A9 — Como Sud o Como Centro. Parcheggio privato gratuito in hotel.",
    },
    {
      mode: "In treno",
      body: "Como S. Giovanni o Como Lago — taxi o bus in pochi minuti fino all'hotel.",
    },
    {
      mode: "In bus",
      body: "Fermata del bus per il centro città proprio davanti all'hotel.",
    },
  ],
};

/** Sub-page body for /[property]/contatti. Includes a map embed, the
 *  contacts of THAT specific property, and a non-functional contact form. */
export function PropertyContactsPageContent({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  // Google Maps embed using lat/lng — works without an API key for q=lat,lng
  const mapSrc = `https://www.google.com/maps?q=${p.geo.latitude},${p.geo.longitude}&z=15&output=embed`;

  return (
    <>
      {/* Map + contacts side by side */}
      <section className="bg-white py-10 md:py-16">
        <Container>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 md:gap-10">
            {/* Map */}
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden rounded-[2px] border border-sabbia">
              <iframe
                src={mapSrc}
                title={`Mappa — ${p.fullName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Direct contacts */}
            <div className="flex flex-col">
              <SectionHeading eyebrow="Contatti diretti">{p.fullName}</SectionHeading>
              <ul className="mt-6 space-y-5 text-base">
                <li className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-1" aria-hidden />
                  <span className="text-[var(--color-ink)]">
                    {p.address.streetAddress}
                    <br />
                    {p.address.postalCode} {p.address.addressLocality} ({p.address.addressRegion})
                  </span>
                </li>
                {hasContact(p.phone) && (
                  <li className="flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-1" aria-hidden />
                    <a
                      href={telHref(p.phone)}
                      className="font-mono tabular-nums hover:text-vinaccia transition-colors"
                    >
                      {p.phone}
                    </a>
                  </li>
                )}
                {hasContact(p.whatsapp) && (
                  <li className="flex items-start gap-3">
                    <WhatsappIcon className="w-5 h-5 text-verde-dark flex-shrink-0 mt-1" aria-hidden />
                    <a
                      href={whatsappHref(p.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-vinaccia transition-colors"
                    >
                      Apri chat WhatsApp
                    </a>
                  </li>
                )}
                {hasContact(p.email) && (
                  <li className="flex items-start gap-3">
                    <MailIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-1" aria-hidden />
                    <a
                      href={`mailto:${p.email}`}
                      className="hover:text-vinaccia transition-colors break-all"
                    >
                      {p.email}
                    </a>
                  </li>
                )}
              </ul>

              <div className="mt-8 pt-6 border-t border-[color:var(--color-border)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-soft)] mb-2">
                  Orari
                </p>
                <p className="text-[var(--color-ink)]">
                  Check-in dalle <strong className="font-mono tabular-nums">{p.checkIn}</strong> · Check-out entro <strong className="font-mono tabular-nums">{p.checkOut}</strong>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How to reach */}
      <section className="bg-[var(--color-bg)] py-12 md:py-20">
        <Container>
          <SectionHeading eyebrow="Come arrivare">
            Tutti i modi per raggiungerci
          </SectionHeading>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {HOW_TO_REACH[slug].map((tip) => (
              <li key={tip.mode} className="bg-white border border-sabbia p-5 md:p-6 rounded-[2px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-vinaccia mb-2">
                  {tip.mode}
                </p>
                <p className="text-[var(--color-ink-soft)] leading-relaxed">{tip.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Contact form (UI only, non-functional) */}
      <section className="bg-white py-12 md:py-20">
        <Container>
          <div className="max-w-2xl">
            <SectionHeading eyebrow="Scrivici">
              Domande, richieste speciali, gruppi
            </SectionHeading>
            <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
              Compila il form e ti risponderemo entro 24 ore.
            </p>
            <form className="mt-8 grid gap-4" aria-label="Form contatti">
              <label className="block">
                <span className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                  Nome e cognome
                </span>
                <input
                  type="text"
                  required
                  className="w-full bg-white border border-sabbia rounded-[2px] px-3 min-h-11 focus:border-vinaccia focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                  Email
                </span>
                <input
                  type="email"
                  required
                  className="w-full bg-white border border-sabbia rounded-[2px] px-3 min-h-11 focus:border-vinaccia focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                  Messaggio
                </span>
                <textarea
                  rows={5}
                  required
                  className="w-full bg-white border border-sabbia rounded-[2px] px-3 py-2 focus:border-vinaccia focus:outline-none"
                />
              </label>
              <button
                type="button"
                className="inline-flex items-center justify-center min-h-12 px-6 bg-vinaccia text-white font-medium uppercase tracking-wide text-sm rounded-[2px] hover:bg-vinaccia-hover transition-colors self-start"
              >
                Invia messaggio
              </button>
              <p className="text-xs text-[var(--color-ink-soft)] italic">
                Form di esempio — l&apos;invio verrà collegato alla casella email
                della struttura prima del go-live.
              </p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
