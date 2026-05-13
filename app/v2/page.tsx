import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { HomeHeroPanels } from "@/components/v2/HomeHeroPanels";
import { BookingWidgetV2 } from "@/components/v2/BookingWidgetV2";
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
                Tre indirizzi, una sola anima
              </h1>
              <p className="text-[var(--color-ink-soft)] text-lg leading-relaxed">
                Boutique nel cuore di Milano · Hotel a Milano centro · Hotel a
                Como, sul lago. Scegli la tua RossoVino.
              </p>
            </div>
          </Container>
        </section>

        {/* The 3-panel selector — compact cards with gaps */}
        <HomeHeroPanels />

        {/* Booking widget — in its own section BELOW the panels, no overlap. */}
        <section className="bg-[var(--color-bg)] pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
            <p className="text-center text-sm font-mono uppercase tracking-[0.2em] text-vinaccia mb-4">
              Prenota
            </p>
            <BookingWidgetV2 variant="inline" />
          </div>
        </section>

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
