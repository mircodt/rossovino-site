import type { Metadata } from "next";
import { PropertyHeaderPreview } from "@/components/PropertyHeaderPreview";
import { Footer } from "@/components/Footer";
import { SubPageHero } from "@/components/SubPageHero";
import { PropertyContactsPageContent } from "@/components/PropertyContactsPageContent";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { propertyTheme } from "@/lib/property-theme";
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
        style={propertyTheme(SLUG)}
        className="bg-[var(--color-bg)] flex-grow flex flex-col"
      >
        <PropertyHeaderPreview slug={SLUG} />
        <main id="contenuto" className="flex-grow">
          <SubPageHero
            slug={SLUG}
            eyebrow="Contatti"
            title="Parla direttamente con la struttura"
            description="Indirizzo, telefono, WhatsApp ed email diretti della struttura. Trovi anche la mappa e le indicazioni per arrivare in auto, treno o aereo."
          />
          <PropertyContactsPageContent slug={SLUG} />
        </main>
        <Footer />
      </div>
    </>
  );
}
