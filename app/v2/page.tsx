import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { HomeHeroPanels } from "@/components/v2/HomeHeroPanels";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/config";
import { HOME_CONTENT } from "@/lib/content";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: HOME_CONTENT.meta.title + " · v2",
  description: HOME_CONTENT.meta.description,
  robots: { index: false, follow: false },
};

export default function HomeV2() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />

      <VersionSwitcher current="v2" otherPath="/" />
      <Header />

      <main id="contenuto" className="flex-grow">
        {/* Brand intro strip — small, sets context above the 3 panels */}
        <section className="bg-[var(--color-bg)] pt-10 md:pt-14 pb-6 md:pb-10">
          <Container>
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vinaccia mb-3">
                Gruppo Hotel RossoVino · Milano e Como
              </p>
              <h1 className="font-display mb-4 [text-wrap:balance]">
                Scegli dove vuoi vivere il vino italiano
              </h1>
              <p className="text-[var(--color-ink-soft)] text-lg leading-relaxed">
                Tre strutture, tre città, tre identità. Tocca la card della
                proprietà che ti interessa per esplorarla.
              </p>
            </div>
          </Container>
        </section>

        {/* The hero IS the 3-panel selector */}
        <HomeHeroPanels />

        {/* Brand essence */}
        <section className="bg-white py-16 md:py-24">
          <Container>
            <SectionHeading eyebrow="L'identità del gruppo">
              {HOME_CONTENT.experience.h2}
            </SectionHeading>
            <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
              {HOME_CONTENT.experience.intro}
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {HOME_CONTENT.experience.pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="border-t-2 border-vinaccia pt-6"
                >
                  <h3 className="font-display text-xl mb-3 text-[var(--color-ink)]">
                    {pillar.title}
                  </h3>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed">
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Sustainability */}
        <section className="bg-verde-light/40 py-16 md:py-24">
          <Container>
            <div className="max-w-3xl">
              <SectionHeading eyebrow="Sostenibilità">
                {HOME_CONTENT.sustainability.h2}
              </SectionHeading>
              <p className="mt-6 text-[var(--color-ink-soft)] text-lg leading-relaxed">
                {HOME_CONTENT.sustainability.body}
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      {/* Per request: NO sticky mobile bar on homepage v2 */}
    </>
  );
}
