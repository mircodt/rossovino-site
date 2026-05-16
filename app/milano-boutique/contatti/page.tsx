import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { SubPageHero } from "@/components/SubPageHero";
import { PropertyContactsPageContent } from "@/components/PropertyContactsPageContent";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { breadcrumbSchema, canonical, hotelSchema, subPageMetadata } from "@/lib/seo";

const SLUG = "milano-boutique" as const;

export const metadata: Metadata = subPageMetadata(SLUG, "contatti");

export default function Page() {
  const p = PROPERTIES[SLUG];
  return (
    <>
      <JsonLd data={hotelSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: p.fullName, url: canonical(`/${SLUG}`) },
          { name: "Contatti", url: canonical(`/${SLUG}/contatti`) },
        ])}
      />
      <div
        style={{ "--color-bg": p.pageBg } as React.CSSProperties}
        className="bg-[var(--color-bg)] flex-grow flex flex-col"
      >
        <Header property={SLUG} />
        <main id="contenuto" className="flex-grow">
          <SubPageHero
            slug={SLUG}
            eyebrow="Contatti"
            title="Come raggiungerci"
            description="Indirizzo, telefono, WhatsApp ed email diretti della struttura — più la mappa e le indicazioni per arrivare in auto, treno o aereo."
          />
          <PropertyContactsPageContent slug={SLUG} />
        </main>
        <Footer />
      </div>
      <StickyMobileBar property={SLUG} />
      <StickyBookingBar property={SLUG} />
    </>
  );
}
