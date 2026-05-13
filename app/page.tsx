import Image from "next/image";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { BookingWidget } from "@/components/BookingWidget";
import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTY_ORDER, PROPERTIES, SITE } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { HOME_CONTENT } from "@/lib/content";
import {
  breadcrumbSchema,
  canonical,
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

      <VersionSwitcher current="v1" otherPath="/v2" />
      <Header />

      <main id="contenuto" className="flex-grow">
        {/* Hero */}
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
            <div
              aria-hidden
              className="absolute inset-0 bg-black/25"
            />
            <div className="relative z-10 h-full mx-auto w-full max-w-[1200px] px-5 md:px-8 flex flex-col justify-end pb-24 md:pb-28">
              <div className="max-w-2xl bg-[rgba(20,15,18,0.78)] backdrop-blur-md text-white p-6 md:p-10 rounded-[2px] border-l-2 border-vinaccia">
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

          {/* Group-level booking widget with destination picker */}
          <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
            <BookingWidget variant="hero" />
          </div>
        </section>

        {/* Three properties */}
        <section className="bg-[var(--color-bg)] py-16 md:py-24">
          <Container>
            <SectionHeading eyebrow="Le strutture">
              {HOME_CONTENT.propertiesSectionTitle}
            </SectionHeading>
            <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
              Tre identità diverse, un solo modo di intendere l&apos;ospitalità — autentico,
              caldo, ispirato al vino italiano.
            </p>

            <div className="mt-10 grid gap-6 md:gap-8 md:grid-cols-3">
              {PROPERTY_ORDER.map((slug) => (
                <PropertyCard key={slug} slug={slug} />
              ))}
            </div>
          </Container>
        </section>

        {/* Experience */}
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

        {/* Final CTA */}
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
                <Button
                  key={slug}
                  href={`/${slug}`}
                  variant="secondary"
                  className="!text-white !border-white/70 hover:!bg-white hover:!text-vinaccia"
                >
                  {PROPERTIES[slug].shortName}
                </Button>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <StickyMobileBar />
    </>
  );
}
