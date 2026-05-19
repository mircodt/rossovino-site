import Image from "next/image";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { BookingPerks } from "@/components/BookingPerks";
import { HeroDestinationButtons } from "@/components/HeroDestinationButtons";
import { Testimonials } from "@/components/Testimonials";
import { SectionHeading } from "@/components/SectionHeading";
import {
  BulbIcon,
  BottleIcon,
  ThermometerIcon,
  SunIcon,
} from "@/components/icons";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTY_ORDER, PROPERTIES, SITE } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { HOME_CONTENT } from "@/lib/content";
import {
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: HOME_CONTENT.meta.title,
  description: HOME_CONTENT.meta.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: HOME_CONTENT.meta.title,
    description: HOME_CONTENT.meta.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}/${PROPERTIES["milano-boutique"].ogImage}`,
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_CONTENT.meta.title,
    description: HOME_CONTENT.meta.description,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
        ])}
      />

      <Header />

      <main id="contenuto" className="flex-grow">
        {/* 1. Hero — emotional opener, full-bleed photo + dark text panel */}
        <section className="relative">
          <div className="relative h-[70svh] min-h-[520px] max-h-[720px] overflow-hidden">
            <Image
              src={assetSrc(`/${PROPERTIES["milano-boutique"].heroImage}`)}
              alt="Hotel RossoVino — atmosfera del gruppo"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 h-full mx-auto w-full max-w-[1200px] px-5 md:px-8 flex flex-col justify-end pb-24 md:pb-28">
              <div
                className="max-w-2xl bg-[rgba(20,15,18,0.78)] backdrop-blur-md text-white p-6 md:p-10 rounded-[2px] border-l-2 border-vinaccia"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-sabbia mb-3">
                  Gruppo Hotel RossoVino · Milano · Como
                </p>
                <h1 className="font-display text-white [text-wrap:balance] mb-4">
                  {HOME_CONTENT.hero.h1}
                </h1>
                <p className="text-base md:text-lg text-white/95 leading-relaxed">
                  {HOME_CONTENT.hero.subtitle}
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* 2. 3 destination buttons — visible already in the first mobile
              viewport, between hero and booking widget. Same card pattern as
              the mobile drawer (accent stripe + name + city/stars + arrow). */}
        <HeroDestinationButtons />

        {/* 3. Booking widget — destination dropdown defaults to a placeholder
              "Scegli la tua destinazione" until the visitor picks one. */}
        <section className="bg-[var(--color-bg)] pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
            <BookingWidget variant="inline" />
          </div>
        </section>

        {/* 4. Experience — the brand pillars */}
        <section className="bg-white py-16 md:py-24">
          <Container>
            <SectionHeading eyebrow="L&apos;identità del gruppo">
              {HOME_CONTENT.experience.h2}
            </SectionHeading>
            <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
              {HOME_CONTENT.experience.intro}
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {HOME_CONTENT.experience.pillars.map((pillar) => (
                <article key={pillar.title} className="border-t-2 border-vinaccia pt-6">
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

        {/* 4b. Booking perks — pushes direct bookings, primary business goal */}
        <BookingPerks />

        {/* 4c. Social proof — guest testimonials */}
        <Testimonials />

        {/* 5. Sustainability — 4-column grid with inline SVG icons */}
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

            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  Icon: BulbIcon,
                  title: "Illuminazione LED",
                  body: "Illuminazione a basso consumo in tutti gli ambienti.",
                },
                {
                  Icon: BottleIcon,
                  title: "Zero plastica monouso",
                  body: "Dispenser ricaricabili per shampoo, bagnoschiuma e sapone.",
                },
                {
                  Icon: ThermometerIcon,
                  title: "Clima intelligente",
                  body: "Climatizzazione con sensori di presenza e finestre aperte.",
                },
                {
                  Icon: SunIcon,
                  title: "Energia solare",
                  body: "Pannelli solari per l'acqua calda nella struttura di Como.",
                },
              ].map(({ Icon, title, body }) => (
                <li key={title} className="bg-white/70 backdrop-blur-sm border-t-2 border-verde-dark p-6 md:p-7 rounded-[2px]">
                  <Icon className="w-9 h-9 text-verde-dark mb-4" aria-hidden />
                  <h3 className="font-display text-xl mb-2 text-[var(--color-ink)]">
                    {title}
                  </h3>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* 6. Final CTA */}
        <section className="bg-vinaccia text-white py-16 md:py-24">
          <Container className="text-center">
            <h2 className="font-display text-white mb-3 [text-wrap:balance]">
              {HOME_CONTENT.ctaFinal.title}
            </h2>
            <p className="max-w-2xl mx-auto text-white/85 mb-8 text-lg leading-relaxed">
              {HOME_CONTENT.ctaFinal.body}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {PROPERTY_ORDER.map((slug) => (
                <Button key={slug} href={`/${slug}`} variant="outline-on-dark">
                  {PROPERTIES[slug].shortName}
                </Button>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
