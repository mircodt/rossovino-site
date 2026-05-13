import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsappIcon } from "@/components/icons";
import {
  PROPERTIES,
  PROPERTY_ORDER,
  SITE,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { breadcrumbSchema, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contatti — Hotel RossoVino Milano e Como",
  description:
    "Telefoni, email, WhatsApp e indirizzi delle tre strutture del gruppo Hotel RossoVino: Boutique a Milano, Hotel Milano e Hotel Como.",
  alternates: { canonical: canonical("/contatti") },
};

export default function ContattiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Contatti", url: canonical("/contatti") },
        ])}
      />

      <VersionSwitcher current="v1" otherPath="/v2" />
      <Header />
      <main id="contenuto" className="flex-grow">
        <section className="bg-[var(--color-bg)] py-16 md:py-24">
          <Container>
            <SectionHeading eyebrow="Contatti">
              Tre strutture, contatti diretti
            </SectionHeading>
            <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
              Ogni proprietà ha una reception dedicata: chiama, scrivi su WhatsApp o invia
              una email — ti risponde lo staff della struttura che hai scelto.
            </p>

            <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-3">
              {PROPERTY_ORDER.map((slug) => {
                const p = PROPERTIES[slug];
                return (
                  <article
                    key={slug}
                    className="bg-white border border-sabbia p-6 md:p-7 rounded-[2px]"
                  >
                    <h2 className="font-display text-2xl mb-1 text-[var(--color-ink)]">
                      {p.fullName}
                    </h2>
                    <p className="text-sm text-[var(--color-ink-soft)] uppercase tracking-wide font-mono mb-5">
                      {p.address.addressLocality}
                      {p.stars ? ` · ${p.stars} stelle` : " · Boutique"}
                    </p>

                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <PhoneIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-0.5" aria-hidden />
                        <a
                          href={telHref(p.phone)}
                          className="font-mono tabular-nums hover:text-vinaccia transition-colors"
                        >
                          {p.phone}
                        </a>
                      </li>
                      <li className="flex items-start gap-3">
                        <WhatsappIcon className="w-5 h-5 text-verde-dark flex-shrink-0 mt-0.5" aria-hidden />
                        <a
                          href={whatsappHref(p.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-vinaccia transition-colors"
                        >
                          Apri chat WhatsApp
                        </a>
                      </li>
                      <li className="flex items-start gap-3">
                        <MailIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-0.5" aria-hidden />
                        <a
                          href={`mailto:${p.email}`}
                          className="hover:text-vinaccia transition-colors break-all"
                        >
                          {p.email}
                        </a>
                      </li>
                      <li className="flex items-start gap-3">
                        <MapPinIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-0.5" aria-hidden />
                        <span className="text-[var(--color-ink-soft)]">
                          {p.address.streetAddress},<br />
                          {p.address.postalCode} {p.address.addressLocality} ({p.address.addressRegion})
                        </span>
                      </li>
                    </ul>
                  </article>
                );
              })}
            </div>

            <p className="mt-10 text-sm text-[var(--color-ink-soft)] italic">
              I dati di contatto qui sopra contengono dei placeholder
              (<code className="font-mono">__TODO_…__</code>) — vanno sostituiti in{" "}
              <code className="font-mono">lib/config.ts</code> prima del go-live.
            </p>
          </Container>
        </section>
      </main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
